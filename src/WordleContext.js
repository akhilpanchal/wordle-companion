import React from "react";
import model from "./model.json";

export const WordleContext = React.createContext();

export const BASE_MAP = {
  exact: 2,
  close: 1,
  miss: 0
};

export const WordleContextProvider = ({ children }) => {
  const [currentWord, setCurrentWord] = React.useState(model);
  const [guessWords, setGuessWords] = React.useState([currentWord.word]);
  const [hints, setHints] = React.useState([
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
  ]);

  const [guessCount, setGuessCount] = React.useState(0);

  const getNextGuess = React.useCallback(() => {
    const hintBase3 = hints[guessCount]
      .map((number) => number.toString())
      .reduce((prev, curr) => prev + curr);
    const hintDecimal = parseInt(parseInt(hintBase3, 10), 3);

    const moveBucket = currentWord.bucketToMove[hintDecimal];

    if (!moveBucket || hintDecimal === 242) {
      console.log("exit");
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
        getNextGuess
      }}
    >
      {children}
    </WordleContext.Provider>
  );
};
