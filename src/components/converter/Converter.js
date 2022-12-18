import React from "react";
import "./Converter.css";
const Converter = () => {
  const USDtoUAH = 36.56;
  const EURtoUAH = 38.48;

  const [UAH, setUAH] = React.useState("0");
  const [USD, setUSD] = React.useState("0");
  const [EUR, setEUR] = React.useState("0");

  const [activeField, setActiveField] = React.useState("UAH");
  const [switchedField, setSwitchedField] = React.useState("UAH");
  React.useEffect(() => {
    switch (activeField) {
      case "UAH":
        setSwitchedField(() => "UAH");
        break;

      case "USD":
        setSwitchedField(() => "USD");
        break;

      case "EUR":
        setSwitchedField(() => "EUR");
        break;

      default:
        break;
    }
  }, [activeField]);
  React.useEffect(calculateAll, [UAH, USD, EUR]);
  function calculateAll() {
    let USDvalue, EURvalue, UAHvalue;
    switch (activeField) {
      case "UAH":
        USDvalue = eval(`${UAH}/${USDtoUAH}`);
        USDvalue = round(USDvalue);
        setUSD(() => USDvalue);

        EURvalue = eval(`${UAH}/${EURtoUAH}`);
        EURvalue = round(EURvalue);
        setEUR(() => EURvalue);
        break;

      case "USD":
        UAHvalue = eval(`${USD}*${USDtoUAH}`);
        UAHvalue = round(UAHvalue);
        setUAH(() => UAHvalue);

        EURvalue = eval(`${USD}/${EURtoUAH / USDtoUAH}`);
        EURvalue = round(EURvalue);
        setEUR(() => EURvalue);
        break;

      case "EUR":
        USDvalue = eval(`${EUR}/${USDtoUAH / EURtoUAH}`);
        USDvalue = round(USDvalue);
        setUSD(() => USDvalue);

        UAHvalue = eval(`${EUR}*${EURtoUAH}`);
        UAHvalue = round(UAHvalue);
        setUAH(() => UAHvalue);
        break;
      default:
        break;
    }
  }
  function calculateValue(value, setValue, symbolValue) {
    let newValue;
    if (switchedField === activeField) {
      newValue = symbolValue;
      setSwitchedField(() => "");
    } else newValue = value + symbolValue;
    if (isValidNumber(newValue)) {
      newValue = removeZero(newValue);
      newValue = setLengthRestriction(newValue);
      setValue(() => newValue);
    }
  }
  function addSymbol(e) {
    let symbolValue = e.target.value;
    switch (activeField) {
      case "UAH":
        calculateValue(UAH, setUAH, symbolValue);
        break;
      case "EUR":
        calculateValue(EUR, setEUR, symbolValue);
        break;
      case "USD":
        calculateValue(USD, setUSD, symbolValue);
        break;
      default:
        break;
    }
  }

  function removeLastElementFromString(string) {
    let newString = string.toString().split("");
    newString.splice(newString.length - 1, 1);
    if (newString.length !== 0) return newString.join("");
    else return "0";
  }
  function removeSymbol() {
    switch (activeField) {
      case "UAH":
        setUAH((prev) => removeLastElementFromString(prev));
        break;

      case "USD":
        setUSD((prev) => removeLastElementFromString(prev));
        break;

      case "EUR":
        setEUR((prev) => removeLastElementFromString(prev));
        break;
      default:
        break;
    }
  }
  function isValidNumber(input) {
    if (!isNaN(input)) {
      return true;
    } else return false;
  }
  function removeZero(input) {
    if (!input.includes(".")) return Number(input);
    else return input;
  }
  function round(input) {
    return Number(input.toFixed(2));
  }
  function resetValues() {
    setUSD(() => "0");
    setEUR(() => "0");
    setUAH(() => "0");
  }
  function setLengthRestriction(input) {
    let inputValue = input.toString();
    let lengthRestriction;
    switch (activeField) {
      case "UAH":
        lengthRestriction = 10;
        if (inputValue.length > lengthRestriction) {
          console.log("restriction applied");
          return inputValue.split("").splice(0, lengthRestriction).join("");
        } else return input;

      case "USD":
        lengthRestriction = 7;
        if (inputValue.length > lengthRestriction) {
          console.log("restriction applied");
          return inputValue.split("").splice(0, lengthRestriction).join("");
        } else return input;

      case "EUR":
        lengthRestriction = 7;
        if (inputValue.length > lengthRestriction) {
          console.log("restriction applied");
          return inputValue.split("").splice(0, lengthRestriction).join("");
        } else return input;
      default:
        break;
    }
  }
  return (
    <>
      <div className="converter">
        <div className="converter-bar">
          <img src={require("./images/exchange.png")} alt="money icon" />
          <button className="reset-btn" type="button" onClick={resetValues}>
            Reset
          </button>
        </div>
        <div className="converter-screen">
          <div className="form">
            <div
              className={activeField === "EUR" ? "EUR active" : "EUR"}
              onClick={() => {
                setActiveField(() => "EUR");
              }}
            >
              <div className="currency-marker">
                <div className="marker-icon">
                  <img
                    src={require("./images/european-union.png")}
                    alt="european-union"
                  />
                </div>
                <div className="marker-text">EUR</div>
              </div>
              <div className="currency-input-field">{EUR}</div>
            </div>
            <div
              className={activeField === "USD" ? "USD active" : "USD"}
              onClick={() => {
                setActiveField(() => "USD");
              }}
            >
              <div className="currency-marker">
                <div className="marker-icon">
                  <img src={require("./images/usa.png")} alt="usa" />
                </div>
                <div className="marker-text">USD</div>
              </div>
              <div className="currency-input-field">{USD}</div>
            </div>
            <div
              className={activeField === "UAH" ? "UAH active" : "UAH"}
              onClick={() => {
                setActiveField(() => "UAH");
              }}
            >
              <div className="currency-marker">
                <div className="marker-icon">
                  <img src={require("./images/ukraine.png")} alt="ukraine" />
                </div>
                <div className="marker-text">UAH</div>
              </div>
              <div className="currency-input-field">{UAH}</div>
            </div>
          </div>
        </div>
        <div
          className="converter-keyboard"
          onClick={(e) => {
            if (e.target.value === "<") removeSymbol();
            else addSymbol(e);
          }}
        >
          <div className="keyboard-row">
            <button className="keyboard-item" value="7">
              7
            </button>
            <button className="keyboard-item" value="8">
              8
            </button>
            <button className="keyboard-item" value="9">
              9
            </button>
          </div>
          <div className="keyboard-row">
            <button className="keyboard-item" value="4">
              4
            </button>
            <button className="keyboard-item" value="5">
              5
            </button>
            <button className="keyboard-item" value="6">
              6
            </button>
          </div>

          <div className="keyboard-row">
            <button className="keyboard-item" value="1">
              1
            </button>
            <button className="keyboard-item" value="2">
              2
            </button>
            <button className="keyboard-item" value="3">
              3
            </button>
          </div>
          <div className="keyboard-row">
            <button className="keyboard-item" value=".">
              .
            </button>
            <button className="keyboard-item" value="0">
              0
            </button>
            <button className="keyboard-item keyboard-remove" value="<">
              <img src={require("./images/delete.png")} alt="delete-button" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Converter;
