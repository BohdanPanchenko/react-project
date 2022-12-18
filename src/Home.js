import { Link } from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import "./Home.css";
const Home = () => {
  return (
    <>
      <nav className="menu">
        {/* <Link to="/">Home</Link> */}
        <Link to="/quiz">Quiz</Link>
        <Link to="/converter">Converter</Link>
        <Link to="/photogram">Photogram</Link>
      </nav>
    </>
  );
};

export default Home;
