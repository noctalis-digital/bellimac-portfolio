import "./style.css";
import { Link } from "react-router-dom";
import usePortfolio from "../../hooks/usePortfolio";
import ProjectCard from "../../components/ProjectCard";
import { getLights } from "../../utils/portfolioSelectors";

export default function Lumiere() {
  const { items, loading } = usePortfolio();

  const lights = getLights(items);

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Technique plateau & lumière</h1>

          <p>
            Chef électro et machiniste sur tournages cinéma et publicité.
            Mise en place lumière, gestion technique et continuité image.
          </p>

          <h3>Projets</h3>

          {loading && <p>Chargement...</p>}

          {!loading && lights.length === 0 && (
            <p>Aucun projet pour le moment.</p>
          )}

          {lights.map((p) => (
            <ProjectCard
              key={p._id}
              title={p.title}
              description={p.description}
              image={p.image}
            />
          ))}

          <div className="ac_btn">
            <Link to="/contact">Discuter d’un projet lumière</Link>
          </div>

        </div>
      </div>

    </section>
  );
}
