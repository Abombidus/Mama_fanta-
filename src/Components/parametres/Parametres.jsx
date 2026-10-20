import "./parametres.css";

function Parametres({ p, setP }) {
  const champ = (label, val, set, step = 1) => (
    <label className="champ">
      {label}
      <input
        type="number"
        step={step}
        value={val}
        onChange={(e) => set(+e.target.value)}
      />
    </label>
  );
  return (
    <div>
      <section className="carte">
        <h2>⚙️ Paramètres</h2>
        <div className="parametres">
          {champ("Prix kWh (FCFA)", p.prixKWh, (v) =>
            setP({ ...p, prixKWh: v }),
          )}
          {champ("Abonnement (FCFA)", p.abonnementMensuel, (v) =>
            setP({ ...p, abonnementMensuel: v }),
          )}
          {champ("Prix essence (FCFA/L)", p.prixEssence, (v) =>
            setP({ ...p, prixEssence: v }),
          )}
          {champ("Jours coupure/mois", p.joursCoupureMois, (v) =>
            setP({ ...p, joursCoupureMois: v }),
          )}
          {champ("Durée coupure (h)", p.dureeMoyenneCoupure, (v) =>
            setP({ ...p, dureeMoyenneCoupure: v }),
          )}
          {champ("Prix panneau (FCFA)", p.prixPanneau, (v) =>
            setP({ ...p, prixPanneau: v }),
          )}
          {champ("Prix batterie (FCFA)", p.prixBatterie, (v) =>
            setP({ ...p, prixBatterie: v }),
          )}
        </div>
      </section>
    </div>
  );
}

export default Parametres;
