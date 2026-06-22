import "./style.css";
import { useState } from "react";

export default function ProjectCard({
  title,
  description,
  image,
  gallery = [],
  externalLink,
}) {
  const [open, setOpen] = useState(false);

  const images =
    gallery?.length > 0 ? gallery : image ? [image] : [];

  const cover =
    image || gallery?.[0] || "/default.jpg";

  return (
    <>
      <div className="project_card" onClick={() => setOpen(true)}>

        <div
          className="project_image"
          style={{ backgroundImage: `url(${cover})` }}
        />

        <div className="project_content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>

      </div>

      {open && (
        <div className="project_modal" onClick={() => setOpen(false)}>

          <div className="project_modal_content" onClick={(e) => e.stopPropagation()}>

            <div className="project_modal_gallery">

              {images.map((img, i) => (
                <img key={i} src={img} alt={title} />
              ))}

            </div>

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
