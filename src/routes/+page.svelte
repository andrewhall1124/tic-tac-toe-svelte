<script lang="ts">
	import { computerMove, computerPlayers } from '$lib/players';

	let side: string = $state('X');
	let type: string = $state('random');
	let squares: (null | string)[] = $state(Array(9).fill(null));
	let turn: string = $state('X');

	const sides: string[] = ['X', 'O'];

	function makeMove(move: number): void {
		const newSquares = [...squares];
		newSquares[move] = turn;
		squares = newSquares;
	}

	const changeTurn = () => {
		turn = turn === 'X' ? 'O' : 'X';
	};

	function playerMove(index: number): void {
		makeMove(index);
		changeTurn();
	}

	let winner: string | null = $derived.by(() => {
		const lines = [
			// Rows
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			// Columns
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			// Diagonals
			[0, 4, 8],
			[2, 4, 6]
		];

		for (const line of lines) {
			let [a, b, c] = line;
			if (squares[a] != null && squares[a] == squares[b] && squares[b] == squares[c]) {
				return squares[a];
			}
		}

		return null;
	});

	const reset = () => {
		squares = Array(9).fill(null);
		turn = 'X';
	};

	$effect(() => {
		if (turn != side) {
			const opponentMove = computerMove(type, squares);
			makeMove(opponentMove);
			changeTurn();
		}
	});
</script>

<div class="page">
	<div class="header">
		<h1>Tic-Tac-Toe</h1>
		<div>
			Player 1:
			<select bind:value={side} onchange={() => reset()}>
				{#each sides as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>
		<div>
			Player 2:
			<select bind:value={type} onchange={() => reset()}>
				{#each computerPlayers as value}
					<option {value}>{value}</option>
				{/each}
			</select>
		</div>
		<div>
			<button class='reset' onclick={() => reset()}>
				Reset
			</button>
		</div>

	</div>
	{#if winner !== null}
			<div>Player {winner} wins!</div>
	{:else if squares.every((square) => square !== null)}
			<div>It's a draw!</div>
	{:else}
		<div>Player {turn} turn.</div>
	{/if}

	<div class="board">
		{#each squares as square, index}
			<button
			class="square"
				onclick={() => playerMove(index)}
				disabled={square !== null || winner !== null}
			>
				 {square}
			</button>
		{/each}
	</div>
</div>
