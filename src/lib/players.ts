export const computerPlayers = [
    'random'
]

export function computerMove(player: string, squares: (string | null)[]) {
    const availableMoves: number[] = getAvailableMoves(squares);

    let playerFunction = null

    switch (player) {
        case 'random':
            playerFunction = randomPlayer
            break;

        default:
            throw Error("Invalid player selected")
    }

    return playerFunction(availableMoves);
}

function randomPlayer(choices: number[]): number {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getAvailableMoves(squares: (string | null)[]): number[] {
    const moves: number[] = [];

    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            moves.push(i);
        }
    }
    
    return moves;
}