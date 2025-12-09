const logotext = "BELLIMAC";
const meta = {
    title: "Bellimac",
    description: "Je suis Camille Bogdanovitch, vidéaste, photographe, chef électro et directeur de la photographie.",
};

const introdata = {
    title: "Je suis Camille Bogdanovitch",
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
        title: "Berlin nocturne",
        img: "https://picsum.photos/400/?grayscale",
        description: "Immersion nocturne dans Berlin pour capter les néons, les visages et le rythme urbain.",
        details: "Note de tournage : repérages de nuit, équipe réduite façon documentaire, jeux de contrastes sodium/LED et machinerie légère pour suivre les protagonistes. L'étalonnage reste doux pour préserver la texture brute des lumières de rue.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=1",
            "https://picsum.photos/500/350?grayscale&random=2",
        ],
        link: "#",
    },
    {
        title: "Portraits en mouvement",
        img: "https://picsum.photos/400/800/?grayscale",
        description: "Série de portraits filmés et photographiés, mêlant cadre serré et mouvements discrets.",
        details: "Travail de chef électro minimaliste : une source clé douce, un renfort de contre, et machinerie slider pour garder le souffle du sujet. Livrables : film court + planche photo, étalonnage peau naturel.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=3",
            "https://picsum.photos/500/350?grayscale&random=4",
        ],
        link: "#",
    },
    {
        title: "Clip indie",
        img: "https://picsum.photos/400/?grayscale",
        description: "Clip musical tourné en lumière mixte, accent sur le rythme caméra.",
        details: "Plan de travail : blocs Steadicam/épaule selon les refrains, tubes LED pixel pour les transitions, et machinerie simple pour des travellings courts. Montage nerveux et colorimétrie contrastée pour coller au morceau.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=5",
            "https://picsum.photos/500/350?grayscale&random=6",
        ],
        link: "#",
    },
    {
        title: "Pub produit",
        img: "https://picsum.photos/400/600/?grayscale",
        description: "Spot produit centré sur la matière, macro et éclairage contrôlé.",
        details: "Direction photo basée sur des sources ponctuelles dirigées, diffusion ciblée et quelques reflets contrôlés. Plateau léger : chef électro + machino pour micro-mouvements. Étalo précis pour garder la fidélité matière.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=7",
            "https://picsum.photos/500/350?grayscale&random=8",
        ],
        link: "#",
    },
    {
        title: "Doc backstage",
        img: "https://picsum.photos/400/300/?grayscale",
        description: "Coulisses d'un spectacle, captation agile et lumière disponible.",
        details: "Approche documentaire : caméra discrète, renfort LED sur batterie quand nécessaire, machinerie minimaliste pour rester mobile. Mix images tournage + interviews + photos de plateau.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=9",
            "https://picsum.photos/500/350?grayscale&random=10",
        ],
        link: "#",
    },
    {
        title: "Fashion édito",
        img: "https://picsum.photos/400/700/?grayscale",
        description: "Édito mode mêlant vidéo et photo, lumière sculptée et décors graphiques.",
        details: "Set lumière modulable (HMI + LED soft) pour passer du statique au mouvement. Travellings doux en machinerie pour valoriser les silhouettes. Étalo cinéma pour des noirs denses et des teintes peau riches.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=11",
            "https://picsum.photos/500/350?grayscale&random=12",
        ],
        link: "#",
    },
    {
        title: "Court narratif",
        img: "https://picsum.photos/400/600/?grayscale",
        description: "Court-métrage narratif, travail de découpage et de continuité lumineuse.",
        details: "Prépa découpage avec le réal, plans clés sur dolly et gestion des raccords lumière int/ext. Chef électro pour rythmer la progression dramatique, étalonnage cohérent pour soutenir l'arc des personnages.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=13",
            "https://picsum.photos/500/350?grayscale&random=14",
        ],
        link: "#",
    },
    {
        title: "Campagne social",
        img: "https://picsum.photos/400/300/?grayscale",
        description: "Série de capsules sociales verticales, lumière naturelle renforcée.",
        details: "Tournage en équipe réduite pour produire plusieurs formats en une journée. Mix de lumière dispo + panneaux LED, machinerie gimbal légère. Livraison en H.264 et ProRes avec LUT dédiée réseaux.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=15",
            "https://picsum.photos/500/350?grayscale&random=16",
        ],
        link: "#",
    },
    {
        title: "Vidéo événement",
        img: "https://picsum.photos/400/?grayscale",
        description: "Couverture événementielle avec captation multi-cam et photos live.",
        details: "Coordination plateau pour couvrir keynotes et ambiances. Chef électro sur les scènes, caméras mobiles pour le public, machinerie slider pour les produits exposés. Montage dynamique + galerie photo livrée en 24h.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=17",
            "https://picsum.photos/500/350?grayscale&random=18",
        ],
        link: "#",
    },
    {
        title: "Documentaire court",
        img: "https://picsum.photos/400/550/?grayscale",
        description: "Portrait documentaire de 10 minutes, tournage léger et intimiste.",
        details: "Approche cinéma direct : lumière discrète, machinerie minimale et caméra épaule. Focus sur la respiration du personnage, sons d'ambiance et visuels B-roll. Étalo organique pour rester fidèle au lieu.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=19",
            "https://picsum.photos/500/350?grayscale&random=20",
        ],
        link: "#",
    },
    {
        title: "Photographie fine art",
        img: "https://picsum.photos/400/?grayscale",
        description: "Série photo monochrome centrée sur la matière et les lignes.",
        details: "Lumière contrôlée en studio, jeu d'ombres nettes, utilisation de drapeaux et réflecteurs. Post-production fine pour conserver le grain et la profondeur des noirs.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=21",
            "https://picsum.photos/500/350?grayscale&random=22",
        ],
        link: "#",
    },
    {
        title: "Clip performance",
        img: "https://picsum.photos/400/700/?grayscale",
        description: "Performance live captée en une prise, focus sur la sincérité du geste.",
        details: "Chef électro pour dessiner un key light unique, quelques effets subtils synchronisés avec la musique. Caméra sur machinerie fluide pour suivre l'énergie sans couper.",
        gallery: [
            "https://picsum.photos/500/350?grayscale&random=23",
            "https://picsum.photos/500/350?grayscale&random=24",
        ],
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
    instagram: "https://www.instagram.com/camillebellimac",
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
