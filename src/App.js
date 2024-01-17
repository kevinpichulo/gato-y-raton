/*import "./App.css";
import {useState} from "react";
function Square({value ,onSquareClick}) {
  //const [value,setValue] = useState(null);
  //function handelClick(){
  //  setValue("X");

  return <button className='square'onClick={onSquareClick}>{value}</button>
}


 function App({xIsNext,squares,onplay}){
  function handelClick(i) {
    if(squares[i]|| calculateWinner (squares)) {
      return;
    } 
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onplay (nextSquares)
 
  }
const winner = calculateWinner(squares);
let status;
if(winner){
  status = "Ganador:" + winner;
}else {
  status = "siguiente jugador:" + (xIsNext ? "X" : "O");
}
  return (
  <div>
    <div className="status">{status}</div>
      <div className="chamaco">
        <Square value = {squares[0]}onSquareClick={() => handelClick(0)}/>
        <Square value = {squares[1]}onSquareClick={() => handelClick(1)}/>
        <Square value = {squares[2]}onSquareClick={() => handelClick(2)}/>
       </div>
      <div className="chamaco">
      <Square value = {squares[3]}onSquareClick={() => handelClick(3)}/>
      <Square value = {squares[4]}onSquareClick={() => handelClick(4)}/>
      <Square value = {squares[5]}onSquareClick={() => handelClick(5)}/>
       </div>
      <div className="chamaco">
      <Square value = {squares[6]}onSquareClick={() => handelClick(6)}/>
      <Square value = {squares[7]}onSquareClick={() => handelClick(7)}/>
      <Square value = {squares[8]}onSquareClick={() => handelClick(8)}/>
       </div>
  </div>
  );
}
export default function game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquare = history[history.length -1];

  function handelPlay(nextSquares) {
setHistory([...history, nextSquares]);
setXIsNext(!xIsNext);
  }

  function jumpTo(nextMove) {

  }

  const moves = history.map

  return (
    <div className="game">
      <div className="game-board">
        <App xIsNext={xIsNext} squares={currentSquare} onplay={handelPlay}/>
      </div>
      <div className="game-info">
        <lo></lo>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0,1,2], 
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8]
  ]; 
  for (let i = 0; i< lines.length; i++){
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; 
    }
  }
  return null;
}

*/
import "./App.css";
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function App({ xIsNext, squares, onPlay}) {
  // const [xIsNext, setXIsNext] = useState(true);
  // const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares)
    // setSquares(nextSquares);
    // setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Ganador: " + winner;
  } else {
    status = "Siguiente jugador: " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCuerrentMove] =useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

function handlePlay(nextSquares) {
  const nextHistory =[...history.slice(0, currentMove + 1), nextSquares];
  setHistory(nextHistory);
  setCuerrentMove(nextHistory.length -1);
}

function jumpTo(nextMove) {
  setCuerrentMove(nextMove);

}
const moves = history.map((squares, move) => {
  let description;
  if(move > 0 ){
    description = "ir al movimiento #" + move;
  }else{
    description = "ir al inicio del juego";
  }
  return(
  <li key={move}>
    <button onClick={() => jumpTo(move)}>{description}</button>
  </li>  
  )
})

  return (
    <div className="game">
      <div className="game-board">
        <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
