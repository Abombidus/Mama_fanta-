export const energieAppareil = ({ puissance, heures, partActive }) =>
  (puissance * heures * partActive) / 1000;

export const energieTotale = (appareils) =>
  appareils.reduce((prev, next) => prev + energieAppareil(next), 0);

export const repartitionEnergie = (appareils) => {
  const total = energieTotale(appareils);
  return appareils.map((appareil) => ({
    nom: appareil.nom,
    kWh: energieAppareil(appareil),
    part: total > 0 ? energieAppareil(appareil) / total : 0,
  }));
};

export const coutElectriciteMensuel = (appareils, p) =>
  energieTotale(appareils) * 30 * p.prixKWh + p.abonnementMensuel;

export const coutEssenceMensuel = (p) =>
  p.joursCoupureMois * p.dureeMoyenneCoupure * p.litresParHeure * p.prixEssence;

export const coutPertesMensuel = (p) =>
  p.joursCoupureMois *
  p.probaLongueCoupure *
  p.valeurStock *
  p.tauxPerteLongueCoupure;

export const coutActuelMensuel = (appareils, p) =>
  coutElectriciteMensuel(appareils, p) +
  coutEssenceMensuel(p) +
  coutPertesMensuel(p);

export const energieCouverte = (appareils, type) => {
  const filtres = {
    tous: () => true,
    froid: (a) => ["congelateur", "frigo"].includes(a.id),
    critique: (a) => a.id === "congelateur",
  };
  return appareils
    .filter(filtres[type])
    .reduce((s, a) => s + energieAppareil(a), 0);
};

export const dimensionnerSolaire = (appareils, type, p) => {
  const besoinJour = energieCouverte(appareils, type);
  const prodParPanneau = (p.puissancePanneauW * p.heuresSoleil) / 1000;
  const nbPanneaux = Math.ceil(besoinJour / prodParPanneau);
  const besoinNuit = besoinJour * (p.dureeLongueCoupure / 24);
  const batterieUtile = p.capaciteBatterieKWh * p.profondeurDecharge;
  const nbBatteries = Math.max(1, Math.ceil(besoinNuit / batterieUtile));
  const coutInitial = nbPanneaux * p.prixPanneau + nbBatteries * p.prixBatterie;
  return { besoinJour, nbPanneaux, nbBatteries, coutInitial };
};

export const coutCumule = (option, p, annees) => {
  const remplacements = Math.floor(annees / p.dureeVieBatterieAnnees);
  const coutBatteries =
    (option.nbBatteries || 0) * p.prixBatterie * remplacements;
  return option.coutInitial + option.coutMensuel * 12 * annees + coutBatteries;
};

export const construireOptions = (appareils, p) => {
  const petit = dimensionnerSolaire(appareils, "froid", p);
  const complet = dimensionnerSolaire(appareils, "tous", p);

  const mensuelSolaire = () => {
    const reste = p.joursCoupureMois * p.probaLongueCoupure * 0.1;
    return (
      p.abonnementMensuel +
      reste * p.dureeLongueCoupure * p.litresParHeure * p.prixEssence
    );
  };

  const coutGroupeSeul = coutEssenceMensuel(p) + coutPertesMensuel(p) * 0.9;

  return [
    {
      nom: "A. Rien",
      coutInitial: 0,
      coutMensuel: coutActuelMensuel(appareils, p),
      nbBatteries: 0,
      couleur: "#888888",
    },
    {
      nom: "B. Groupe seul",
      coutInitial: 60000,
      coutMensuel: coutGroupeSeul,
      nbBatteries: 0,
      couleur: "#e67e22",
    },
    {
      nom: "C. Petit solaire",
      coutInitial: petit.coutInitial,
      coutMensuel: mensuelSolaire(petit),
      nbBatteries: petit.nbBatteries,
      couleur: "#3498db",
    },
    {
      nom: "D. Solaire total",
      coutInitial: complet.coutInitial,
      coutMensuel: mensuelSolaire(complet),
      nbBatteries: complet.nbBatteries,
      couleur: "#2ecc71",
    },
  ];
};

export const pointBascule = (options, p, horizon = 10) => {
  for (let n = 0; n <= horizon; n++) {
    const couts = options.map((o) => coutCumule(o, p, n));
    const min = Math.min(...couts);
    const idx = couts.indexOf(min);
    if (idx === -1) continue;
    const gagnante = options[idx];
    if (!gagnante) continue;
    if (gagnante.nom.startsWith("C") || gagnante.nom.startsWith("D")) return n;
  }
  return null;
};
