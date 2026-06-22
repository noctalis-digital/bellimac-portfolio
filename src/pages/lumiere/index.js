import "./style.css";
import { pages } from "../../config/siteContent";
import { Link } from "react-router-dom";

export default function Lumiere() {
  const content = pages.lumiere;

  return (
    <section className="intro_sec">

      {/* TEXTE */}
      <div className="text">
        <div className="intro">

          <h1>{content.title}</h1>

          <p>{content.description}</p>

          <div className="feature">
            <h3>Compétences</h3>
            {content.skills.map((skill, i) => (
              <p key={i}>{skill}</p>
            ))}
          </div>

          <div className="feature">
            <h3>Rôle sur plateau</h3>
            <p>Chef électro</p>
            <p>Machiniste / grip</p>
            <p>Installation lumière cinéma & publicité</p>
          </div>

          <div className="ac_btn">
            <Link to="/contact">Discuter d’un projet</Link>
          </div>

        </div>
      </div>

      {/* IMAGE */}
      <div
        className="h_bg-image"
        style={{
          backgroundImage: `url(${content.image})`
        }}
      />

    </section>
  );
}
