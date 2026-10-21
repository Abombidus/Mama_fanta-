import "./recommendation.css";
function Recommendation({ bascule }) {
  return (
    <div>
      <section className="carte reco">
        <h2>✅ Recommandation</h2>
        <p>
          Le solaire complet devient rentable vers{" "}
          <strong>{bascule ?? "—"} an(s)</strong>, pas 2 ans comme promis. Mais
          surtout, il réduit fortement le risque de perte d'aliment dans votre
          Frigo, pas seulement sur le plan financier.
        </p>
      </section>
    </div>
  );
}

export default Recommendation;
