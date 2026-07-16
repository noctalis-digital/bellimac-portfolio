
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

  const cover = coverUrl || galleryUrls?.[0] || "/default.jpg";

  // On retire l'image de couverture de la galerie si elle y est déjà
  const gallery =
    galleryUrls && galleryUrls.length > 0
      ? galleryUrls.filter((img) => img !== cover)
      : [];

  return (
    <>
      <div
        className="project_card"
        onClick={() => setOpen(true)}
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
            <img src={cover} alt={title} />

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

            {gallery.length > 0 && (
              <div className="project_modal_gallery">
                {gallery.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`${title} ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
