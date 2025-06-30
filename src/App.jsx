import { useState } from "react";
import "./App.css";

function App() {
  const [principle, setPrinciple] = useState();
  const [interest, setInterest] = useState();
  const [years, setYears] = useState();
  const [result, setResult] = useState();
  const [record, setrecord] = useState([]);
  const [isdark, setisdark] = useState(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "principle") {
      setPrinciple(value);
    } else if (name === "interest") {
      setInterest(value);
    } else if (name === "years") {
      setYears(value);
    }
  };

  const CalculateEMI = () => {
    let r = interest;
    if (principle && interest && years) {
      r = r / 12 / 100;
      let powerCal = Math.pow(1 + r, years * 12);
      let emi = principle * ((r * powerCal) / (powerCal - 1));
      let emirounded = Math.round(emi);
      let finalval = emirounded && Number(emirounded).toLocaleString("en-IN");
      setResult(`₹${finalval}/-`);
      setrecord({
        principle,
        interest,
        years,
      });
      setInterest("");
      setPrinciple("");
      setYears("");
    }
  };

  const Reload = () => {
    window.location.reload();
  };


  
  return (
    <>
      <div className="container">
        <h1>EMI Calculator</h1>
        <div className="box">
          <p>Enter Amount</p>
          <input
            type="number"
            onChange={handleInput}
            name="principle"
            placeholder="INR"
            value={principle || ""}
          />
          <p htmlFor="">Enter Interest</p>
          <input
            type="number"
            onChange={handleInput}
            name="interest"
            placeholder="%"
            value={interest || ""}
          />
          <p htmlFor="">Time Period</p>
          <input
            type="number"
            onChange={handleInput}
            placeholder="Months"
            name="years"
            value={years || ""}
          />
          <br />
        </div>
        <div className="submission">
          <button className="submitbtn" onClick={CalculateEMI}>
            Calculate EMI
          </button>
          <button onClick={Reload}>Reload</button>
          {/* <button className={isdark ? "appdark" : "app"} onClick={ModeChange}>Mode Change</button> */}
        </div>

        {result && record && (
          <div className="summary">
            <h2>Calculation Summary</h2>
            <p>
              <strong>Principal:</strong> ₹{record.principle}
            </p>
            <p>
              <strong>Interest:</strong> {record.interest}%
            </p>
            <p>
              <strong>Years:</strong> {record.years}
            </p>
            <p>
              <strong>EMI:</strong> {result}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
