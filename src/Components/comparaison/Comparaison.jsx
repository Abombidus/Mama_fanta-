import "./comparaison.css";

function Comparaison({ options, formatFCFA, coutCumule, p, bascule }) {
  return (
    <div>
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
    </div>
  );
}

export default Comparaison;
