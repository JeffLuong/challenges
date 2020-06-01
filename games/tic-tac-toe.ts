/**
 * Simple Tic Tac Toe game class with simple position inputs and
 * logging of game state. Each move will log the latest state of
 * the board as well as check for a winner until there are zero
 * moves remaining.
 *
 * Once a game ends, the player will not be able to take anymore
 * moves but they can reset the game to start again.
 */

type Move = {
  position: number[],
  value: string
};

class TicTacToe {
  private movesRemaining = 9;

  private movesMade: Move[] = [];

  public board: string[][] = this.__createBoard();

  public winner: string = '';

  private __createBoard(): string[][] {
    const board = [];
    for (let i = 0; i < 3; i++) {
      board.push(this.__createRow());
    }
    return board;
  }

  private __createRow(): string[] {
    return Array(3).fill('');
  }

  private __evaluate(a: string, b: string, c: string): boolean {
    return Boolean(a) && a === b && b === c;
  }

  private __trackMove(x: number, y: number, value: string): void {
    this.movesMade.push({ position: [x, y], value });
  }

  private __prevMove() {
    return this.movesMade[this.movesMade.length - 1];
  }

  private __fillSpace(x: number, y: number, value: string): void {
    this.__trackMove(x, y, value);
    this.board[x][y] = value;
    this.movesRemaining -= 1;
    console.log(this.board);
    this.evaluateWinner();
  }

  private evaluateWinner() {
    const { board, movesRemaining } = this;
    if (movesRemaining < 5) {
      for (let j = 0; j < 3; j++) {
        if (this.__evaluate(board[j][0], board[j][1], board[j][2])) {
          this.winner = board[j][0];
          break;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (this.__evaluate(board[0][i], board[1][i], board[2][i])) {
          this.winner = board[0][i];
          break;
        }
      }
      if (this.__evaluate(board[0][0], board[1][1], board[2][2])) {
        this.winner = board[0][0];
      }
      if (this.__evaluate(board[2][0], board[2][1], board[2][2])) {
        this.winner = board[2][0];
      }

      if (this.winner) {
        console.log(`${this.winner} has won the game!`);
      } else if (movesRemaining === 0) {
        console.log('It was a tie. Please reset the game to play again!');
      }
    }
  }

  public resetGame(): void {
    this.board = this.__createBoard();
    this.movesRemaining = 9;
    this.winner = '';
    this.movesMade = [];
  }

  public fillSpace(x: number, y: number, value: string): void {
    const _value = value.toLocaleLowerCase();

    if (this.movesRemaining === 0 || this.winner) {
      const message =  this.winner ? `Game has ended, ${this.winner} won!` : 'It was a tie.';
      console.log(`${message} Please start a new game if you want to play again.`);
    } else {
      if (_value !== 'x' && _value !== 'o') {
        throw new Error('Must enter "x" or "o" for tic tac toe!');
      }
      if (this.board[x][y] !== '') {
        throw new Error(`Cannot place ${_value} here!`);
      }
      const prevMove = this.__prevMove();
      if (prevMove && prevMove.value === _value) {
        const next = _value === 'x' ? 'o' : 'x';
        throw new Error(`Previous move was made by ${_value}. Next move should be made by ${next}!`);
      }
      this.__fillSpace(x, y, _value);
    }
  }
}
