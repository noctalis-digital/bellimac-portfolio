import "./style.css";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";
import { Link } from "react-router-dom";

export default function Photo() {
  const { items, loading, error } = usePortfolio();

  const photos = filterByCategory(items, "photo");

  if (loading) return <section className="intro_sec"><p>Chargement...</p></section>;
  if (error) return <section className="intro_sec"><p>Erreur : {error}</p></section>;

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Photographie d’entreprise</h1>

          <p>
            Portraits corporate, équipes, événements et communication visuelle.
          </p>

          <h3>Prestations</h3>
          <p>Portraits professionnels</p>
          <p>Événementiel entreprise</p>
          <p>Communication visuelle</p>

          <h3>Projets</h3>

          {photos.length === 0 && <p>Aucun projet</p>}

          {photos.map((p) => (
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
          backgroundImage: `url(${photos?.[0]?.cover || ""})`
        }}
      />

    </section>
  );
}
