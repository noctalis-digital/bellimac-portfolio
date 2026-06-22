import "./style.css";
import { pages } from "../../config/siteContent";
import { Link } from "react-router-dom";

export default function Photo() {
  const content = pages.photo;

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>{content.title}</h1>

          <p>{content.description}</p>

          <h3>Prestations</h3>
          {content.services.map((s, i) => (
            <p key={i}>{s}</p>
          ))}

          <h3>Projets</h3>
          {content.projects.map((p, i) => (
            <div key={i}>
              <p><b>{p.title}</b></p>
              <p>{p.description}</p>
            </div>
          ))}

          <div className="ac_btn">
            <Link to="/contact">Demander un devis</Link>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage: `url(${content.projects?.[0]?.image || ""})`
        }}
      />

    </section>
  );
}
