import React from "react";
import ToggleButton from "./ToggleButton";
import Header from "./Header";
import Figure from "./Figure";
import "./style.css";

function App() {
  return (
    <>
    <Header/>
    <div className = "game-container">
      <Figure/>
    </div>
    <ToggleButton/>
    </>
  );
}


export default App;
