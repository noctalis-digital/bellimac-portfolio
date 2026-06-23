import homeImg from "../assets/images/backstageClip181.jpg";

const logotext = "BELLIMAC";

const meta = {
  title: "Photographie d’entreprise & Direction photo | Bellimac",
  description:
    "Camille Bogdanovitch, photographe d’entreprise et directeur de la photographie.",
  keywords:
    "directeur de la photographie, photographe entreprise, lighting, vidéo, publicité, clip",
};

const introdata = {
  logo: "BELLIMAC",
  subtitle: [
    "Photographie d’entreprise",
    "Direction de la photographie",
    "Lumière & production plateau",
  ],
  description:
    "J’accompagne entreprises et productions dans la création d’images fortes : portraits corporate, communication visuelle et direction artistique sur plateau.",
  cta: {
    primary: "Voir mes services",
    secondary: "Demander un devis",
  },
  your_img_url: homeImg,
};

const contactConfig = {
  YOUR_EMAIL: "camille@bellimac.com",
  YOUR_FONE: "+33 6 23 99 78 73",
};

const socialprofils = {
  linkedin: "https://www.linkedin.com/in/bellimac",
  instagram: "https://www.instagram.com/camillebellimac",
};

/* =========================
   PAGES (garde ton système)
   ========================= */

const pages = {
  home: {
    title: introdata.title,
    subtitle: introdata.subtitle,
    description: introdata.description,
    image: introdata.your_img_url,
  },

  photo: {
    title: "Photographie d’entreprise",
    description:
      "Portraits corporate, équipes, dirigeants et communication visuelle.",
  },

  video: {
    title: "Direction de la photographie",
    description:
      "Création de l’image pour publicité, clip et contenus de marque.",
  },

  lumiere: {
    title: "Technique plateau & lumière",
    description:
      "Chef électro et machiniste sur tournages cinéma et publicité.",
  },
};

export {
  meta,
  introdata,
  contactConfig,
  socialprofils,
  logotext,
  pages,
};
