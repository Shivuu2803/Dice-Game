import "./index.css";
import StartGame from "./components/StartGame";
import { useState } from "react";
import GamePlay from "./components/GamePlay";

const App = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const toggleGamePlay = () => {
    setIsGameStarted((prev) => !prev);
  };

  return (
    <>
      {isGameStarted ? <GamePlay></GamePlay> : <StartGame toggle={toggleGamePlay}></StartGame>}
    </>
  );
};

export default App;
