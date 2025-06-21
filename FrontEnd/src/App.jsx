import "./App.css";
import BoardsContainer from "./Components/BoardsContainer";
import BoardDetails from "./Components/BoardDetails";
import Card from "./Components/Card";
import BoardContextProvider from "./Context/BoardContext";
import ThemeContextProvider from "./Context/ThemeContext";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ThemeContextProvider>
      <BoardContextProvider>
        <div id="App">
          <Router>
            <Routes>
              <Route path="/" element={<BoardsContainer />} />
              <Route path="/boards/:boardId" element={<BoardDetails />} />
              <Route path="/boards/:boardId/cards/:cardId" element={<Card />} />
            </Routes>
          </Router>
        </div>
      </BoardContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
