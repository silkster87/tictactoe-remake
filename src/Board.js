import './Board.css';
export default function Board({ squares, clickedSquare, disabled }) {

  const clickableSquare = disabled ? '' : 'clickableSquare';

  return (
    <>
      {squares.map((row, index) => (
        <div className="row" key={`${row}-${index}`}>
          {row.map((square, i) => {
            return (
              <div className={`square ${square ? '' : clickableSquare}`}
                  key={`square-${index}-${i}`} data-testid={`square-${index}-${i}`} onClick={() => {
                if (square === null && !disabled) clickedSquare(index, i);
              }}>
                {square}
              </div>
            )
          })}
        </div>
      ))}
    </>
  );
}