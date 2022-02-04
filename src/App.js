import React from "react";
import { WordleContextProvider } from "./WordleContext";
import { Board } from "./Game";

import "./styles.scss";
import "tippy.js/dist/tippy.css";
// import "tippy.js/themes/light.css";
// import "tippy.js/themes/light-border.css";
// import "tippy.js/themes/material.css";
import "tippy.js/themes/translucent.css";

export default function App() {
  return (
    <div className="App">
      <h1>WORDLE SOLVER</h1>
      <h4>1. Enter the word suggested here in the game</h4>
      <h4>2. Give the hints by hovering over the letters</h4>
      <h4>3. Click Go! to get the next word suggestion</h4>
      <WordleContextProvider>
        <Board />
      </WordleContextProvider>
    </div>
  );
}
