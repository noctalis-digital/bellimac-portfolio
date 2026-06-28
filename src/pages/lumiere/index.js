import React, { useMemo } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import { meta } from "../../config/siteContent";
import { usePortfolio } from "../../hooks/usePortfolio";
import { filterByCategory } from "../../utils/filterByCategory";

export default function Lumiere() {
  const { items = [], loading, error } = usePortfolio();

  console.log(
    "RAW ITEMS CATEGORIES =",
    items.map((i) => ({
      title: i.title,
      category: i.category,
    }))
  );

  const lights = useMemo(() => {
    if (!Array.isArray(items)) return [];

    const normalized = items.map((i) => ({
      ...i,
      category: (i.category || "").toLowerCase().trim(),
    }));

    const filtered = filterByCategory(normalized, "lumiere");

    console.log("FILTERED LIGHTS =", filtered);

    return filtered;
  }, [items]);

  const getImage = (project) => {
    return (
      project?.coverUrl ||
      project?.galleryUrls?.[0] ||
      project?.cover?.url ||
      project?.image ||
      project?.thumbnail ||
      null
    );
  };

  return (
    <HelmetProvider>
      <Container>

        <Helmet>
          <title>{`Lumière | ${meta.title}`}</title>
          <meta
            name="description"
            content="Technique plateau, chef électro, machinerie et gestion lumière pour tournages cinéma et publicité."
          />
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">

            <h1 className="display-4 mb-4">
              Technique plateau & lumière
            </h1>

            <hr className="t_border my-4 ml-0 text-left" />

            <p className="photo_intro">
              Chef électro et machiniste pour tournages cinéma et publicité.
            </p>

          </Col>
        </Row>

        <Row className="sec_sp">

          <Col lg="4">

            <h3 className="color_sec py-3">
              Compétences
            </h3>

            <ul className="photo_services">
              <li>Lighting setup</li>
              <li>Gestion plateau</li>
              <li>Machinerie</li>
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

            {!loading && !error && lights.length === 0 && (
              <p>Aucun projet lumière.</p>
            )}

            <div className="projects_grid">

              {lights.map((project) => {
                const img = getImage(project);

                return (
                  <article className="project_card" key={project.id}>

                    <div
                      className="project_image"
                      style={{
                        backgroundImage: img ? `url(${img})` : "none",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "260px",
                        backgroundColor: "#222",
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
