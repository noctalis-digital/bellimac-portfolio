import "./style.css";

export default function Photo() {
  return (
    <section className="intro_sec">

      <div className="text">
        <div className="intro">

          <h1>Photographie d’entreprise</h1>

          <p>
            Je crée des images professionnelles pour entreprises et marques :
            portraits, équipes, événements et communication visuelle.
            Objectif : des visuels cohérents, exploitables en communication et marketing.
          </p>

          <div className="feature">
            <h3>Prestations</h3>
            <p>Portraits corporate (dirigeants, équipes)</p>
            <p>Reportage en entreprise</p>
            <p>Communication visuelle / branding</p>
            <p>Événementiel professionnel</p>
          </div>

          <div className="feature">
            <h3>Approche</h3>
            <p>Direction artistique sur place</p>
            <p>Adaptation lumière (studio / naturel)</p>
            <p>Livraison optimisée web & print</p>
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
