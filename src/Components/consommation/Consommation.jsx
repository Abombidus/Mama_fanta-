import { useMemo } from "react";
import { energieTotale, repartitionEnergie } from "../utils/Calcule";
import "./consommation.css";
function Consommation({ appareils }) {
  const total = useMemo(() => energieTotale(appareils), [appareils]);
  const repart = useMemo(() => repartitionEnergie(appareils), [appareils]);
  return (
    <div>
      <section className="carte">
        <h2>🔋 Consommation du jour</h2>
        <div className="total-conso">
          {total.toFixed(2)} <small>kWh / jour</small>
        </div>
        <div className="repartition">
          {repart.map((r) => (
            <div key={r.nom} className="repartition-ligne">
              <div className="haut">
                <span>{r.nom}</span>
                <span>{(r.part * 100).toFixed(0)} %</span>
              </div>
              <div className="barre">
                <div style={{ width: `${r.part * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Consommation;
