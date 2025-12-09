import React, { useEffect, useMemo, useState } from "react";
import * as emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../config/siteContent";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../config/siteContent";

const emailDefaults = new Set(["service_id", "template_id", "user_id"]);

const getEmailConfigState = () => {
  const values = {
    serviceId: contactConfig.YOUR_SERVICE_ID,
    templateId: contactConfig.YOUR_TEMPLATE_ID,
    userId: contactConfig.YOUR_USER_ID,
  };

  const missing = Object.entries(values)
    .filter(([, value]) => !value || emailDefaults.has(value))
    .map(([key]) => key);

  return {
    values,
    missing,
    envAtBuild: {
      REACT_APP_EMAILJS_SERVICE_ID: process.env.REACT_APP_EMAILJS_SERVICE_ID,
      REACT_APP_EMAILJS_TEMPLATE_ID: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      REACT_APP_EMAILJS_PUBLIC_KEY: process.env.REACT_APP_EMAILJS_PUBLIC_KEY,
    },
  };
};

export const ContactUs = () => {
  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const { missing, envAtBuild } = useMemo(() => getEmailConfigState(), []);

  useEffect(() => {
    if (missing.length > 0) {
      console.warn(
        "[Configuration EmailJS] Utilisation des valeurs de remplacement au lieu d'identifiants réels. GitHub Pages sert un bundle statique : les variables REACT_APP_EMAILJS_* doivent être présentes pendant le build (par exemple dans le workflow Actions) et ne peuvent pas être injectées à l'exécution.",
        {
          missing,
          valuesUsedInBundle: envAtBuild,
          contactConfigValues: getEmailConfigState().values,
        }
      );
    }
  }, [envAtBuild, missing]);

  const isEmailServiceConfigured = () => missing.length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormdata((prev) => ({ ...prev, loading: true }));

    if (!isEmailServiceConfigured()) {
      setFormdata((prev) => ({
        ...prev,
        loading: false,
        alertmessage:
          "Le service d'email n'est pas configuré. GitHub Pages ne peut pas lire les secrets à l'exécution : assurez-vous que les variables REACT_APP_EMAILJS_* sont présentes pendant le build (par exemple via un secret de workflow) au lieu de compter sur les valeurs par défaut de contactConfig.",
        variant: "warning",
        show: true,
      }));
      return;
    }

    const templateParams = {
      from_name: formData.email,
      user_name: formData.name,
      to_name: contactConfig.YOUR_EMAIL,
      message: formData.message,
    };

    emailjs
      .send(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        templateParams,
        contactConfig.YOUR_USER_ID
      )
      .then(
        (result) => {
          console.log(result.text);
          setFormdata((prev) => ({
            ...prev,
            email: "",
            name: "",
            message: "",
            loading: false,
            alertmessage: "Message envoyé ! Merci pour votre message.",
            variant: "success",
            show: true,
          }));
        },
        (error) => {
          console.log(error.text);
          setFormdata((prev) => ({
            ...prev,
            loading: false,
            alertmessage: `Échec de l'envoi : ${error.text}`,
            variant: "danger",
            show: true,
          }));
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  const handleChange = (e) => {
    setFormdata({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{`Contact | ${meta.title}`}</title>
          <meta name="description" content={meta.description} />
          <meta name="keywords" content={meta.keywords} />
          <meta property="og:title" content={`Contact | ${meta.title}`} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:type" content="website" />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contactez-moi</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              //show={formData.show}
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              onClose={() => setFormdata((prev) => ({ ...prev, show: false }))}
              dismissible
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Restons en contact</h3>
            <address>
              <strong>Email :</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Téléphone :</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={handleSubmit} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Nom"
                    value={formData.name || ""}
                    type="text"
                    required
                    onChange={handleChange}
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email || ""}
                    required
                    onChange={handleChange}
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formData.loading ? "Envoi..." : "Envoyer"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
