function Recommendation({ bascule }) {
  return (
    <div>
      <section className="carte reco">
        <h2>✅ Recommandation</h2>
        <p>
          Le solaire complet devient rentable vers{" "}
          <strong>{bascule ?? "—"} an(s)</strong>, pas 2 ans comme promis. Mais
          surtout, il réduit fortement le risque de perdre le poisson. C'est le
          risque qui compte pour Mama Fanta, pas seulement l'économie.
        </p>
      </section>
    </div>
  );
}

export default Recommendation;
