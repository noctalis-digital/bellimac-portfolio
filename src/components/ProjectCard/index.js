import "./style.css";
import { useState } from "react";

export default function ProjectCard({
  title,
  description,
  coverUrl,
  galleryUrls = [],
  externalLink,
}) {
  const [open, setOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const cover = coverUrl || galleryUrls?.[0] || "/default.jpg";

  const images = [
    cover,
    ...galleryUrls.filter((img) => img !== cover),
  ];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const openModal = () => {
    setCurrentImage(0);
    setOpen(true);
  };

  return (
    <>
      <div
        className="project_card"
        onClick={openModal}
      >
        <div
          className="project_image"
          style={{
            backgroundImage: `url(${cover})`,
          }}
        />
      </div>


      {open && (
        <div
          className="project_modal"
          onClick={() => setOpen(false)}
        >

          <div
            className="project_modal_content"
            onClick={(e) => e.stopPropagation()}
          >

            {/* IMAGE */}
            <div className="project_modal_image_container">

              {images.length > 1 && (
                <button
                  className="project_slider_button project_slider_prev"
                  onClick={previousImage}
                >
                  ←
                </button>
              )}


              <img
                className="project_modal_image"
                src={images[currentImage]}
                alt={title}
              />


              {images.length > 1 && (
                <button
                  className="project_slider_button project_slider_next"
                  onClick={nextImage}
                >
                  →
                </button>
              )}

            </div>


            {/* POINTS */}
            {images.length > 1 && (
              <div className="project_slider_dots">

                {images.map((_, index) => (
                  <span
                    key={index}
                    className={
                      index === currentImage
                        ? "project_slider_dot active"
                        : "project_slider_dot"
                    }
                    onClick={() => setCurrentImage(index)}
                  />
                ))}

              </div>
            )}



            {/* TEXTE */}

            <div className="project_modal_text">

              <h2>{title}</h2>

              <p>{description}</p>


              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project_link"
                >
                  Voir le projet
                </a>
              )}

            </div>


          </div>

        </div>
      )}

    </>
  );
}
