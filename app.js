let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg")
let container = document.querySelector(".container");
let playBtn = document.querySelector("#play-btn");
let playerVP = document.querySelector("#pvp");
let homeScreen = document.querySelector(".home-screen"); 
let backMenu = document.querySelector("#back-btn");
let turnO = true;
let isPvC = true;
let gameActive = true;



container.classList.add("hide");
resetBtn.classList.add("hide");
backMenu.classList.add("hide");

//Some conditions to check winner
//Pattern

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
    [2, 4, 6],
];

const checkWinner = () => {
    for(let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner Is ", pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }
    }

    //In case of Game has been tied
    let allFilled = true;

    boxes.forEach((box) => {
        if (box.innerText === ""){
           allFilled = false;
        }   
    });

    if(allFilled){
       msg.innerText = "Game Tied, Try Again";
       msgContainer.classList.remove("hide");
       disabledBoxes();
    }
};

//enable, disable
const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

//Reset & Back New Game Buttons
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    gameActive = true; 
};

const backBtn = () => {
    container.classList.add("hide");
    msgContainer.classList.add("hide");
    resetBtn.classList.add("hide");
    backMenu.classList.add("hide");
    homeScreen.classList.remove("hide");
};
 
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
backMenu.addEventListener("click", backBtn);

const startGame = (mode) => {
    resetGame();
    gameActive = true; // Essential to re-enable clicking
    isPvC = (mode === "pvc");

    homeScreen.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    backMenu.classList.remove("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // If game is over or box is full, do nothing
        if (!gameActive || box.innerText !== "") return;

        if (isPvC) {
            // --- COMPUTER MODE LOGIC ---
            box.innerText = "O";
            box.disabled = true;
            turnO = false;
            
            if (!checkWinner()) { // Only computer moves if no one won
                setTimeout(() => {
                    computerMove();
                }, 300);
            }
        } else {
            // --- PLAYER VS PLAYER LOGIC ---
            box.innerText = turnO ? "O" : "X";
            turnO = !turnO;
            box.disabled = true;
            checkWinner();
        }
    });
});

const computerMove = () => {
    if (!gameActive || turnO) return; 

    const emptyBoxes = [...boxes].filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
    let box = emptyBoxes[randomIndex];

    box.innerText = "X";
    box.disabled = true;
    turnO = true;
    checkWinner();
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
    gameActive = false; // 👈 This kills the "Memory" of the current game
};

// Now your button listeners are very simple:
playBtn.addEventListener("click", () => startGame("pvc"));
playerVP.addEventListener("click", () => startGame("pvp"));
//22-12-2025 built version 2.1
