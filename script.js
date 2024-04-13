let body = document.querySelector("body");
let msgContainer = document.querySelector(".gameOverMsgBtn");
let winMsg = document.querySelector(".msg");
let newGameBtn = document.querySelectorAll(".newGameBtn");
let gameContainer = document.querySelector(".game-container");
let boxes = document.querySelectorAll(".box"); //Access all boxes
let turn = "X"; //We are starting with X
let count = 0; //To count the number of turns played (Would be needed in case of draw)
let resetGameBtn = document.querySelector(".resetGameBtn");

msgContainer.classList.add("hide"); //The winning message is initially hidden
body.style.overflowY = "hidden";

let winningPatterns = [
  //These are all the possible winning combinations
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.disabled === false) {
      if (turn === "X") {
        box.innerText = "X";
        turn = "O";
      } else {
        box.innerText = "O";
        turn = "X";
      }

      count += 1;

      if (count === 9) {
        setTimeout(drawGame, 500); //If the count reaches 9, that means nobody won and the game is draw
      }

      box.disabled = true;
      setTimeout(checkWinner, 500); //Check if anyone won the game after each click
    }
  });
});

const drawGame = () => {
  //In case of draw, prompt the user to play again
  msgContainer.classList.remove("hide");
  gameContainer.classList.add("hide");
  winMsg.innerText = "Match Draw";
  count = 0;
};

const checkWinner = () => {
  //Check if any winning combination is achieved
  winningPatterns.forEach((pattern) => {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        if (pos1Val === "O") {
          console.log("Player 2 wins");
          winMsg.innerText = "Congratulations, player 2 wins!";
        } else {
          console.log("Player 1 wins");
          winMsg.innerText = "Congratulations, player 1 wins!";
        }
        msgContainer.classList.remove("hide");
        gameContainer.classList.add("hide");
        count = 0;
      }
    }
  });
};

resetGameBtn.addEventListener("click", () => {
  setTimeout(resetGame, 500);
});

const resetGame = () => {
  boxes.forEach((box) => {
    turn = "X"; //Player 1 would always get X
    box.innerText = "";
    box.disabled = false;
    count = 0;
  });
};

newGameBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    setTimeout(newGame, 500);
  });
});

const newGame = () => {
  boxes.forEach((box) => {
    turn = "X"; //Player 1 would always get X
    box.innerText = "";
    box.disabled = false;
    if (!msgContainer.classList.contains("hide")) {
      msgContainer.classList.add("hide");
      gameContainer.classList.remove("hide");
    }
    count = 0;
  });
};
