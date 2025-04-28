<script lang="ts">
	import { computerMove } from '$lib/players';
	let squares: (null | number)[] = $state(Array(9).fill(null));
	let turn: number = $state(0);
	let player: string = $state('player');

	let winner: number | null = $derived.by(() => {
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

	function playerMove(index: number): void {
		if (squares[index] !== null || winner !== null) return;

		const newSquares = [...squares];
		newSquares[index] = turn;
		squares = newSquares;

		turn = turn === 0 ? 1 : 0;

		if (winner === null && squares.some((square) => square === null)) {
			computerMove(player, squares, turn);
		}
	}

	function reset() {
		squares = Array(9).fill(null);
		turn = 0;
	}
</script>

<!-- Page -->
<div class="flex h-screen flex-col items-center bg-red-100">
	<div class="flex w-full justify-between bg-blue-100 p-4">
		<div>Tic-Tac-Toe</div>
		<div>
			Player:
			<select
				class="w-20 border border-black"
				bind:value={player}
			>
				{#each ['random'] as question}
					<option value={question}>
						{question}
					</option>
				{/each}
			</select>
		</div>
	</div>
	<div class="flex h-full flex-col items-center justify-center bg-green-100">
		{#if winner !== null}
			<div class="flex gap-2">
				<div>Player {winner === 0 ? 'X' : 'O'} wins!</div>
				<button class="text-blue-500" onclick={reset}>Play again?</button>
			</div>
		{:else if squares.every((square) => square !== null)}
			<div class="flex gap-2">
				<div>It's a draw!</div>
				<button class="text-blue-500" onclick={reset}>Play again?</button>
			</div>
		{:else}
			<div>Player {turn === 0 ? 'X' : 'O'} turn.</div>
		{/if}

		<!-- Board -->
		<div class="grid grid-cols-3">
			{#each squares as square, index}
				<button
					class="h-16 w-16 border border-black"
					onclick={() => playerMove(index)}
					disabled={square !== null || winner !== null}
				>
					{square === null ? '' : square === 0 ? 'X' : 'O'}
				</button>
			{/each}
		</div>
	</div>
</div>
