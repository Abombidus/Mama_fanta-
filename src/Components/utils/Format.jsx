export const formatFCFA = (n) =>
  `${Math.round(n)
    .toLocaleString("fr-FR")
    .replace(/\u202F/g, " ")} FCFA`;
