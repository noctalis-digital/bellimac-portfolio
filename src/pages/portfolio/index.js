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
  const gallery =
    project?.gallery?.map((item) => item.url || item) ||
    project?.galleryUrls ||
    [];
  const coverUrl =
    project.coverUrl ||
    project.cover?.url ||
    gallery[0] ||
    project.img ||
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
        setProjects(items.map((item) => normalizeProject(item)));
      } catch (err) {
        console.error("[portfolio] Chargement impossible", err);
        if (active) {
          setError(
            err.message || "Impossible de charger le portfolio pour le moment."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
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
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content={meta.keywords} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
        </Helmet>
        <Container className="About-header" id="portfolio-section">
          <div className="intro mx-auto mb-5">
            <h2 className="mb-1x">{introdata.title}</h2>
            <h1 className="fluidz-48 mb-1x">
              <Typewriter
                options={{
                  strings: [
                    introdata.animated.first,
                    introdata.animated.second,
                    introdata.animated.third,
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 10,
                }}
              />
            </h1>
            <p className="mb-1x">{introdata.description}</p>
            <div className="intro_btn-action pb-4">
              {/* <a href="#portfolio-grid" className="text_2">
                <div id="button_p" className="ac_btn btn ">
                  Mes projets
                  <div className="ring one"></div>
                  <div className="ring two"></div>
                  <div className="ring three"></div>
                </div>
              </a> */}
              <Link to="/contact">
                <div id="button_h" className="ac_btn btn">
                  Contactez-moi
                  <div className="ring one"></div>
                  <div className="ring two"></div>
                  <div className="ring three"></div>
                </div>
              </Link>
            </div>
          </div>

          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <div className="mb-5 po_items_ho" id="portfolio-grid">
            {loading && (
              <p className="text-muted">Chargement du portfolio...</p>
            )}
            {error && <p className="text-warning">{error}</p>}
            {!loading && !error && projects.length === 0 && (
              <p className="text-muted">
                Les projets seront publiés ici dès qu'ils seront disponibles.
              </p>
            )}
            {!loading &&
              !error &&
              projects.map((project) => {
                return (
                  <div key={project.id || project.title} className="po_item">
                    {project.coverUrl ? (
                      <img
                        src={project.coverUrl}
                        alt={project.title || "Projet"}
                      />
                    ) : (
                      <div className="po_placeholder">
                        <p>Image à venir</p>
                      </div>
                    )}
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
                );
              })}
          </div>
        </Container>

        <Modal
          show={!!selectedProject}
          onHide={closeModal}
          size="lg"
          centered
          contentClassName="portfolio-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedProject?.title || "Projet"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProject?.description && (
              <p className="mb-3">{selectedProject.description}</p>
            )}
            {selectedProject?.detailsHtml && (
              <div
                className="mb-4 rich-text"
                dangerouslySetInnerHTML={{
                  __html: selectedProject.detailsHtml,
                }}
              />
            )}
            {selectedProject?.gallery?.length ? (
              <div className="modal-gallery">
                {selectedProject.gallery.map((img, idx) => (
                  <img
                    key={`${selectedProject.title || "Projet"}-${idx}`}
                    src={img}
                    alt={`${selectedProject.title || "Projet"} ${idx + 1}`}
                  />
                ))}
              </div>
            ) : selectedProject?.coverUrl ? (
              <img
                src={selectedProject.coverUrl}
                alt={selectedProject.title || "Projet"}
                className="w-100"
              />
            ) : null}
            {selectedProject?.link && (
              <div className="mt-3">
                <a
                  href={selectedProject.link}
                  className="btn ac_btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ouvrir le lien
                </a>
              </div>
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
