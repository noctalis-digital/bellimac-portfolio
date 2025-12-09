// Backend API + interface admin (CommonJS pour compatibilité Plesk)
const path = require("path");
const fs = require("fs");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const sanitizeHtml = require("sanitize-html");
const { v4: uuidv4 } = require("uuid");
const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectsCommand,
} = require("@aws-sdk/client-s3");

require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

const PORT = process.env.PORT || 4000;
const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET || "bellimac.com";
const AWS_REGION = process.env.AWS_REGION || "eu-west-3";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const PORTFOLIO_PREFIX = process.env.PORTFOLIO_PREFIX || "portfolio";
const PORTFOLIO_INDEX_KEY = `${PORTFOLIO_PREFIX}/index.json`;
const PUBLIC_BASE_URL =
  (process.env.AWS_PUBLIC_BASE_URL &&
    process.env.AWS_PUBLIC_BASE_URL.replace(/\/+$/, "")) ||
  `https://${AWS_S3_BUCKET}.s3.${AWS_REGION}.amazonaws.com`;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ||
  "http://localhost:3000,https://bellimac.com,https://admin.bellimac.com")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const s3Client = new S3Client({
  region: AWS_REGION,
  credentials:
    process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
      ? {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
    files: 10,
  },
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin)) {
      return callback(null, true);
    }
    return callback(
      new Error(
        `Origine ${origin} non autorisée. Ajoutez-la à ALLOWED_ORIGINS.`
      )
    );
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(cors(corsOptions));
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

const adminDir = path.join(__dirname, "admin");
app.use(express.static(adminDir, { extensions: ["html"] }));

const streamToString = async (stream) =>
  await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });

const sanitizeText = (value = "") =>
  sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }).trim();

const sanitizeRichText = (value = "") =>
  sanitizeHtml(value, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "a",
      "h2",
      "h3",
      "blockquote",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
    },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", {
        target: "_blank",
        rel: "noreferrer noopener",
      }),
    },
  }).trim();

const sanitizeUrl = (value = "") => {
  if (!value) return "";
  try {
    const parsed = new URL(value, "https://dummy.local");
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return "";
    }
    return parsed.href;
  } catch (error) {
    return "";
  }
};

const buildPublicUrl = (key) => `${PUBLIC_BASE_URL}/${key}`;

const mapItemForResponse = (item) => ({
  ...item,
  coverUrl: item.cover?.url || null,
  galleryUrls: (item.gallery || []).map((g) => g.url),
});

const parseExistingGallery = (rawValue, referenceGallery = []) => {
  if (!rawValue) return referenceGallery;
  try {
    const requested = JSON.parse(rawValue);
    if (!Array.isArray(requested)) return referenceGallery;
    return requested
      .map((entry) => {
        const key = typeof entry === "string" ? entry : entry?.url;
        return referenceGallery.find(
          (galleryItem) => galleryItem.url === key || galleryItem.key === key
        );
      })
      .filter(Boolean);
  } catch (error) {
    return referenceGallery;
  }
};

const uploadFileToS3 = async (file, key) => {
  const putCommand = new PutObjectCommand({
    Bucket: AWS_S3_BUCKET,
    Key: key,
    Body: file.buffer,
    ContentType: file.mimetype || "application/octet-stream",
    ACL: "public-read",
    CacheControl: "max-age=31536000",
  });
  await s3Client.send(putCommand);
  return {
    key,
    url: buildPublicUrl(key),
    size: file.size,
    contentType: file.mimetype,
  };
};

const loadPortfolioIndex = async () => {
  try {
    const data = await s3Client.send(
      new GetObjectCommand({
        Bucket: AWS_S3_BUCKET,
        Key: PORTFOLIO_INDEX_KEY,
      })
    );
    const body = await streamToString(data.Body);
    const parsed = JSON.parse(body);
    if (Array.isArray(parsed)) return parsed;
    if (Array.isArray(parsed.items)) return parsed.items;
    return [];
  } catch (error) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      return [];
    }
    console.error("[portfolio] Lecture S3 échouée", error);
    throw error;
  }
};

