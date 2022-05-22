import React from "react";
import Header from "./Header";
import Figure from "./Figure";
import "./style.css";
import GuessWord from "./GuessWord";
import Reset from "./Reset";

function App() {
  return (
    <>
    <Header/>
    <div className = "game-container">
      <Figure />
    </div>
    <GuessWord/>
    <Reset/>
    </>
  );
}

export default App;