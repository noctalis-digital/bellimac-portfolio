import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { introdata, meta } from "../../config/siteContent";
import { Link } from "react-router-dom";

export const Home = () => {
  const pageTitle = `Accueil | ${meta.title}`;
  const pageDescription = meta.description;

  return (
    <HelmetProvider>
      <section id="home" className="home">

        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
          <meta name="description" content={pageDescription} />
          <meta name="keywords" content={meta.keywords} />
          <meta property="og:title" content={pageTitle} />
          <meta property="og:description" content={pageDescription} />
          <meta property="og:type" content="website" />
        </Helmet>

        <div className="intro_sec d-block d-lg-flex align-items-center">

          {/* IMAGE (modifiée via introdata.your_img_url) */}
          <div
            className="h_bg-image order-1 order-lg-2 h-100"
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>

          {/* TEXTE */}
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center">

              <div className="intro mx-auto">

                <h1 className="fluidz-48 mb-1x">
                  Photographie d’entreprise<br />
                  Direction de la photographie<br />
                  Lumière & production plateau
                </h1>

                <p className="mb-1x">
                  J’accompagne entreprises et productions dans la création d’images fortes :
                  portraits corporate, communication visuelle et direction artistique sur plateau.
                </p>

                <div className="intro_btn-action pb-5">

                  <Link to="/photo" className="text_2">
                    <div id="button_p" className="ac_btn btn">
                      Voir mes services
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>

                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Demander un devis
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
      </section>
    </HelmetProvider>
  );
};
