import React from "react";
import model from "./model.json";
import { toast } from "react-toastify";

export const WordleContext = React.createContext();

export const WordleContextProvider = ({ children }) => {
  const initialHintsState = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],    
  ];
  const [currentWord, setCurrentWord] = React.useState(model);
  const [guessWords, setGuessWords] = React.useState([currentWord.word]);
  const [hints, setHints] = React.useState(initialHintsState);
  const [guessCount, setGuessCount] = React.useState(0);
  const [gameState, setGameState] = React.useState("IN_PROGRESS");

  const resetGame = React.useCallback(() => {
    setCurrentWord(model);
    setGuessWords([currentWord.word]);
    setHints(initialHintsState);
    setGuessCount(0);
    setGameState("IN_PROGRESS");
  }, []);

  const getNextGuess = React.useCallback(() => {
    const hintBase3 = hints[guessCount]
      .map((number) => number.toString())
      .reduce((prev, curr) => prev + curr);
    const hintDecimal = parseInt(parseInt(hintBase3, 10), 3);

    const moveBucket = currentWord.bucketToMove[hintDecimal];

    if (hintDecimal === 242) {
      setGameState("SUCCESS");
      toast.success("Wow! That was easy! 🎉", {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (!moveBucket) {
      setGameState("ERROR");
      toast.error("Word is not in the Dictionary! 🚑", {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    } else {
      setCurrentWord(currentWord.bucketToMove[hintDecimal]);
      setGuessWords([...guessWords, moveBucket.word]);
      setGuessCount(guessCount + 1);
    }
  }, [guessCount, setGuessCount, currentWord, guessWords, hints]);

  console.log("hints: ", hints);
  return (
    <WordleContext.Provider
      value={{
        currentWord,
        guessWords,
        setGuessWords,
        hints,
        setHints,
        getNextGuess,
        gameState,
        resetGame
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
