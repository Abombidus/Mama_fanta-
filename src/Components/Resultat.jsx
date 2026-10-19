export const creerGenerateur = (seed) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const tirerCoupuresAnnee = (rand, p) => {
  const coupures = [];
  for (let mois = 0; mois < 12; mois++) {
    const nb = Math.round(p.joursCoupureMois * (0.5 + rand()));
    for (let i = 0; i < nb; i++) {
      const longue = rand() < p.probaLongueCoupure;
      coupures.push(
        longue
          ? p.dureeLongueCoupure * (0.8 + rand() * 0.6)
          : p.dureeMoyenneCoupure * (0.5 + rand()),
      );
    }
  }
  return coupures;
};

const congeleSurvit = (duree, nom) => {
  if (nom === "A. Rien") return duree <= 8;
  if (nom === "B. Groupe seul") return duree <= 12;
  if (nom === "C. Petit solaire") return duree <= 14;
  return true;
};

export const simuler1000Annees = (options, p, seed = 42) =>
  options.map((option, idx) => {
    const rand = creerGenerateur(seed + idx * 1000);
    let pannes = 0;
    for (let annee = 0; annee < 1000; annee++) {
      const coupures = tirerCoupuresAnnee(rand, p);
      if (coupures.some((d) => !congeleSurvit(d, option.nom, p))) pannes++;
    }
    return { nom: option.nom, tauxPanne: pannes / 1000 };
  });
