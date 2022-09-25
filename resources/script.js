"use strict";

/* DEFINE ELEMENTS */
/* Buttons */
const rollBtn = document.querySelector(".btn-roll");
const resetBtn = document.querySelector(".btn-reset");

/* Dice */
const dice0El = document.querySelector(".dice0");
const dice1El = document.querySelector(".dice1");
const dice2El = document.querySelector(".dice2");
const dice3El = document.querySelector(".dice3");
const dice4El = document.querySelector(".dice4");

/* Roll counter */
const rollsCountEl = document.querySelector(".rolls-remaining");

/* Player names */
const player1Name = document.querySelector(".player1_name");
const player2Name = document.querySelector(".player2_name");

/* DEFINE OBJECTS */

const player1 = {
  name: "player1",
  /* Top score fields */
  onesScore: document.querySelector(".onesP1"),
  twosScore: document.querySelector(".twosP1"),
  threesScore: document.querySelector(".threesP1"),
  foursScore: document.querySelector(".foursP1"),
  fivesScore: document.querySelector(".fivesP1"),
  sixesScore: document.querySelector(".sixesP1"),

  /* Bottom score fields */
  kind3Score: document.querySelector(".kind_3P1"),
  kind4Score: document.querySelector(".kind_4P1"),
  houseScore: document.querySelector(".full_houseP1"),
  shortScore: document.querySelector(".short_straightP1"),
  longScore: document.querySelector(".long_straightP1"),
  yahtzeeScore: document.querySelector(".yahtzeeP1"),
  chanceScore: document.querySelector(".chanceP1"),

  /* Total score fields */
  topInitial: document.querySelector(".top_initialP1"),
  topBonus: document.querySelector(".top_bonusP1"),
  topTotal: document.querySelector(".top_totalP1"),
  bottomTotal: document.querySelector(".bottom_totalP1"),
  grandTotal: document.querySelector(".grand_totalP1"),
};

const player2 = {
  name: "player2",
  /* Top score fields */
  onesScore: document.querySelector(".onesP2"),
  twosScore: document.querySelector(".twosP2"),
  threesScore: document.querySelector(".threesP2"),
  foursScore: document.querySelector(".foursP2"),
  fivesScore: document.querySelector(".fivesP2"),
  sixesScore: document.querySelector(".sixesP2"),

  /* Bottom score fields */
  kind3Score: document.querySelector(".kind_3P2"),
  kind4Score: document.querySelector(".kind_4P2"),
  houseScore: document.querySelector(".full_houseP2"),
  shortScore: document.querySelector(".short_straightP2"),
  longScore: document.querySelector(".long_straightP2"),
  yahtzeeScore: document.querySelector(".yahtzeeP2"),
  chanceScore: document.querySelector(".chanceP2"),

  /* Total score fields */
  topInitial: document.querySelector(".top_initialP2"),
  topBonus: document.querySelector(".top_bonusP2"),
  topTotal: document.querySelector(".top_totalP2"),
  bottomTotal: document.querySelector(".bottom_totalP2"),
  grandTotal: document.querySelector(".grand_totalP2"),
};

/* DEFINE VARIABLES */
let diceValues = [1, 2, 3, 4, 5];
let heldDice = [0, 0, 0, 0, 0];
let rollsLeft = 3;
let numbers = [0, 0, 0, 0, 0, 0];
let activePlayer = player2;
let turnsRemaining = 26;

/* DEFINE FUNCTIONS */

/* Reset Game */
resetBtn.addEventListener("click", function () {
  location.reload();
});

/* Calculate dice values */
function numberArray() {
  let numbers = [0, 0, 0, 0, 0, 0];
  for (let i = 0; i < 5; i++) {
    numbers[diceValues[i] - 1] += 1;
  }
  return numbers;
}

