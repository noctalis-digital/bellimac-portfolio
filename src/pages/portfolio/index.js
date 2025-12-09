import React from "react";
import "./style.css";
import "../home/style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { Container, Row, Col } from "react-bootstrap";
import { dataportfolio, introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Portfolio = () => {
  return (
    <HelmetProvider>
      <section id="portfolio-home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> Portfolio | {meta.title} </title>{" "}
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
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
                <div className="intro_btn-action pb-5">
                  <a href="#portfolio-section" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Mes projets
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </a>
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
            </div>
          </div>
        </div>

        <Container className="About-header" id="portfolio-section">
          <Row className="mb-5 mt-3 pt-md-3">
            <Col lg="8">
              <h1 className="display-4 mb-4"> Portfolio </h1>{" "}
              <hr className="t_border my-4 ml-0 text-left" />
            </Col>
          </Row>
          <div className="mb-5 po_items_ho">
            {dataportfolio.map((data, i) => {
              return (
                <div key={i} className="po_item">
                  <img src={data.img} alt="" />
                  <div className="content">
                    <p>{data.description}</p>
                    <a href={data.link}>Voir le projet</a>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </HelmetProvider>
  );
};
