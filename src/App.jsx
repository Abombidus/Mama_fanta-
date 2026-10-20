import { useState, useMemo, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";

import { Parameters } from "./info/Data.jsx";
import {
  construireOptions,
  coutCumule,
  pointBascule,
} from "./Components/utils/Calcule.jsx";
import { simuler1000Annees } from "./Components/utils/Resultat.jsx";
import { formatFCFA } from "./Components/utils/Format.jsx";

import { AppContext } from "./context/AppContext.jsx";
import Header from "./Components/header/Header.jsx";
import Equipement from "./Components/equipement/Equipement.jsx";
import Parametres from "./Components/parametres/Parametres.jsx";
import Consommation from "./Components/consommation/Consommation.jsx";
import Comparaison from "./Components/comparaison/Comparaison.jsx";
import Graphique from "./Components/graphique/Graphique.jsx";
import Simulation from "./Components/simulation/Simulation.jsx";
import Recommendation from "./Components/recommendation/Recommendation.jsx";
import Footer from "./Components/footer/Footer.jsx";

export default function App() {
  const outils = useContext(AppContext);
  const [appareils, setAppareils] = useState(outils);
  const [p, setP] = useState(Parameters);
  const [seed, setSeed] = useState(42);
  const [sim, setSim] = useState(null);

  const options = useMemo(
    () => construireOptions(appareils, p),
    [appareils, p],
  );
  const bascule = useMemo(() => pointBascule(options, p), [options, p]);

  //Notification Action
  const notify = () =>
    toast.warning("Les Suggestions sont dans le fichier README.md!", {
      style: {
        background: "#ca6c1f",
        color: "white",
        fontSize: "1.5rem",
        width: "100%",
        textAlign: "center",
        padding: "2.5rem",
      },
    });

  useEffect(() => {
    notify();
  }, []);

  return (
    <div className="app">
      <ToastContainer position="top-center" autoClose={5000} />
      <Header />
      <Equipement appareils={appareils} setAppareils={setAppareils} />
      <Parametres p={p} setP={setP} />
      <Consommation appareils={appareils} />
      <Comparaison
        options={options}
        formatFCFA={formatFCFA}
        coutCumule={coutCumule}
        p={p}
        bascule={bascule}
      />
      <Graphique coutCumule={coutCumule} options={options} p={p} />
      <Simulation
        sim={sim}
        setSim={setSim}
        seed={seed}
        setSeed={setSeed}
        options={options}
        p={p}
        simuler1000Annees={simuler1000Annees}
      />
      <Recommendation bascule={bascule} />
      <Footer />
    </div>
  );
}
