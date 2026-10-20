import "./graphique.css";

function Graphique({ options, coutCumule, p }) {
  const annees = [0, 1, 2, 3, 4, 5];
  const L = 400,
    H = 250;
  const series = options.map((o) => ({
    ...o,
    pts: annees.map((n) => coutCumule(o, p, n)),
  }));
  const maxC = Math.max(...series.flatMap((s) => s.pts));
  const X = (n) => (n / 5) * L;
  const Y = (c) => H - (c / maxC) * H;

  return (
    <div>
      <section className="carte">
        <h2>📈 Coût cumulé</h2>
        <div className="graphique">
          <svg viewBox={`0 0 ${L} ${H}`} style={{ width: "100%" }}>
            {series.map((s) => (
              <polyline
                key={s.nom}
                points={s.pts.map((c, i) => `${X(i)},${Y(c)}`).join(" ")}
                fill="none"
                stroke={s.couleur}
                strokeWidth="2"
              />
            ))}
          </svg>
        </div>
        <div className="legende">
          {series.map((s) => (
            <span key={s.nom}>
              <span className="pastille" style={{ background: s.couleur }} />
              {s.nom}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Graphique;
