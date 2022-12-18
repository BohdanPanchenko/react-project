import React from "react";
import "./StartPage.css";
const StartPage = (props) => {
  const [exitAnimation, setExitAnimation] = React.useState(false);
  const [isHidden, setIsHidden] = React.useState(false);
  return (
    !isHidden && (
      <div className="start-page-container">
        <div className="start-img">
          <img src={require("./images/quiz.png")} alt="start-img" />
        </div>
        <button
          onClick={() => {
            setExitAnimation((prev) => !prev);
            setIsHidden((prev) => !prev);
            props.OnGameStart();
          }}
          className="btn start-btn"
        >
          Start
        </button>
      </div>
    )
  );
};

export default StartPage;
