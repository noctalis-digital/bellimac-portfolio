import "./style.css";
import { Link } from "react-router-dom";
import usePortfolio from "../../hooks/usePortfolio";
import ProjectCard from "../../components/ProjectCard";

export default function Video() {
  const { items, loading } = usePortfolio();

  const videos = items.filter((p) => p.category === "video");

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Direction de la photographie</h1>

          <p>
            Création d’images pour publicité, clip et contenus de marque. Je construis la lumière,
            le cadre et l’intention visuelle sur chaque projet.
          </p>

          <h3>Domaines</h3>
          <p>Publicité</p>
          <p>Clip musical</p>
          <p>Brand content</p>

          <h3>Projets</h3>

          {loading && <p>Chargement des projets...</p>}

          {!loading && videos.length === 0 && (
            <p>Aucun projet pour le moment.</p>
          )}

          {!loading &&
            videos.map((p) => (
              <ProjectCard
                key={p._id}
                title={p.title}
                description={p.description}
                image={p.image}
              />
            ))}

          <div className="ac_btn">
            <Link to="/contact">Travailler ensemble</Link>
          </div>

        </div>
      </div>

      <div className="h_bg-image" />

    </section>
  );
}
