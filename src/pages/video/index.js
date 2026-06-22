import "./style.css";
import { Link } from "react-router-dom";
import usePortfolio from "../../hooks/usePortfolio";
import ProjectCard from "../../components/ProjectCard";
import { getVideos } from "../../utils/portfolioSelectors";

export default function Video() {
  const { items, loading } = usePortfolio();

  const videos = getVideos(items);

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Direction de la photographie</h1>

          <p>
            Création d’images pour publicité, clip et contenus de marque.
            Construction de la lumière, du cadre et de l’intention visuelle.
          </p>

          <h3>Projets</h3>

          {loading && <p>Chargement...</p>}

          {!loading && videos.length === 0 && (
            <p>Aucun projet pour le moment.</p>
          )}

          {videos.map((p) => (
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

    </section>
  );
}
