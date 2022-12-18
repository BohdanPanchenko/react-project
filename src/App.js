import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Quiz from "./components/quiz/Quiz";
import Converter from "./components/converter/Converter";
import Photogram from "./components/photogram/Photogram";
import Home from "./Home";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/converter" element={<Converter />} />
          <Route path="/photogram" element={<Photogram />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
