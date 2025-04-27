<script lang="ts">
	let squares: (null | number)[][] = $state([
		[null, null, null],
		[null, null, null],
		[null, null, null]
	]);

	let turn = $state<number>(0);

	let winner = $derived.by(() => {
		// Check rows
		for (let i = 0; i < 3; i++) {
			if (
				squares[i][0] !== null &&
				squares[i][0] === squares[i][1] &&
				squares[i][1] === squares[i][2]
			) {
				return squares[i][0];
			}
		}

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (
				squares[0][i] !== null &&
				squares[0][i] === squares[1][i] &&
				squares[1][i] === squares[2][i]
			) {
				return squares[0][i];
			}
		}

		// Check diagonals
		if (
			squares[0][0] !== null &&
			squares[0][0] === squares[1][1] &&
			squares[1][1] === squares[2][2]
		) {
			return squares[0][0];
		}

		if (
			squares[0][2] !== null &&
			squares[0][2] === squares[1][1] &&
			squares[1][1] === squares[2][0]
		) {
			return squares[0][2];
		}

		return null;
	});

	function playerMove(rowIndex: number, colIndex: number): void {
		squares[rowIndex][colIndex] = turn;
		turn = turn === 0 ? 1 : 0;
		computerMove();
	}

	function computerMove() {
		let availableMoves: [number, number][] = getAvailableMoves();
		let move = randomPlayer(availableMoves);
		let [i, j] = move;
		squares[i][j] = 1;
		turn = 0;
	}

	function getAvailableMoves(): [number, number][] {
		let moves: [number, number][] = [];
		for (let i = 0; i < squares.length; i++) {
			for (let j = 0; j < squares[i].length; j++) {
				if (squares[i][j] == null) {
					moves.push([i, j]);
				}
			}
		}
		return moves;
	}

	function randomPlayer(choices: [number, number][]): [number, number] {
		const randomIndex = Math.floor(Math.random() * choices.length);
		return choices[randomIndex];
	}

	function reset() {
		squares = [
			[null, null, null],
			[null, null, null],
			[null, null, null]
		];

		turn = 0;
	}
</script>

<!-- Page -->
<div class="flex h-screen flex-col items-center justify-center">
	{#if winner !== null}
		<div class="flex gap-2">
			<div>Player {winner === 0 ? 'X' : 'O'} wins!</div>
			{#if winner != null}
				<button class="text-blue-500" onclick={reset}>Play again?</button>
			{/if}
		</div>
	{:else}
		<div>Player {turn == 0 ? 'X' : 'O'} turn.</div>
	{/if}
	<!-- Board -->
	<div class="flex">
		{#each squares as row, rowIndex}
			<!-- Row -->
			<div class="flex flex-col">
				{#each row as square, colIndex}
					<!-- Square -->
					<button
						class="h-16 w-16 border-1 border-black"
						onclick={() => playerMove(rowIndex, colIndex)}
						disabled={square != null || winner != null}
					>
						{square == null ? '' : square == 0 ? 'X' : 'O'}
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>
