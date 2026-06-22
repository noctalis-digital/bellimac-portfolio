import "./style.css";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";
import { Link } from "react-router-dom";

export default function Lumiere() {
  const { items, loading, error } = usePortfolio();

  const lights = filterByCategory(items, "light");

  if (loading) return <section className="intro_sec"><p>Chargement...</p></section>;
  if (error) return <section className="intro_sec"><p>Erreur : {error}</p></section>;

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Technique plateau & lumière</h1>

          <p>
            Chef électro et machiniste pour tournages cinéma et publicité.
          </p>

          <h3>Compétences</h3>
          <p>Lighting setup</p>
          <p>Gestion plateau</p>
          <p>Machinerie</p>

          <h3>Projets</h3>

          {lights.length === 0 && <p>Aucun projet</p>}

          {lights.map((p) => (
            <div key={p.id}>
              <b>{p.title}</b>
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
          backgroundImage: `url(${lights?.[0]?.cover || ""})`
        }}
      />

    </section>
  );
}
