import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//SQUARE-----------------------------------------SQUARE
function Square(props){
  const { value, onClick } = props

  return (
    <button className="square" onClick={onClick}> 
      {value}
    </button> // ^put in the content passed from board
  )
}
// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state = {value: null,};
//   // }

//   render() {
//     return (
//       <button 
//         className="square" 
//         onClick={() => this.props.onClick()} //run the function passed from board
//       >
//         {this.props.value}
//       </button> // ^put in the content passed from board
//     );
//   }
// }


//BOARD-----------------------------------------BOARD

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      squares: Array(9).fill(null), //hold the board's state, initially all null
      xIsNext: true,
    }
  }

  handleClick(i){
    const squares = this.state.squares.slice();
    // console.log(`before making x ` + squares);
    squares[i] = this.state.xIsNext? 'X' : 'O';
    // console.log(`after x: ` + squares);
    this.setState({
      squares:squares,
      xIsNext: !this.state.xIsNext,});
    // console.log(this.state);
  }

  renderSquare(i) {
    return (
      <Square 
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner){
      status = `The winner is ${winner}!`
    }else{
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}
//GAME-----------------------------------------GAME
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

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