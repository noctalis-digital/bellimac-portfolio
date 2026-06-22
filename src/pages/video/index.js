import "./style.css";

// futur remplacement facile par API admin.bellimac.com
const videoContent = {
  title: "Direction de la photographie",
  description:
    "Je conçois l’image pour des productions audiovisuelles : publicité, clips et contenus de marque. Je travaille la lumière, le cadre et l’intention narrative sur chaque projet.",
  domains: [
    "Publicité & brand content",
    "Clips musicaux",
    "Films corporate / institutionnels"
  ],
  role: [
    "Direction de la photographie",
    "Construction lumière & ambiance",
    "Coordination image sur plateau"
  ],
  image:
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4"
};

export default function Video() {
  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>{videoContent.title}</h1>

          <p>{videoContent.description}</p>

          <div className="feature">
            <h3>Domaines</h3>
            {videoContent.domains.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div className="feature">
            <h3>Rôle</h3>
            {videoContent.role.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div className="ac_btn">
            <a href="/contact">Travailler ensemble</a>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage: `url(${videoContent.image})`
        }}
      />

    </section>
  );
}
