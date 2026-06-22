import "./style.css";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";
import { Link } from "react-router-dom";

export default function Video() {
  const { items, loading, error } = usePortfolio();

  const videos = filterByCategory(items, "video");

  if (loading) return <section className="intro_sec"><p>Chargement...</p></section>;
  if (error) return <section className="intro_sec"><p>Erreur : {error}</p></section>;

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Direction de la photographie</h1>

          <p>
            Création d’image pour publicité, clip et contenus de marque.
          </p>

          <h3>Domaines</h3>
          <p>Publicité</p>
          <p>Clip musical</p>
          <p>Brand content</p>

          <h3>Projets</h3>

          {videos.length === 0 && <p>Aucun projet</p>}

          {videos.map((p) => (
            <div key={p.id}>
              <b>{p.title}</b>
              <p>{p.description}</p>
            </div>
          ))}

          <div className="ac_btn">
            <Link to="/contact">Travailler ensemble</Link>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage: `url(${videos?.[0]?.cover || ""})`
        }}
      />

    </section>
  );
}
