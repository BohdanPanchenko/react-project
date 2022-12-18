import "./QuestionPage.css";
import React, { useEffect } from "react";
const QuestionPage = (props) => {
  const progressBarLength =
    ((props.currentQuestion + 1) * 100) / props.questionsNumber;
  const [countDownTimer, setCountDownTimer] = React.useState(20);
  const [timerId, setTimerId] = React.useState(null);
  const [animationRestart, setAnimationRestart] = React.useState(false);
  useEffect(() => {
    let localTimerId = setInterval(() => {
      setCountDownTimer((prev) => prev - 1);
    }, 1000);
    setTimerId(() => localTimerId);
  }, []);
  useEffect(() => {
    if (countDownTimer === 0) {
      resetCircleAnimation();
      setCountDownTimer(() => 20);
      props.nextQuestion(false);
    }
  }, [countDownTimer]);
  function resetCircleAnimation() {
    setAnimationRestart((prev) => !prev);
    setTimeout(() => {
      setAnimationRestart((prev) => !prev);
    }, 100);
  }
  return (
    <div className="question-container">
      <div className="question-timer">
        <div className="countdown-number">{countDownTimer}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="108px"
          height="108px"
        >
          <defs>
            <linearGradient id="GradientColor">
              <stop offset="0%" stopColor="#e91e63" />
              <stop offset="100%" stopColor="#673ab7" />
            </linearGradient>
          </defs>

          <circle
            cx="54"
            cy="54"
            r="50"
            strokeLinecap="round"
            style={{ animation: animationRestart ? "none" : "" }}
          />
        </svg>
      </div>
      <div className="question-body">{props.question.question}</div>
      <ul className="question-options">
        {props.question.options.map((el, index) => {
          return (
            <li key={index}>
              <button
                type="button"
                className="option-item"
                onClick={(e) => {
                  resetCircleAnimation();
                  setCountDownTimer(() => 20);
                  if (props.question.options[index].isCorrect) {
                    props.nextQuestion(true);
                  } else props.nextQuestion(false);
                }}
              >
                <span>{el.marker}</span>
                {el.content}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="question-progress">
        <div className="question-number">
          {props.currentQuestion + 1 + " of " + props.questionsNumber}
        </div>
        <div className="progress-bar">
          <span style={{ width: progressBarLength + "%" }}></span>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;
