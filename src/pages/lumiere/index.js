import "./style.css";

export default function Lumiere() {
  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Lumière & plateau</h1>

          <p>
            Chef électro et machiniste sur tournages cinéma, publicité et production audiovisuelle. Mise en place lumière et exécution technique sur plateau.
          </p>

          <div className="feature">
            <h3>Compétences</h3>
            <p>Lighting design</p>
            <p>Chef électro</p>
            <p>Machinerie / grip</p>
          </div>

          <div className="ac_btn">
            <a href="/contact">Collaborer</a>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1504384308090-c894fdcc538d)"
        }}
      ></div>

    </section>
  );
}
