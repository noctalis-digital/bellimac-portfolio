import React, { useMemo } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { meta } from "../../config/siteContent";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";

export default function Photo() {
  const { items, loading, error } = usePortfolio();

  console.log(
  "CATEGORIES =",
  items.map((i) => ({
    title: i.title,
    category: i.category,
  }))
);

  // SAFE + scalable
  const photos = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return filterByCategory(items, "photo");
  }, [items]);

const getImage = (project) => {
  console.log("IMAGE DATA =", project);

  return (
    project?.cover ||
    project?.image ||
    project?.thumbnail ||
    project?.media?.url ||
    project?.gallery?.[0]?.url ||
    project?.gallery?.[0] ||
    null
  );
};

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

        {/* HEADER */}
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">

            <h1 className="display-4 mb-4">
              Photographie d’entreprise
            </h1>

            <hr className="t_border my-4 ml-0 text-left" />

            <p className="photo_intro">
              Portraits corporate, équipes, événements et communication
              visuelle pour entreprises et marques.
            </p>

          </Col>
        </Row>

        {/* CONTENU */}
        <Row className="sec_sp">

          <Col lg="4">

            <h3 className="color_sec py-3">
              Prestations
            </h3>

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

            <h3 className="color_sec pb-4">
              Projets
            </h3>

            {loading && <p>Chargement…</p>}

            {error && <p>Erreur : {error}</p>}

            {!loading && !error && photos.length === 0 && (
              <p>Aucun projet photo.</p>
            )}

            <div className="projects_grid">

              {photos.map((project) => {
                const img = getImage(project);

                return (
                  <article className="project_card" key={project.id}>

                    <div
                      className="project_image"
                      style={{
                        backgroundImage: img ? `url(${img})` : "none",
                      }}
                    />

                    <div className="project_body">
                      <h4>{project.title}</h4>
                      <p>{project.description}</p>
                    </div>

                  </article>
                );
              })}

            </div>

          </Col>

        </Row>

      </Container>
    </HelmetProvider>
  );
}
