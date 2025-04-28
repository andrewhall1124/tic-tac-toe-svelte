

export function computerMove(player: string, squares: (number | null)[], turn: number) {
    let availableMoves: number[] = getAvailableMoves(squares);

    let playerFunction = null
    switch(player){
        case 'random':
            playerFunction = randomPlayer
            break;

        default:
            throw Error("Invalid player selected")
    }

    let move = playerFunction(availableMoves);

    const newSquares = [...squares];
    newSquares[move] = turn;
    squares = newSquares;

    turn = turn === 0 ? 1 : 0;
}

function getAvailableMoves(squares: (number | null)[]): number[] {
    let moves: number[] = [];
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            moves.push(i);
        }
    }
    return moves;
}

function randomPlayer(choices: number[]): number {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}