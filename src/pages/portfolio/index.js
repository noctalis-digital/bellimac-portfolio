import React, { useEffect, useState } from "react";
import "./style.css";
import "../home/style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { introdata, meta } from "../../config/siteContent";
import { Link } from "react-router-dom";
import { fetchPortfolio } from "../../services/portfolioApi";

const normalizeProject = (project) => {
  const gallery = project?.galleryUrls || project?.gallery || [];

  const coverUrl =
    project.coverUrl ||
    project.cover?.url ||
    gallery?.[0] ||
    "";

  return {
    id: project.id,
    title: project.title || "Projet",
    description: project.description || "",
    detailsHtml: project.detailsHtml || "",
    link: project.link || "",
    coverUrl,
    gallery,
    updatedAt: project.updatedAt,
  };
};

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pageTitle = `Portfolio | ${meta.title}`;
  const pageDescription = meta.description;

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const items = await fetchPortfolio();
        if (!active) return;
        setProjects(items.map(normalizeProject));
      } catch (err) {
        console.error("[portfolio] Chargement impossible", err);
        if (active) {
          setError(err.message || "Erreur chargement portfolio");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  const openProject = (project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <HelmetProvider>
      <section id="portfolio-home" className="home">
        <Helmet>
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
        </Helmet>

        <Container className="About-header" id="portfolio-section">
          <div className="intro mx-auto mb-5">
            <h2>{introdata.title}</h2>

            <h1 className="fluidz-48">
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>

            <p>{introdata.description}</p>

            <Link to="/contact" className="ac_btn btn">
              Contactez-moi
            </Link>
          </div>

          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4">Portfolio</h1>
            </Col>
          </Row>

          <div className="mb-5 po_items_ho" id="portfolio-grid">
            {loading && <p>Chargement...</p>}
            {error && <p>{error}</p>}

            {!loading &&
              !error &&
              projects.map((project) => (
                <div key={project.id} className="po_item">
                  <img
                    src={project.coverUrl || "https://picsum.photos/600/400"}
                    alt={project.title}
                  />

                  <div className="content">
                    <button
                      type="button"
                      className="po_btn"
                      onClick={() => openProject(project)}
                    >
                      Voir le projet
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Container>

        <Modal
          show={!!selectedProject}
          onHide={closeModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedProject?.title}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>{selectedProject?.description}</p>

            {selectedProject?.gallery?.length > 0 && (
              <div className="modal-gallery">
                {selectedProject.gallery.map((img, idx) => (
                  <img key={idx} src={img} alt="" />
                ))}
              </div>
            )}

            {!selectedProject?.gallery?.length &&
              selectedProject?.coverUrl && (
                <img
                  src={selectedProject.coverUrl}
                  alt=""
                  className="w-100"
                />
              )}

            {selectedProject?.link && (
              <a
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
                className="btn ac_btn mt-3"
              >
                Ouvrir le lien
              </a>
            )}
          </Modal.Body>

          <Modal.Footer>
            <button className="btn ac_btn" onClick={closeModal}>
              Fermer
            </button>
          </Modal.Footer>
        </Modal>
      </section>
    </HelmetProvider>
  );
};
