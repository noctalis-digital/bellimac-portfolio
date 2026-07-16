import React, { useMemo } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { meta } from "../../config/siteContent";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";
import ProjectCard from "../../components/ProjectCard";

export default function Video() {
  const { items = [], loading, error } = usePortfolio();

  const videos = useMemo(() => {
    return filterByCategory(items, "video");
  }, [items]);

  return (
    <HelmetProvider>
      <Container>

        <Helmet>
          <title>{`Vidéo | ${meta.title}`}</title>

          <meta
            name="description"
            content="Direction de la photographie, publicité, clip musical et contenus de marque."
          />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">

          <Col lg="8">

            <h1 className="display-4 mb-4">
              Direction de la photographie
            </h1>

            <hr className="t_border my-4 ml-0 text-left" />

            <p className="photo_intro">
              Création d’image pour publicité, clip et contenus de marque.
            </p>

          </Col>

        </Row>

        <Row className="sec_sp">

          <Col lg="4">

            <h3 className="color_sec py-3">
              Domaines
            </h3>

            <ul className="photo_services">
              <li>Publicité</li>
              <li>Clip musical</li>
              <li>Brand content</li>
            </ul>

            <Link to="/contact">
              <button className="btn ac_btn">
                Travailler ensemble
              </button>
            </Link>

          </Col>

          <Col lg="8">

            <h3 className="color_sec pb-4">
              Projets
            </h3>

            {loading && <p>Chargement…</p>}

            {error && <p>Erreur : {error}</p>}

            {!loading && !error && videos.length === 0 && (
              <p>Aucun projet vidéo.</p>
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
