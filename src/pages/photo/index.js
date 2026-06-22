import "./style.css";

export default function Photo() {
  return (
    <div className="page">
      <div className="hero">
        <h1>Photographie d’entreprise</h1>
        <p>Portraits, équipes, événements et communication visuelle.</p>
      </div>

      <div className="gallery">
        <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="photo1" />
        <img src="https://images.unsplash.com/photo-1521791136064-7986c2920216" alt="photo2" />
        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df" alt="photo3" />
      </div>
    </div>
  );
}
