import "./style.css";

export default function ProjectCard({ title, description, image }) {
  return (
    <div className="project_card">

      <div
        className="project_image"
        style={{ backgroundImage: `url(${image})` }}
      />

      <div className="project_content">

        <h3>{title}</h3>

        <p>{description}</p>

      </div>

    </div>
  );
}