/* Define score highlighting */
function highlightScore(legalFunction, scoreField) {
  if (legalFunction === true) {
    scoreField.classList.add("legal");
    scoreField.classList.remove("nullable");
  } else if (scoreField.textContent === "") {
    scoreField.classList.remove("legal");
    scoreField.classList.add("nullable");
  } else {
    scoreField.classList.remove("legal");
    scoreField.classList.remove("nullable");
  }
}

/* Reset after selection */
function reset_dice() {
  turnsRemaining -= 1;

  for (let i = 0; i < 5; i++) {
    const diceElement = document.querySelector(`.dice${i}`);
    diceElement.classList.add("hidden");
    diceElement.classList.remove("hold");
    heldDice[i] = 0;
  }

  let fieldArray = [
    activePlayer.onesScore,
    activePlayer.twosScore,
    activePlayer.threesScore,
    activePlayer.foursScore,
    activePlayer.fivesScore,
    activePlayer.sixesScore,
    activePlayer.kind3Score,
    activePlayer.kind4Score,
    activePlayer.houseScore,
    activePlayer.shortScore,
    activePlayer.longScore,
    activePlayer.yahtzeeScore,
    activePlayer.chanceScore,
  ];

  for (let i = 0; i < fieldArray.length; i++) {
    fieldArray[i].classList.remove("legal");
    fieldArray[i].classList.remove("nullable");
    rollsCountEl.textContent = "";
  }

  if (turnsRemaining > 0) {
    rollsLeft = 3;
    rollsCountEl.textContent = rollsLeft;
    numbers = [0, 0, 0, 0, 0, 0];
  } else {
    calculateScores(player1);
    calculateScores(player2);
    rollBtn.classList.add("hidden");
    resetBtn.classList.remove("hidden");
    if (
      parseInt(player1.grandTotal.textContent) >
      parseInt(player2.grandTotal.textContent)
    ) {
      document.querySelector(".rolls-text").textContent = "Player 1 wins!";
    } else if (
      parseInt(player2.grandTotal.textContent) >
      parseInt(player1.grandTotal.textContent)
    ) {
      document.querySelector(".rolls-text").textContent = "Player 2 wins!";
    } else {
      document.querySelector(".rolls-text").textContent = "It's a tie!";
    }
  }
}

/* Roll dice */

function rollDice() {
  if (rollsLeft === 3) {
    switchPlayer();
  }
  for (let i = 0; i < 5; i++) {
    if (heldDice[i] === 0) {
      console.log(`Dice is ${i}`);
      const result = Math.trunc(Math.random() * 6) + 1;
      console.log(`Result is ${result}`);
      diceValues[i] = result;
      const diceElement = document.querySelector(`.dice${i}`);
      diceElement.classList.remove("hidden");
      diceElement.src = `resources/images/dice-${diceValues[i]}.png`;
    }
  }
  rollsLeft -= 1;
  rollsCountEl.textContent = rollsLeft;
  numbers = numberArray();
  highlight();
}
rollBtn.addEventListener("click", function () {
  if (rollsLeft > 0) {
    rollDice();
  }
});

/* Hold dice */
function holdDie(diceXEl, diceNumber) {
  diceXEl.classList.toggle("hold");
  if (diceXEl.classList.contains("hold")) {
    heldDice[diceNumber] = diceValues[0];
  } else {
    heldDice[diceNumber] = 0;
  }
  console.log(`Held dice are ${heldDice}`);
}

dice0El.addEventListener("click", function () {
  holdDie(dice0El, 0);
});
dice1El.addEventListener("click", function () {
  holdDie(dice1El, 1);
});
dice2El.addEventListener("click", function () {
  holdDie(dice2El, 2);
});
dice3El.addEventListener("click", function () {
  holdDie(dice3El, 3);
});
dice4El.addEventListener("click", function () {
  holdDie(dice4El, 4);
});

