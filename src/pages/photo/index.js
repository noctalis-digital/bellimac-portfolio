import "./style.css";

export default function Photo() {
  return (
    <section className="intro_sec">
      
      <div className="text">
        <div className="intro">
          
          <h1>Photographie d’entreprise</h1>
          
          <p>
            Portraits corporate, équipes, événements et communication visuelle pour entreprises et marques.
          </p>

          <div className="feature">
            <p>Portraits professionnels</p>
            <p>Événementiel entreprise</p>
            <p>Communication visuelle</p>
          </div>

          <div className="ac_btn">
            <a href="/contact">Demander un devis</a>
          </div>

        </div>
      </div>

      <div
        className="h_bg-image"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)"
        }}
      ></div>

    </section>
  );
}
