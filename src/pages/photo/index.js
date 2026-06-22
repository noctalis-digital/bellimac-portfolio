import "./style.css";
import { Link } from "react-router-dom";
import usePortfolio from "../../hooks/usePortfolio";
import ProjectCard from "../../components/ProjectCard";

export default function Photo() {
  const { items, loading } = usePortfolio();

  const photos = items.filter((p) => p.category === "photo");

  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Photographie d’entreprise</h1>

          <p>
            Portraits corporate, équipes, dirigeants et communication visuelle pour entreprises et marques.
          </p>

          <h3>Prestations</h3>
          <p>Portraits corporate</p>
          <p>Reportage entreprise</p>
          <p>Communication visuelle</p>
          <p>Événementiel</p>

          <h3>Projets</h3>

          {loading && <p>Chargement des projets...</p>}

          {!loading && photos.map((p) => (
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

      <div className="h_bg-image" />

    </section>
  );
}
