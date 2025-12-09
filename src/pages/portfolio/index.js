import React, { useState } from "react";
import "./style.css";
import "../home/style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { dataportfolio, introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
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
            {dataportfolio.map((data, i) => {
              return (
                <div key={i} className="po_item">
                  <img src={data.img} alt="" />
                  <div className="content">
                    <button
                      type="button"
                      className="po_btn"
                      onClick={() => openProject(data)}
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
            {selectedProject?.details && (
              <p className="mb-4">{selectedProject.details}</p>
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
            ) : selectedProject?.img ? (
              <img
                src={selectedProject.img}
                alt={selectedProject.title || "Projet"}
                className="w-100"
              />
            ) : null}
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
