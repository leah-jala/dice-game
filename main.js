function createDice(number) {
	const dotPositionMatrix = {
		1: [
			[50, 50]
		],
		2: [
			[20, 20],
			[80, 80]
		],
		3: [
			[20, 20],
			[50, 50],
			[80, 80]
		],
		4: [
			[20, 20],
			[20, 80],
			[80, 20],
			[80, 80]
		],
		5: [
			[20, 20],
			[20, 80],
			[50, 50],
			[80, 20],
			[80, 80]
		],
		6: [
			[20, 20],
			[20, 80],
			[50, 20],
			[50, 80],
			[80, 20],
			[80, 80]
		]
	};

	const dice = document.createElement("div");

	dice.classList.add("dice");

	for (const dotPosition of dotPositionMatrix[number]) {
		const dot = document.createElement("div");

		dot.classList.add("dice-dot");
		dot.style.setProperty("--top", dotPosition[0] + "%");
		dot.style.setProperty("--left", dotPosition[1] + "%");
		dice.appendChild(dot);
	}

	return dice;
}

function randomizeDice(diceContainer, numberOfDice) {
	diceContainer.innerHTML = "";
  let rolledNumbers = [];

	for (let i = 0; i < numberOfDice; i++) {
		const random = Math.floor((Math.random() * 6) + 1);
    rolledNumbers.push(random);
		const dice = createDice(random);
		diceContainer.appendChild(dice);
	}
  return rolledNumbers;
}

const NUMBER_OF_DICE = 5;
const diceContainer = document.querySelector(".dice-container");
const diceScoreDisplay = document.querySelector(".dice-score");
const btnRollDice = document.querySelector(".btn-roll-dice");

randomizeDice(diceContainer, NUMBER_OF_DICE);

btnRollDice.addEventListener("click", () => {
  const interval = setInterval(() => {
    randomizeDice(diceContainer, NUMBER_OF_DICE);
  }, 50);
  
  setTimeout(() => {
    clearInterval(interval);
    const rolledNumbers = randomizeDice(diceContainer, NUMBER_OF_DICE); // randomize one last time
    const calculatedScore = score(rolledNumbers);
    diceScoreDisplay.innerText = `Score: ${calculatedScore}`;
  }, 1000);
});

function score( dice ) {
  var dc = [0,0,0,0,0,0];
  var tdr = [1000,200,300,400,500,600];
  var sdr = [100,0,0,0,50,0];
  dice.forEach(function(x){ dc[x-1]++; });
  return dc.reduce(function(s,x,i){ 
    return s + (x >= 3? tdr[i] : 0) + sdr[i]*(x % 3);
  },0);
}

// Test the function with given examples
console.log(score([5, 1, 3, 4, 1]));  // Expected output: 250
console.log(score([1, 1, 1, 3, 1]));  // Expected output: 1100
console.log(score([2, 4, 4, 5, 4]));  // Expected output: 450

// This combines the code from https://www.youtube.com/watch?v=M3InbHr0WAc with the code wars Kata result