const savePortfolioIndex = async (items) => {
  const payload = JSON.stringify(
    {
      items,
      updatedAt: new Date().toISOString(),
    },
    null,
    2
  );

  await s3Client.send(
    new PutObjectCommand({
      Bucket: AWS_S3_BUCKET,
      Key: PORTFOLIO_INDEX_KEY,
      Body: payload,
      ContentType: "application/json",
    })
  );
};

const deleteAssets = async (keys = []) => {
  if (!keys.length) return;
  try {
    await s3Client.send(
      new DeleteObjectsCommand({
        Bucket: AWS_S3_BUCKET,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
          Quiet: true,
        },
      })
    );
  } catch (error) {
    console.error("[portfolio] Échec suppression S3", { keys, error });
  }
};

const requireAdmin = (req, res, next) => {
  if (!ADMIN_API_KEY) {
    return res.status(500).json({
      message:
        "ADMIN_API_KEY manquant. Ajoutez une variable d'environnement pour autoriser l'écriture.",
    });
  }
  const token = req.headers["x-admin-token"] || req.query.token;
  if (token !== ADMIN_API_KEY) {
    return res.status(401).json({ message: "Jeton administrateur invalide." });
  }
  return next();
};

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    bucket: AWS_S3_BUCKET,
    region: AWS_REGION,
    allowOrigins: ALLOWED_ORIGINS,
  });
});

