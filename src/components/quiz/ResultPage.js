import React from "react";
import "./ResultPage.css";
const ResultPage = (props) => {
  const scorePercentage = Math.round(
    (props.score * 100) / props.questionsNumber
  );
  const circleLength = 2 * Math.PI * 90;
  const [strokeDashoffset, setStrokeDashoffset] = React.useState(circleLength);
  const [strokeDasharray, setStrokeDasharray] = React.useState(circleLength);
  function getColor(percentage) {
    if (percentage < 25) return "#ff0000";
    else if (percentage > 25 && percentage < 50) return "#ffd600";
    else if (percentage > 50 && percentage < 75) return "#8fe964";
    else return "#3eab00";
  }
  React.useEffect(() => {
    setStrokeDashoffset(
      () => circleLength - (circleLength * scorePercentage) / 100
    );
  }, []);
  return (
    <div className="result-page-container">
      <div className="result-percentage">
        <div className="percentage-circle">
          <img src={require("./images/trophy.png")} alt="medal-img" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="200px"
            height="200px"
          >
            <defs>
              <linearGradient id="GradientColor">
                <stop offset="0%" stopColor="#e91e63" />
                <stop offset="100%" stopColor="#673ab7" />
              </linearGradient>
            </defs>
            <circle
              cx="100"
              cy="100"
              r="90"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              stroke={getColor(scorePercentage)}
            />
          </svg>
        </div>
        <div className="percentage-number">{scorePercentage + "% Score"}</div>
      </div>
      <button className="restart-btn" onClick={props.restartGame} type="button">
        Restart
      </button>
    </div>
  );
};

export default ResultPage;
