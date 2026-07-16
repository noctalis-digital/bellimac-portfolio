import React, { useMemo } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { meta } from "../../config/siteContent";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";
import ProjectCard from "../../components/ProjectCard";

export default function Photo() {
  const { items = [], loading, error } = usePortfolio();

  const photos = useMemo(() => filterByCategory(items, "photo"), [items]);

  return (
    <HelmetProvider>
      <Container>

        <Helmet>
          <title>{`Photo | ${meta.title}`}</title>
          <meta
            name="description"
            content="Photographie d’entreprise, portraits corporate, événementiel et communication visuelle."
          />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">
              Photographie d’entreprise
            </h1>

            <hr className="t_border my-4 ml-0 text-left" />

            <p className="photo_intro">
              Portraits corporate, équipes, événements et communication visuelle pour entreprises et marques.
            </p>
          </Col>
        </Row>

        <Row className="sec_sp">

          <Col lg="4">
            <h3 className="color_sec py-3">Prestations</h3>

            <ul className="photo_services">
              <li>Portraits professionnels</li>
              <li>Reportage entreprise</li>
              <li>Communication visuelle</li>
              <li>Événementiel</li>
            </ul>

            <Link to="/contact">
              <button className="btn ac_btn">
                Demander un devis
              </button>
            </Link>
          </Col>

          <Col lg="8">
            <h3 className="color_sec pb-4">Projets</h3>

            {loading && <p>Chargement…</p>}
            {error && <p>Erreur : {error}</p>}

            {!loading && !error && photos.length === 0 && (
              <p>Aucun projet photo.</p>
            )}

           <div className="projects_grid">

  {lights.map((project) => (
    <ProjectCard
      key={project.id}
      title={project.title}
      description={project.description}
      coverUrl={project.coverUrl}
      galleryUrls={project.galleryUrls}
      externalLink={project.link}
    />
  ))}

</div>

          </Col>

        </Row>

      </Container>
    </HelmetProvider>
  );
}
