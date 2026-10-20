import "./equipement.css";

function Equipement({ appareils, setAppareils }) {
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
  return (
    <div>
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
    </div>
  );
}

export default Equipement;
