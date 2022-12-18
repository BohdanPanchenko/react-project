import "./Quiz.css";
import StartPage from "./StartPage";
import QuestionPage from "./QuestionPage";
import ResultPage from "./ResultPage";
import React from "react";
const Quiz = (props) => {
  const questions = [
    {
      question: "How many bits make a byte?",
      options: [
        { marker: "A", content: "16 bits", isCorrect: false },
        { marker: "B", content: "8 bits", isCorrect: true },
        { marker: "C", content: "24 bits", isCorrect: false },
        { marker: "D", content: "12 bits", isCorrect: false },
      ],
    },
    {
      question: "First search engine on internet is",
      options: [
        { marker: "A", content: "Aliweb", isCorrect: true },
        { marker: "B", content: "Google", isCorrect: false },
        { marker: "C", content: "Bing", isCorrect: false },
        { marker: "D", content: "Yahoo", isCorrect: false },
      ],
    },
    {
      question: "First web browser invented in 1990 is",
      options: [
        { marker: "A", content: "WorldWideWeb", isCorrect: true },
        { marker: "B", content: "Internet Explorer", isCorrect: false },
        { marker: "C", content: "Mosaic", isCorrect: false },
        { marker: "D", content: "Nexus", isCorrect: false },
      ],
    },
    {
      question:
        "What technology is used to record cryptocurrency transactions?",
      options: [
        { marker: "A", content: "Mining", isCorrect: false },
        { marker: "B", content: "Digital wallet", isCorrect: false },
        { marker: "C", content: "Blockchain technology", isCorrect: true },
        { marker: "D", content: "Token", isCorrect: false },
      ],
    },
    {
      question: "What is the meaning of (CPU)?",
      options: [
        { marker: "A", content: "Central processing Unit", isCorrect: true },
        { marker: "B", content: "Critical processing Unit", isCorrect: false },
        { marker: "C", content: "Crucial processing Unit", isCorrect: false },
        { marker: "D", content: "Central printing Unit", isCorrect: false },
      ],
    },
    {
      question: "The other name for a Hard disk is",
      options: [
        { marker: "A", content: "Compact disc", isCorrect: false },
        { marker: "B", content: "Fixed disc", isCorrect: false },
        { marker: "C", content: "Hard drive disc", isCorrect: true },
        { marker: "D", content: "Floppy disc", isCorrect: false },
      ],
    },
    {
      question: "The largest key on the keyboard is",
      options: [
        { marker: "A", content: "Shift", isCorrect: false },
        { marker: "B", content: "Space bar", isCorrect: true },
        { marker: "C", content: "Escape", isCorrect: false },
        { marker: "D", content: "Tab", isCorrect: false },
      ],
    },
  ];
  const [gameStarted, setGameStarted] = React.useState(false);
  const [gameFinished, setGameFinished] = React.useState(false);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);

  function startGame() {
    setGameStarted((prev) => !prev);
  }
  function getToTheNextQuestion(isCorrect) {
    if (currentQuestion === questions.length - 1) {
      setGameStarted((prev) => !prev);
      setGameFinished((prev) => !prev);
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      return;
    }
    setCurrentQuestion((prev) => prev + 1);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  }

  function restartGame() {
    setGameStarted(() => true);
    setGameFinished(() => false);
    setCurrentQuestion(() => 0);
    setScore(() => 0);
  }
  return (
    <div className="quiz-wrapper">
      <div className="quiz">
        <div className="quiz-body">
          {!gameStarted && !gameFinished && (
            <StartPage OnGameStart={startGame} />
          )}
          {gameStarted && (
            <>
              <QuestionPage
                question={questions[currentQuestion]}
                currentQuestion={currentQuestion}
                questionsNumber={questions.length}
                nextQuestion={getToTheNextQuestion}
              />
            </>
          )}
          {!gameStarted && gameFinished && (
            <ResultPage
              score={score}
              questionsNumber={questions.length}
              restartGame={restartGame}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Quiz;
