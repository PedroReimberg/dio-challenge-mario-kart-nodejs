const player1 = {
	NAME: 'Mario',
	SPEED: 4,
	MANEUVERABILITY: 3,
	POWER: 3,
	points: 0,
};

const player2 = {
	NAME: 'Luigi',
	SPEED: 3,
	MANEUVERABILITY: 4,
	POWER: 4,
	points: 0,
};

async function rollDice() {
	return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
	let random = Math.random();
	let result;

	switch (true) {
		case random < 0.33:
			result = 'Straight';
			break;
		case random < 0.66:
			result = 'Curve';
			break;
		default:
			result = 'Fight';
	}
	return result;
}

async function logTotalTestSkill(
	totalTestSkill1,
	totalTestSkill2,
	character1,
	character2,
	block,
) {
	if (totalTestSkill1 > totalTestSkill2) {
		character1.points++;
		console.log(`😲 ${character1.NAME} got 1 point!\n`);
	}
	if (totalTestSkill1 < totalTestSkill2) {
		character2.points++;
		console.log(`😲 ${character2.NAME} got 1 point!\n`);
	}
	if (totalTestSkill2 === totalTestSkill1) {
		console.log(`🥶 ${block} draw!\n`);
	}
}

async function logRollResult(characterName, block, diceResult, attributeValue) {
	debugger;
	let attributeSymbol = ``;
	switch (block) {
		case 'Straight':
			attributeSymbol = `🏎️`;
			break;
		case 'Curve':
			attributeSymbol = `🐍`;
			break;
		case 'Fight':
			attributeSymbol = `⚔️`;
			break;
		default:
			break;
	}

	console.log(
		`${characterName} 🎲 rolled the dice of ${block} (${attributeValue} ${attributeSymbol} + ${diceResult} 🍀 = ${
			diceResult + attributeValue
		})`,
	);
}

async function declareWinner(character1, character2) {
	console.log(`\n🚨 Final Result 🚨`);
	console.log(`${character1.NAME}: ${character1.points}`);
	console.log(`${character2.NAME}: ${character2.points}`);

	if (character1.points > character2.points) {
		console.log(`\n🏆 ${character1.NAME} won! 🏆`);
	} else if (character1.points < character2.points) {
		console.log(`\n🏆 ${character2.NAME} won! 🏆`);
	} else {
		console.log(`\n🏆🥶 Race Draw! 🥶🏆`);
	}
}

async function playRaceEngine(character1, character2, roundNumber) {
	for (let round = 1; round <= roundNumber; round++) {
		console.log(`\n❇️ ${character1.NAME} points: ${character1.points}`);
		console.log(`❇️ ${character2.NAME} points: ${character2.points}`);

		console.log(`\n🏁 Round ${round} 🏁`);

		// draw event block
		let block = await getRandomBlock();
		console.log(`Block: ${block}`);

		// roll dice
		let diceResult1 = await rollDice();
		let diceResult2 = await rollDice();

		// skill test
		let totalTestSkill1 = 0;
		let totalTestSkill2 = 0;

		if (block === 'Straight') {
			totalTestSkill1 = character1.SPEED + diceResult1;
			totalTestSkill2 = character2.SPEED + diceResult2;

			await logRollResult(
				character1.NAME,
				'Straight',
				diceResult1,
				character1.SPEED,
			);
			await logRollResult(
				character2.NAME,
				'Straight',
				diceResult2,
				character2.SPEED,
			);
			await logTotalTestSkill(
				totalTestSkill1,
				totalTestSkill2,
				character1,
				character2,
				block,
			);
		}
		if (block === 'Curve') {
			totalTestSkill1 = character1.MANEUVERABILITY + diceResult1;
			totalTestSkill2 = character2.MANEUVERABILITY + diceResult2;

			await logRollResult(
				character1.NAME,
				'Curve',
				diceResult1,
				character1.MANEUVERABILITY,
			);
			await logRollResult(
				character2.NAME,
				'Curve',
				diceResult2,
				character2.MANEUVERABILITY,
			);

			await logTotalTestSkill(
				totalTestSkill1,
				totalTestSkill2,
				character1,
				character2,
				block,
			);
		}
		if (block === 'Fight') {
			let powerResult1 = character1.POWER + diceResult1;
			let powerResult2 = character2.POWER + diceResult2;

			console.log(`${character1.NAME} is fighting ${character2.NAME}`);

			await logRollResult(character1.NAME, 'Fight', diceResult1, character1.POWER);
			await logRollResult(character2.NAME, 'Fight', diceResult2, character2.POWER);

			if (powerResult1 < powerResult2) {
				if (character1.points >= 1) {
					character1.points--;
				}
				console.log(`😭 ${character1.NAME} lost 1 point!\n`);
			} else if (powerResult1 > powerResult2) {
				if (character2.points >= 1) {
					character2.points--;
				}
				console.log(`😭 ${character2.NAME} lost 1 point!\n`);
			} else {
				console.log(`🥶 ${block} draw!\n`);
			}
		}
		console.log(`------------------------------------------------------------------`);
	}
	declareWinner(character1, character2);
}

(async function main() {
	let roundNumber = 8;

	console.log(`🏁🚨 Race between ${player1.NAME} and ${player2.NAME} starting...`);

	await playRaceEngine(player1, player2, roundNumber);
})();
