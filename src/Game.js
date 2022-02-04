import React from "react";
import Tippy from "@tippyjs/react";
import classNames from "classnames";
import { BASE_MAP, WordleContext } from "./WordleContext";

export const Board = () => {
  const { guessWords, setGuessWords, getNextGuess } = React.useContext(
    WordleContext
  );

  return (
    <div className="board-container">
      <div className="board">
        {guessWords.map((word, row) => {
          console.log("length: ", word.length);
          return <Row row={row} key={word} word={word} />;
        })}
        <button onClick={getNextGuess}>Go!</button>
      </div>
    </div>
  );
};

export const Row = (props) => {
  const { word, row } = props;

  return (
    <div role="menu" className="row">
      {Array.from(word).map((letter, column) => (
        <>
          <Tile row={row} column={column} data-value={letter} letter={letter} />
        </>
      ))}
    </div>
  );
};

export const Tile = ({ letter, row, column, ...props }) => {
  const { hints } = React.useContext(WordleContext);

  const [visible, setVisible] = React.useState(false);

  const toggle = React.useCallback(() => setVisible(!visible), [visible]);

  const handleClick = React.useCallback(() => {
    toggle();
  }, [toggle]);

  return (
    <Tippy
      interactive
      visible={visible}
      placement="bottom"
      content={
        <LetterHint
          visible
          setVisible={setVisible}
          letter={letter}
          row={row}
          column={column}
        />
      }
    >
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
        {letter !== "*" ? letter : null}
      </span>
    </Tippy>
  );
};

const LetterHint = ({ letter, row, column, visible, setVisible }) => {
  const { hints, setHints } = React.useContext(WordleContext);

  const handleClick = React.useCallback(
    (event) => {
      const newHints = [...hints];
      newHints[row][column] = BASE_MAP[event.target.getAttribute("data-value")];

      // BASE_MAP[event.target.getAttribute("data-value")].toString();

      console.log("newHints: ", newHints);
      console.log("data-value: ", event.target.getAttribute("data-value"));
      console.log("row: ", row);
      console.log("column: ", column);

      setHints(newHints);
      setVisible(false);
    },
    [hints, setHints, setVisible, row, column]
  );

  return (
    <span onClick={handleClick}>
      <span data-value="close" role="button" className="hint hint--yellow" />
      <span data-value="exact" role="button" className="hint hint--green" />
      <span data-value="miss" role="button" className="hint" />
    </span>
  );
};
