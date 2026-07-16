
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
  

  const cover = coverUrl || "/default.jpg";

const images = [
  cover,
  ...galleryUrls.filter((img) => img !== cover),
];

  return (
    <>
      <div
        className="project_card"
        onClick={() => {
  setCurrentImage(0);
  setOpen(true);
}}
      >
        <div
          className="project_image"
          style={{ backgroundImage: `url(${cover})` }}
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
            <img
  src={images[currentImage]}
  alt={title}
  className="project_modal_image"
/>
    {images.length > 1 && (
  <div className="project_modal_navigation">

    <button
      className="nav_arrow"
      onClick={() =>
        setCurrentImage((currentImage - 1 + images.length) % images.length)
      }
    >
      ←
    </button>

    <div className="project_modal_dots">
      {images.map((_, index) => (
        <span
          key={index}
          className={
            index === currentImage
              ? "dot active"
              : "dot"
          }
        >
          ●
        </span>
      ))}
    </div>

    <button
      className="nav_arrow"
      onClick={() =>
        setCurrentImage((currentImage + 1) % images.length)
      }
    >
      →
    </button>

  </div>
)}

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
    </>
  );
}
