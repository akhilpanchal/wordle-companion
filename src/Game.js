import React from "react";
import classNames from "classnames";
import { WordleContext } from "./WordleContext";
import { ToastContainer } from "react-toastify";

export const Board = () => {
  const { guessWords, getNextGuess, gameState, resetGame } = React.useContext(
    WordleContext
  );

  return (
    <>
      <div className="board-container">
        <div className="board">
          {guessWords.map((word, row) => {
            console.log("length: ", word.length);
            return <Row row={row} key={word} word={word} />;
          })}
          {gameState === "IN_PROGRESS" ? (
            <button className="action-button" onClick={getNextGuess}>✈️ GO</button>
          ) : (
            <button className="action-button" onClick={resetGame}>⎌ Reset</button>
          )}
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export const Row = (props) => {
  const { word, row } = props;

  return (
    <div role="menu" className="row">
      {Array.from(word).map((letter, column) => (
        <Tile
          key={column}
          row={row}
          column={column}
          data-value={letter}
          letter={letter}
        />
      ))}
    </div>
  );
};

const getNextHintType = (hintType) => {
  if (hintType === 0) {
    return 1;
  } else if (hintType === 1) {
    return 2;
  }
  return 0;
};

export const Tile = ({ letter, row, column, ...props }) => {
  const { hints, setHints } = React.useContext(WordleContext);

  const handleClick = React.useCallback(() => {
    const newHints = [...hints];
    newHints[row][column] = getNextHintType(newHints[row][column]);
    setHints(newHints);
  }, [row, column, hints, setHints]);

  return (
    <span
      className={classNames("tile", {
        "tile--exact": hints[row][column] === 2,
        "tile--close": hints[row][column] === 1,
        "tile--miss": hints[row][column] === 0
      })}
      data-value={letter}
      {...props}
      onClick={handleClick}
    >
      {letter}
    </span>
  );
};