app.get("/api/portfolio", async (req, res, next) => {
  try {
    const items = await loadPortfolioIndex();
    const sorted = items.sort(
      (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
    );
    res.json({ items: sorted.map(mapItemForResponse) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/portfolio/:id", async (req, res, next) => {
  try {
    const items = await loadPortfolioIndex();
    const item = items.find((entry) => entry.id === req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Projet introuvable." });
    }
    res.json({ item: mapItemForResponse(item) });
  } catch (error) {
    next(error);
  }
});

app.post(
  "/api/portfolio",
  adminLimiter,
  requireAdmin,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 8 },
  ]),
  async (req, res, next) => {
    try {
      const title = sanitizeText(req.body.title);
      const description = sanitizeText(req.body.description || req.body.summary);
      const detailsHtml = sanitizeRichText(req.body.detailsHtml || req.body.details);
      const link = sanitizeUrl(req.body.link);
      const coverFile = req.files?.cover?.[0];

      if (!title || !description || !coverFile) {
        return res.status(400).json({
          message:
            "Champs requis manquants : titre, description et image de couverture sont nécessaires.",
        });
      }

      const itemId = uuidv4();
      const now = new Date().toISOString();
      const coverKey = `${PORTFOLIO_PREFIX}/items/${itemId}/cover-${Date.now()}${path.extname(
        coverFile.originalname || ""
      )}`;
      const cover = await uploadFileToS3(coverFile, coverKey);

      const galleryUploads =
        req.files?.gallery?.length > 0
          ? await Promise.all(
              req.files.gallery.map((file, index) =>
                uploadFileToS3(
                  file,
                  `${PORTFOLIO_PREFIX}/items/${itemId}/gallery-${Date.now()}-${index}${path.extname(
                    file.originalname || ""
                  )}`
                )
              )
            )
          : [];

      const newItem = {
        id: itemId,
        title,
        description,
        detailsHtml,
        link,
        cover,
        gallery: galleryUploads,
        createdAt: now,
        updatedAt: now,
      };

      const items = await loadPortfolioIndex();
      items.push(newItem);
      await savePortfolioIndex(items);

      res.status(201).json({ item: mapItemForResponse(newItem) });
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/api/portfolio/:id",
  adminLimiter,
  requireAdmin,
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "gallery", maxCount: 8 },
  ]),
  async (req, res, next) => {
    try {
      const items = await loadPortfolioIndex();
      const index = items.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Projet introuvable." });
      }

      const current = items[index];
      const title = sanitizeText(req.body.title) || current.title;
      const description =
        sanitizeText(req.body.description || req.body.summary) ||
        current.description;
      const link = sanitizeUrl(req.body.link) || "";
      const detailsHtml =
        req.body.detailsHtml !== undefined || req.body.details !== undefined
          ? sanitizeRichText(req.body.detailsHtml || req.body.details)
          : current.detailsHtml;

      const coverFile = req.files?.cover?.[0];
      let cover = current.cover;
      if (coverFile) {
        const newCoverKey = `${PORTFOLIO_PREFIX}/items/${current.id}/cover-${Date.now()}${path.extname(
          coverFile.originalname || ""
        )}`;
        cover = await uploadFileToS3(coverFile, newCoverKey);
        if (current.cover?.key && current.cover.key !== cover.key) {
          await deleteAssets([current.cover.key]);
        }
      }

      const keptGallery = parseExistingGallery(
        req.body.existingGallery,
        current.gallery || []
      );
      const newGalleryUploads =
        req.files?.gallery?.length > 0
          ? await Promise.all(
              req.files.gallery.map((file, index) =>
                uploadFileToS3(
                  file,
                  `${PORTFOLIO_PREFIX}/items/${current.id}/gallery-${Date.now()}-${index}${path.extname(
                    file.originalname || ""
                  )}`
                )
              )
            )
          : [];

      const updatedGallery = [...keptGallery, ...newGalleryUploads];
      const removedGalleryKeys = (current.gallery || [])
        .filter(
          (item) =>
            !updatedGallery.find(
              (galleryItem) => galleryItem.key === item.key
            )
        )
        .map((item) => item.key)
        .filter(Boolean);

      if (removedGalleryKeys.length) {
        await deleteAssets(removedGalleryKeys);
      }

      const updatedItem = {
        ...current,
        title,
        description,
        link,
        detailsHtml,
        cover,
        gallery: updatedGallery,
        updatedAt: new Date().toISOString(),
      };

      items[index] = updatedItem;
      await savePortfolioIndex(items);

      res.json({ item: mapItemForResponse(updatedItem) });
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/api/portfolio/:id",
  adminLimiter,
  requireAdmin,
  async (req, res, next) => {
    try {
      const items = await loadPortfolioIndex();
      const index = items.findIndex((entry) => entry.id === req.params.id);
      if (index === -1) {
        return res.status(404).json({ message: "Projet introuvable." });
      }

      const [deleted] = items.splice(index, 1);
      await savePortfolioIndex(items);

      const keysToDelete = [];
      if (deleted.cover?.key) keysToDelete.push(deleted.cover.key);
      if (deleted.gallery?.length) {
        deleted.gallery.forEach((asset) => asset?.key && keysToDelete.push(asset.key));
      }
      await deleteAssets(keysToDelete);

      res.json({ message: "Projet supprimé.", id: deleted.id });
    } catch (error) {
      next(error);
    }
  }
);

app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api/")) return next();
  const indexFile = path.join(adminDir, "index.html");
  if (fs.existsSync(indexFile)) {
    return res.sendFile(indexFile);
  }
  return res.status(404).send("Interface admin introuvable.");
});

// Gestion d'erreurs
app.use((err, req, res, next) => {
  if (err?.message?.includes("CORS")) {
    return res.status(403).json({ message: err.message });
  }
  console.error("[server] Erreur API", err);
  res.status(500).json({
    message: "Erreur serveur",
    detail: process.env.NODE_ENV === "production" ? undefined : err.message,
  });
});

app.listen(PORT, () => {
  console.log(
    `[bellimac-admin] API démarrée sur le port ${PORT} (bucket: ${AWS_S3_BUCKET}, région: ${AWS_REGION})`
  );
});
