import "./simulation.css";

function Simulation({
  sim,
  setSim,
  seed,
  setSeed,
  options,
  p,
  simuler1000Annees,
}) {
  return (
    <div>
      <section className="carte">
        <h2>Simulation</h2>
        <div className="sim-controls">
          <label className="champ">
            Graine (seed)
            <input
              type="number"
              value={seed}
              onChange={(e) => setSeed(+e.target.value)}
            />
          </label>
          <button
            className="btn-simuler"
            onClick={() => setSim(simuler1000Annees(options, p, seed))}
          >
            ▶ Simuler 1000 années
          </button>
        </div>
        {sim && (
          <div className="sim-resultats">
            {sim.map((s) => (
              <div key={s.nom} className="sim-ligne">
                <span>{s.nom}</span>
                <strong>{(s.tauxPanne * 100).toFixed(1)} %</strong>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Simulation;
