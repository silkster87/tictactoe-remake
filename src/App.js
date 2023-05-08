import './App.css';
import Board from './Board.js';
import { useState } from 'react';

function App() {
  const initialSquares = [[null, null, null],
                          [null, null, null],
                          [null, null, null]];
  
  const [isXturn, setIsXturn] = useState(true);
  const [squares, setSquares] = useState(initialSquares);
  const [message, setMessage] = useState('');

  function checkSquares() {
    // Check whether the squares are won or draw
    let gameWonBy = null;
    for (let i = 0; i < squares.length; i++) {
      //Horizontal match
      if (squares[i][0] && squares[i][0] === squares[i][1] && squares[i][1] === squares[i][2]) {
        return squares[i][0];
      }

      //Vertical match
      if (squares[0][i] && squares[0][i] === squares[1][i] && squares[1][i] === squares[2][i]) {
        return squares[0][i];
      }
    }

    //Diagonal match
    if (squares[0][0] && squares[0][0] === squares[1][1] && squares[1][1] === squares[2][2]) {
      return squares[0][0];
    }

    if (squares[0][2] && squares[0][2] === squares[1][1] && squares[1][1] === squares[2][0]) {
      return squares[0][2];
    }

    //Draw
    if (squares.every(el => el.every(el => !!el))) return `It's a draw!`;
  
    return gameWonBy;
  }
  
  function clickedSquare (rowIndex, columnIndex) {
    let newSquares = [...squares];

    newSquares[rowIndex][columnIndex] = isXturn ? 'X' : 'O';

    setSquares(newSquares);
    setIsXturn(prev => !prev);

    const winner = checkSquares();

    if (winner && winner.length === 1) {
      setMessage(`${winner} wins!`);
    }

    if (winner && winner.length > 1) setMessage(winner);
  }

  return (
    <>
      <h1>Tick Tac Toe!</h1>
      <Board squares={squares}
        clickedSquare={clickedSquare}
        disabled={message ? true: false}
        data-testid="board"
      />
      <div className="bottomText" data-testid="turnMessage">
        {!message && <p>{`${isXturn ? `It's X's Turn` : `It's O's Turn`}`}</p>}
        {message && <p>{message}</p>}
        <button onClick={() => {
          setSquares(initialSquares);
          setIsXturn(true);
          setMessage('');
        }}>New game</button>
      </div>
    </>
    
  );
}

export default App;
