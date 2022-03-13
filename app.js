"use strict";

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const rollBtn = $(".btn.btn--roll");
const holdBtn = $(".btn.btn--hold");
const newBtn = $(".btn.btn--new");
const dice = $(".dice");
const curScoreUI1 = $("#current--0");
const curScoreUI2 = $("#current--1");
const totalScoreUI1 = $("#score--0");
const totalScoreUI2 = $("#score--1");
const player1 = $(".player.player--0");
const player2 = $(".player.player--1");
const name1 = $("#name--0");
const name2 = $("#name--1");

let totalScore1 = 0;
let totalScore2 = 0;
let curScore1 = 0;
let curScore2 = 0;

// Handle switching player
function switchPlayer() {
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
  curScore1 = 0;
  curScoreUI1.textContent = curScore1;
  curScore2 = 0;
  curScoreUI2.textContent = curScore2;
}

// Handle when player clicks roll button
rollBtn.addEventListener("click", function () {
  let randomDice = Math.ceil(Math.random() * 6);
  dice.style.display = "initial";
  dice.setAttribute("src", `./css/img/dice-${randomDice}.png`);
  if (randomDice === 1) {
    switchPlayer();
  } else {
    if (player1.classList.contains("player--active")) {
      curScore1 += randomDice;
      curScoreUI1.textContent = curScore1;
    } else {
      curScore2 += randomDice;
      curScoreUI2.textContent = curScore2;
    }
  }
});

// Handle when player clicks hold button
holdBtn.addEventListener("click", function () {
  if (player1.classList.contains("player--active")) {
    totalScore1 += curScore1;
    totalScoreUI1.textContent = totalScore1;
    if (totalScore1 >= 100) {
      name1.textContent = "🏆 WINNER!!!";
      player1.classList.add("player--winner");
      rollBtn.disabled = true;
      holdBtn.disabled = true;
    } else {
      switchPlayer();
    }
  } else {
    totalScore2 += curScore2;
    totalScoreUI2.textContent = totalScore2;
    if (totalScore2 >= 100) {
      name2.textContent = "🏆 WINNER!!!";
      player2.classList.add("player--winner");
      rollBtn.disabled = true;
      holdBtn.disabled = true;
    } else {
      switchPlayer();
    }
  }
});

// Handle when player clicks new button
newBtn.addEventListener("click", function () {
  totalScore1 = 0;
  totalScoreUI1.textContent = totalScore1;
  totalScore2 = 0;
  totalScoreUI2.textContent = totalScore2;
  curScore1 = 0;
  curScoreUI1.textContent = curScore1;
  curScore2 = 0;
  curScoreUI2.textContent = curScore2;
  player1.classList.add("player--active");
  player2.classList.remove("player--active");
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
  name1.textContent = "PLAYER 1";
  name2.textContent = "PLAYER 2";
  dice.style.display = "none";
  rollBtn.disabled = false;
  holdBtn.disabled = false;
});