/* Define legality functions */
function topSectionLegal(scoreField) {
  if (scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

function kindxLegal(scoreField, x) {
  if (
    (numbers.includes(x) || numbers.includes(4) || numbers.includes(5)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function fullHouseLegal(scoreField) {
  if (
    numbers.includes(2) &&
    numbers.includes(3) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function shortStraightLegal(scoreField) {
  if (
    ((numbers[0] > 0 && numbers[1] > 0 && numbers[2] > 0 && numbers[3] > 0) ||
      (numbers[1] > 0 && numbers[2] > 0 && numbers[3] > 0 && numbers[4] > 0) ||
      (numbers[2] > 0 && numbers[3] > 0 && numbers[4] > 0 && numbers[5] > 0)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function longStraightLegal(scoreField) {
  if (
    ((numbers[0] > 0 &&
      numbers[1] > 0 &&
      numbers[2] > 0 &&
      numbers[3] > 0 &&
      numbers[4] > 0) ||
      (numbers[1] > 0 &&
        numbers[2] > 0 &&
        numbers[3] > 0 &&
        numbers[4] > 0 &&
        numbers[5] > 0)) &&
    scoreField.textContent === ""
  ) {
    return true;
  } else {
    return false;
  }
}

function yahtzeeLegal(scoreField) {
  if (numbers.includes(5) && scoreField.textContent === "") {
    return true;
  } else {
    return false;
  }
}

/* Define the highlight function (highlight all legal fields)*/

function highlight() {
  /* Top Section */
  /*highlightScore(topSectionLegal(onesScore), onesScore);*/
  highlightScore(
    topSectionLegal(activePlayer.onesScore),
    activePlayer.onesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.twosScore),
    activePlayer.twosScore
  );
  highlightScore(
    topSectionLegal(activePlayer.threesScore),
    activePlayer.threesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.foursScore),
    activePlayer.foursScore
  );
  highlightScore(
    topSectionLegal(activePlayer.fivesScore),
    activePlayer.fivesScore
  );
  highlightScore(
    topSectionLegal(activePlayer.sixesScore),
    activePlayer.sixesScore
  );

  /* Bottom Section */

  highlightScore(
    kindxLegal(activePlayer.kind3Score, 3),
    activePlayer.kind3Score
  );
  highlightScore(
    kindxLegal(activePlayer.kind4Score, 4),
    activePlayer.kind4Score
  );
  highlightScore(
    fullHouseLegal(activePlayer.houseScore),
    activePlayer.houseScore
  );
  highlightScore(
    shortStraightLegal(activePlayer.shortScore),
    activePlayer.shortScore
  );
  highlightScore(
    longStraightLegal(activePlayer.longScore),
    activePlayer.longScore
  );
  highlightScore(
    yahtzeeLegal(activePlayer.yahtzeeScore),
    activePlayer.yahtzeeScore
  );
  highlightScore(
    topSectionLegal(activePlayer.chanceScore),
    activePlayer.chanceScore
  );
}

/* Define score setting */

/* Switch player */
function switchPlayer() {
  if (activePlayer === player1) {
    activePlayer = player2;
    player2Name.classList.add("active");
    player1Name.classList.remove("active");
  } else {
    activePlayer = player1;
    player1Name.classList.add("active");
    player2Name.classList.remove("active");
  }
  console.log(`Active player is ${activePlayer.name}`);

  refresh_listeners();
}

function refresh_listeners() {
  activePlayer.onesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.onesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 1) {
          score += 1;
        }
        activePlayer.onesScore.textContent = score;
      }
      reset_dice();
    }
  });
  activePlayer.twosScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.twosScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 2) {
          score += 2;
        }
        activePlayer.twosScore.textContent = score;
      }
      reset_dice();
    }
  });
  activePlayer.threesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.threesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 3) {
          score += 3;
        }
        activePlayer.threesScore.textContent = score;
      }
      reset_dice();
    }
  });
  activePlayer.foursScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.foursScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 4) {
          score += 4;
        }
        activePlayer.foursScore.textContent = score;
      }
      reset_dice();
    }
  });
  activePlayer.fivesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.fivesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 5) {
          score += 5;
        }
        activePlayer.fivesScore.textContent = score;
      }
      reset_dice();
    }
  });
  activePlayer.sixesScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.sixesScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        if (diceValues[i] === 6) {
          score += 6;
        }
        activePlayer.sixesScore.textContent = score;
      }
      reset_dice();
    }
  });

  /* Bottom Section */
  activePlayer.kind3Score.addEventListener("click", function () {
    if (kindxLegal(activePlayer.kind3Score, 3)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.kind3Score.textContent = score;
      reset_dice();
    } else if (activePlayer.kind3Score.textContent === "") {
      activePlayer.kind3Score.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.kind4Score.addEventListener("click", function () {
    if (kindxLegal(activePlayer.kind4Score, 4)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.kind4Score.textContent = score;
      reset_dice();
    } else if (activePlayer.kind4Score.textContent === "") {
      activePlayer.kind4Score.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.houseScore.addEventListener("click", function () {
    if (fullHouseLegal(activePlayer.houseScore)) {
      activePlayer.houseScore.textContent = 25;
      reset_dice();
    } else if (activePlayer.houseScore.textContent === "") {
      activePlayer.houseScore.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.shortScore.addEventListener("click", function () {
    if (shortStraightLegal(activePlayer.shortScore)) {
      activePlayer.shortScore.textContent = 30;
      reset_dice();
    } else if (activePlayer.shortScore.textContent === "") {
      activePlayer.shortScore.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.longScore.addEventListener("click", function () {
    if (longStraightLegal(activePlayer.longScore)) {
      activePlayer.longScore.textContent = 40;
      reset_dice();
    } else if (activePlayer.longScore.textContent === "") {
      activePlayer.longScore.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.yahtzeeScore.addEventListener("click", function () {
    if (yahtzeeLegal(activePlayer.yahtzeeScore)) {
      activePlayer.yahtzeeScore.textContent = 50;
      reset_dice();
    } else if (activePlayer.yahtzeeScore.textContent === "") {
      activePlayer.yahtzeeScore.textContent = 0;
      reset_dice();
    }
  });

  activePlayer.chanceScore.addEventListener("click", function () {
    if (topSectionLegal(activePlayer.chanceScore)) {
      let score = 0;
      for (let i = 0; i < 5; i++) {
        score += diceValues[i];
      }
      activePlayer.chanceScore.textContent = score;
      reset_dice();
    }
  });
}

function calculateScores(player) {
  let topInitialScore = 0;
  let bonusScore = 0;
  let topTotalScore = 0;
  let bottomScore = 0;
  let grandTotalScore = 0;

  topInitialScore += parseInt(player.onesScore.textContent);
  topInitialScore += parseInt(player.twosScore.textContent);
  topInitialScore += parseInt(player.threesScore.textContent);
  topInitialScore += parseInt(player.foursScore.textContent);
  topInitialScore += parseInt(player.fivesScore.textContent);
  topInitialScore += parseInt(player.sixesScore.textContent);

  if (topInitialScore >= 63) {
    bonusScore = 35;
  }

  topTotalScore = topInitialScore + bonusScore;

  bottomScore += parseInt(player.kind3Score.textContent);
  bottomScore += parseInt(player.kind4Score.textContent);
  bottomScore += parseInt(player.houseScore.textContent);
  bottomScore += parseInt(player.shortScore.textContent);
  bottomScore += parseInt(player.longScore.textContent);
  bottomScore += parseInt(player.yahtzeeScore.textContent);
  bottomScore += parseInt(player.chanceScore.textContent);

  grandTotalScore = topTotalScore + bonusScore + bottomScore;

  player.topInitial.textContent = topInitialScore;
  player.topBonus.textContent = bonusScore;
  player.topTotal.textContent = topTotalScore;
  player.bottomTotal.textContent = bottomScore;
  player.grandTotal.textContent = grandTotalScore;
}
