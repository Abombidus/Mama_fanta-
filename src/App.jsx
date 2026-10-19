import { useState, useMemo, useEffect } from "react";
import { Devices, Parameters } from "./info/Data.jsx";
import {
  energieTotale,
  repartitionEnergie,
  construireOptions,
  coutCumule,
  pointBascule,
} from "./Components/Calcule.jsx";
import { simuler1000Annees } from "./Components/Resultat.jsx";
import { formatFCFA } from "./Components/Format.jsx";
import Header from "./Components/header/Header.jsx";
import Recommendation from "./Components/recommendation/Recommendation.jsx";
// import Carte from "./Components/carte/Carte.jsx";

export default function App() {
  const [appareils, setAppareils] = useState(Devices);
  const [p, setP] = useState(Parameters);
  const [seed, setSeed] = useState(42);
  const [sim, setSim] = useState(null);

  const total = useMemo(() => energieTotale(appareils), [appareils]);
  const repart = useMemo(() => repartitionEnergie(appareils), [appareils]);
  const options = useMemo(
    () => construireOptions(appareils, p),
    [appareils, p],
  );
  const bascule = useMemo(() => pointBascule(options, p), [options, p]);

  const majAppareil = (i, champ, val) => {
    const copie = [...appareils];
    copie[i] = { ...copie[i], [champ]: val };
    setAppareils(copie);
  };
  const supprimer = (i) => setAppareils(appareils.filter((_, j) => j !== i));
  const ajouter = () =>
    setAppareils([
      ...appareils,
      {
        id: `a${Date.now()}`,
        nom: "Nouvel appareil",
        puissance: 50,
        heures: 1,
        partActive: 1,
      },
    ]);

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

  useEffect(() => {
    alert("Jai mes suggestion sont dans le fichier README.md");
  }, []);

  return (
    <div className="app">
      <Header />

      {/* ÉQUIPEMENTS */}
      <section className="carte">
        <h2>Équipements</h2>
        {appareils.map((a, i) => (
          <div key={a.id} className="equipement">
            <div>
              <input
                className="equipement-nom"
                value={a.nom}
                onChange={(e) => majAppareil(i, "nom", e.target.value)}
              />
              <div className="equipement-champs">
                <span>Puis.</span>
                <input
                  type="number"
                  value={a.puissance}
                  onChange={(e) => majAppareil(i, "puissance", +e.target.value)}
                />
                <span>W ·</span>
                <span>Heures</span>
                <input
                  type="number"
                  value={a.heures}
                  onChange={(e) => majAppareil(i, "heures", +e.target.value)}
                />
                <span>h ·</span>
                <span>Actif</span>
                <input
                  type="number"
                  step="0.1"
                  value={a.partActive}
                  onChange={(e) =>
                    majAppareil(i, "partActive", +e.target.value)
                  }
                />
              </div>
            </div>
            <button className="btn-suppr" onClick={() => supprimer(i)}>
              🗑
            </button>
          </div>
        ))}
        <button className="btn-ajout" onClick={ajouter}>
          + Ajouter un appareil
        </button>
      </section>

      {/* PARAMÈTRES */}
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

      {/* CONSOMMATION */}
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

      {/* COMPARAISON */}
      <section className="carte">
        <h2>💰 Comparaison</h2>
        <div className="tableau-wrap">
          <table>
            <thead>
              <tr>
                <th>Option</th>
                <th>Initial</th>
                <th>Mensuel</th>
                <th>1 an</th>
                <th>3 ans</th>
                <th>5 ans</th>
              </tr>
            </thead>
            <tbody>
              {options.map((o) => (
                <tr key={o.nom}>
                  <td>{o.nom}</td>
                  <td>{formatFCFA(o.coutInitial)}</td>
                  <td>{formatFCFA(o.coutMensuel)}</td>
                  <td>{formatFCFA(coutCumule(o, p, 1))}</td>
                  <td>{formatFCFA(coutCumule(o, p, 3))}</td>
                  <td>{formatFCFA(coutCumule(o, p, 5))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {bascule !== null && (
          <div className="note-bascule">
            💡 Le solaire devient le moins cher vers{" "}
            <strong>{bascule} an(s)</strong>.
          </div>
        )}
      </section>

      {/* GRAPHIQUE */}
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

      {/* SIMULATION */}
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

      <Recommendation bascule={bascule} />
    </div>
  );
}
