"use client";

import { useState } from "react";

const ROWS = [
  { us: 6, uk: 5, eu: 39, cm: 24.1 },
  { us: 7, uk: 6, eu: 40, cm: 24.8 },
  { us: 8, uk: 7, eu: 41, cm: 25.7 },
  { us: 9, uk: 8, eu: 42, cm: 26.7 },
  { us: 10, uk: 9, eu: 43, cm: 27.5 },
  { us: 11, uk: 10, eu: 44, cm: 28.3 },
  { us: 12, uk: 11, eu: 45, cm: 29.2 },
];

export default function SizeGuide() {
  const [len, setLen] = useState("");
  const n = parseFloat(len);
  const valid = !isNaN(n) && n >= 20 && n <= 33;
  const match = valid ? ROWS.find((r) => r.cm >= n) : null;

  return (
    <>
      <div className="glass card rv finder">
        <h3>Find your size</h3>
        <p>Stand on a sheet of paper, mark your longest toe and heel, then measure the distance in centimetres.</p>
        <label className="fld"><input type="number" step="0.1" min="20" max="33" placeholder="Foot length in cm, e.g. 26.2" value={len} onChange={(e) => setLen(e.target.value)} aria-label="Foot length in centimetres" /></label>
        {len !== "" && !valid && <small className="errmsg">Enter a length between 20 and 33 cm.</small>}
        {valid && (
          <div className="result">
            {match ? <>Your size: <b>US {match.us}</b> / UK {match.uk} / EU {match.eu}</> : <>Longer than our range. Try <b>US 12</b> and check fit in store.</>}
          </div>
        )}
      </div>

      <div className="glass card rv table-wrap">
        <table className="size-table">
          <thead><tr><th>US</th><th>UK</th><th>EU</th><th>Foot length (cm)</th></tr></thead>
          <tbody>{ROWS.map((r) => (<tr key={r.us} className={match && match.us === r.us ? "hit" : ""}><td>{r.us}</td><td>{r.uk}</td><td>{r.eu}</td><td>{r.cm}</td></tr>))}</tbody>
        </table>
      </div>
      <p className="note rv">Sizes are approximate. Aero shoes fit true to size with a roomy toe box. Between sizes? Go half a size up.</p>
    </>
  );
}
