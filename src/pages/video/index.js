import "./style.css";

export default function Video() {
  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Direction de la photographie</h1>

          <p>
            Création d’images pour publicité, clip et contenus de marque. Je construis la lumière, le cadre et l’intention visuelle sur chaque projet.
          </p>

          <div className="feature">
            <h3>Domaines</h3>
            <p>Publicité</p>
            <p>Clip musical</p>
            <p>Brand content</p>
          </div>

          <div className="ac_btn">
            <a href="/contact">Travailler ensemble</a>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492691527719-9d1e07e534b4)"
        }}
      ></div>

    </section>
  );
}
