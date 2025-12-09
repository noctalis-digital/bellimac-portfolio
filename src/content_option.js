const logotext = "BELLIMAC";
const meta = {
    title: "Bellimac",
    description: "Je suis Bellimac, vidéaste, photographe, chef électro et directeur de la photographie.",
};

const introdata = {
    title: "Je suis Bellimac",
    animated: {
        first: "Je capture des récits en images",
        second: "Je cadre et éclaire vos projets",
        third: "Je dirige des tournages agiles",
    },
    description: "Vidéaste et directeur de la photographie, j'oriente la lumière, le cadre et la machinerie pour donner du rythme et du sens à chaque histoire.",
    your_img_url: "https://images.unsplash.com/photo-1514790193030-c89d266d5a9d",
};

const dataabout = {
    title: "Un aperçu de mon parcours",
    aboutme: "Chef électro, machiniste, directeur de la photographie et vidéaste : j'ai l'habitude de passer de la prépa au plateau pour garantir une image cohérente et inspirante. J'accorde autant d'importance à la technique qu'au récit.",
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
        description: "Construction du cadre, de la lumière et du découpage pour servir le récit.",
    },
    {
        title: "Tournage & machinerie",
        description: "Chef électro et machino pour des plateaux efficaces, fluides et sécurisés.",
    },
    {
        title: "Montage & étalo",
        description: "Assemblage, rythme et colorimétrie pour livrer des films prêts à diffuser.",
    },
];

const dataportfolio = [
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/800/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/600/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/600/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/300/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/550/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
    {
        img: "https://picsum.photos/400/700/?grayscale",
        description: "La sagesse de la vie consiste à éliminer le superflu.",
        link: "#",
    },
];

const contactConfig = {
    YOUR_EMAIL: "camille@bellimac.com",
    YOUR_FONE: "+33 6 23 99 78 73",
    description: "Un film, un clip, une campagne ou un doc à mettre en lumière ? Écrivez-moi et préparons le tournage ensemble.",
    // creat an emailjs.com account
    // check out this tutorial https://www.emailjs.com/docs/examples/reactjs/
    YOUR_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_id",
    YOUR_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_id",
    YOUR_USER_ID: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "user_id",
};

const socialprofils = {
    linkedin: "https://www.linkedin.com/in/bellimac",
    instagram: "https://www.instagram.com/camille.bellimac",
};
export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
};
