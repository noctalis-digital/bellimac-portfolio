const logotext = "BELLIMAC";

const meta = {
  title: "Camille Bogdanovitch",
  description: "Bellimac, artiste, cinéaste",
  keywords: "Camille Bogdanovitch, Bellimac, directeur de la photographie, chef électro, vidéaste, photographe, machino, clip, publicité, documentaire, tournage, lumière, étalonnage",
};

const introdata = {
  title: "Camille Bogdanovitch",
  animated: {
    first: "Direction de photographie",
    second: "Création par IA",
    third: "Je dirige des tournages agiles",
  },
  description:
    "Cinéaste et directeur de la photographie, j'oriente la lumière, le cadre et la machinerie pour donner du rythme et du sens à chaque histoire.",
  your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
  title: "Un aperçu de mon parcours",
  aboutme:
    "Chef électro, machiniste, directeur de la photographie et vidéaste : j'ai l'habitude de passer de la prépa au plateau pour garantir une image cohérente et inspirante. J'accorde autant d'importance à la technique qu'au récit.",
};

const worktimeline = [
  {
    jobtitle: "Directeur de la photographie",
    where: "YAdfi",
    date: "2020",
  },
  {
    jobtitle: "Chef électro",
    where: "Jamalya",
    date: "2019",
  },
  {
    jobtitle: "Machiniste / cadreur",
    where: "ALquds",
    date: "2019",
  },
];

const skills = [
  {
    name: "Direction de la photographie",
    value: 90,
  },
  {
    name: "Éclairage (chef électro)",
    value: 88,
  },
  {
    name: "Machinerie / grip",
    value: 85,
  },
  {
    name: "Montage & étalonnage",
    value: 80,
  },
  {
    name: "Prise de vues (photo/vidéo)",
    value: 92,
  },
];

const services = [
  {
    title: "Direction photo",
    description:
      "Construction du cadre, de la lumière et du découpage pour servir le récit.",
  },
  {
    title: "Tournage & machinerie",
    description:
      "Chef électro et machino pour des plateaux efficaces, fluides et sécurisés.",
  },
  {
    title: "Montage & étalo",
    description:
      "Assemblage, rythme et colorimétrie pour livrer des films prêts à diffuser.",
  },
];

const contactConfig = {
  YOUR_EMAIL: "camille@bellimac.com",
  YOUR_FONE: "+33 6 23 99 78 73",
  description:
    "Titulaire d’un BTS audiovisuel option métiers de l’image, j’ai développé mon regard et mon savoir-faire à travers des expériences variées en cinéma, publicité, séries et clips. Fort de ces acquis, j’accompagne mes partenaires dans la mise en image de leurs projets, en accordant une attention particulière à l’esthétique, à la narration et aux contraintes de production. Un film, un clip, une campagne ou un documentaire à mettre en lumière ? Écrivez-moi et préparons le tournage ensemble. Devis personnalisé gratuit.",
  YOUR_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_id",
  YOUR_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_id",
  YOUR_USER_ID: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "user_id",
};

const socialprofils = {
  linkedin: "https://www.linkedin.com/in/bellimac",
  instagram: "https://www.instagram.com/camillebellimac",
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
};
