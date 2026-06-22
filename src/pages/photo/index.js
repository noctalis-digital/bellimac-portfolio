import "./style.css";
import { Link } from "react-router-dom";
import usePortfolio from "../../hooks/usePortfolio";
import ProjectCard from "../../components/ProjectCard";
import { getPhotos } from "../../utils/portfolioSelectors";

export default function Photo() {
  const { items, loading } = usePortfolio();

  const photos = getPhotos(items);

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Photographie d’entreprise</h1>

          <p>
            Portraits corporate, équipes, dirigeants et communication visuelle pour entreprises et marques.
          </p>

          <h3>Projets</h3>

          {loading && <p>Chargement...</p>}

          {photos.map((p) => (
            <ProjectCard
              key={p._id}
              title={p.title}
              description={p.description}
              image={p.image}
            />
          ))}

          <div className="ac_btn">
            <Link to="/contact">Demander un devis</Link>
          </div>

        </div>
      </div>

    </section>
  );
}
