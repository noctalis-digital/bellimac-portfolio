import homeImg from "../assets/images/backstageClip181.jpg";
const logotext = "BELLIMAC";

const meta = {
  title: "Photographie d’entreprise & Direction photo | Bellimac",
  description:
    "Camille Bogdanovitch, photographe d’entreprise et directeur de la photographie. Portrait corporate, événementiel, communication visuelle et production image pour entreprises et marques.",
  keywords:
    "directeur de la photographie, DOP, lighting, chef électro, machiniste, caméra, lumière, film, publicité, clip, étalonnage, photographe entreprise, photographie corporate, portrait professionnel, événementiel entreprise, directeur de la photographie, vidéo corporate, image marque, lighting",
};

const introdata = {
  title: "Photographie d’entreprise & direction de l’image",
  animated: {
    first: "Portraits corporate & communication d’entreprise",
    second: "Direction de la photographie pour publicité et marque",
    third: "Lumière et image pour productions audiovisuelles",
  },
  description:
    "Photographe d’entreprise et directeur de la photographie, je crée des images pour entreprises, marques et productions : portraits, communication visuelle et direction de l’image sur tournages.",
  your_img_url:
    "homeImg",
};

const dataabout = {
  title: "Photographie & direction de l’image",
  aboutme:
    "Je travaille entre photographie d’entreprise et direction de la photographie pour des productions audiovisuelles. J’interviens sur des projets corporate, publicitaires et créatifs en apportant une maîtrise de la lumière, du cadre et de l’exécution technique.",
};

const worktimeline = [
  {
    jobtitle: "Photographe d’entreprise",
    where: "Corporate & communication",
    date: "2023 - aujourd’hui",
  },
  {
    jobtitle: "Directeur de la photographie",
    where: "Publicité / clip / fiction",
    date: "2020 - aujourd’hui",
  },
  {
    jobtitle: "Chef électro / technicien lumière",
    where: "Plateaux audiovisuels",
    date: "2019",
  },
];

const skills = [
  { name: "Photographie d’entreprise", value: 95 },
  { name: "Portrait corporate", value: 92 },
  { name: "Direction de la photographie", value: 88 },
  { name: "Lighting & éclairage", value: 90 },
  { name: "Production plateau", value: 85 },
];

const services = [
  {
    title: "Photographie d’entreprise",
    description:
      "Portraits corporate, équipes, dirigeants et communication visuelle pour entreprises et marques.",
  },
  {
    title: "Direction de la photographie",
    description:
      "Création de l’image pour publicités, clips et contenus de marque : lumière, cadre et intention visuelle.",
  },
  {
    title: "Technique plateau & lumière",
    description:
      "Chef électro et machinerie pour assurer la mise en place lumière et la fluidité des tournages.",
  },
];

const contactConfig = {
  YOUR_EMAIL: "camille@bellimac.com",
  YOUR_FONE: "+33 6 23 99 78 73",
  description:
    "Disponible pour photographie d’entreprise, direction de la photographie et productions audiovisuelles. Réponse rapide pour projets et devis.",
  YOUR_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_id",
  YOUR_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_id",
  YOUR_USER_ID: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "user_id",
};

const socialprofils = {
  linkedin: "https://www.linkedin.com/in/bellimac",
  instagram: "https://www.instagram.com/camillebellimac",
};

const pages = {
  home: {
    title: introdata.title,
    description: introdata.description,
    image: introdata.your_img_url,
  },

  photo: {
    title: "Photographie d’entreprise",
    description:
      "Portraits corporate, équipes, dirigeants et communication visuelle pour entreprises et marques.",
    services: [
      "Portraits corporate",
      "Reportage entreprise",
      "Communication visuelle",
      "Événementiel",
    ],
    projects: [
      {
        title: "Portraits corporate - entreprise X",
        image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
        description: "Série de portraits pour direction et équipe.",
      },
      {
        title: "Reportage interne - société Y",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        description: "Reportage en conditions réelles en entreprise.",
      },
    ],
  },

  video: {
    title: "Direction de la photographie",
    description:
      "Création de l’image pour publicité, clip et contenu de marque.",
    domains: ["Publicité", "Clips musicaux", "Films corporate"],
    projects: [
      {
        title: "Publicité marque X",
        image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
        description: "Direction photo pour campagne publicitaire.",
      },
      {
        title: "Clip artistique Y",
        image: "https://images.unsplash.com/photo-1526312426976-f4d754fa9bd6",
        description: "Construction lumière et ambiance.",
      },
    ],
  },

  lumiere: {
    title: "Technique plateau & lumière",
    description:
      "Chef électro et machiniste sur tournages cinéma et publicité.",
    skills: ["Lighting design", "Chef électro", "Machinerie"],
    projects: [
      {
        title: "Plateau publicité X",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        description: "Installation lumière complète studio.",
      },
    ],
  },
};

export {
  meta,
  dataabout,
  worktimeline,
  skills,
  services,
  introdata,
  contactConfig,
  socialprofils,
  logotext,
  pages,
};
