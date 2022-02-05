import React from "react";
import { WordleContextProvider } from "./WordleContext";
import { Board } from "./Game";

import "./styles.scss";
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <div className="App">
        <h1>WORDLE GENIE</h1>
        <h4>1. Enter the word suggested here in the game.</h4>
        <h4>2. Give the hints by tapping over the letters to change the hint type.</h4>
        <h4>3. Click Go! to get the next word suggestion.</h4>
        <WordleContextProvider>
          <Board />
        </WordleContextProvider>
      </div>
      <footer className="footer">
        <div>
          Built with 💙 by&nbsp;
          <a href="https://github.com/akhilpanchal">Akhil Panchal</a>&nbsp;and&nbsp;
          <a href="https://github.com/infinitymittal">Anant Mittal</a>.&nbsp;
        </div>
        <br />
      </footer>
    </>
  );
}
