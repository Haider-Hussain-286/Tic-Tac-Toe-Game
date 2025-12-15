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


container.classList.add("hide");
resetBtn.classList.add("hide");
backMenu.classList.add("hide");

// Player vs Computer

const playerVComputer = () => {

    let playerTurn = true; // true = O (User), false = X (Computer)

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

    const resetGame = () => {
        playerTurn = true;
        enableBoxes();
        msgContainer.classList.add("hide");
    };

    const backBtn = () => {
    container.classList.add("hide");
    resetBtn.classList.add("hide");
    backMenu.classList.add("hide");
    homeScreen.classList.remove("hide");
    };


    // User + Computer Moves
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {

            // User move
            if (playerTurn && box.innerText === "") {
                box.innerText = "O";
                box.disabled = true;
                playerTurn = false;
                checkWinner();

                // Computer move only if game not ended
                setTimeout(() => {
                    computerMove();
                }, 300);
            }
        });
    });

    // computer chooses empty box randomly
    const computerMove = () => {

        if (playerTurn) return; // skip if player's turn

        const emptyBoxes = [];

        boxes.forEach((box, idx) => {
            if (box.innerText === "") emptyBoxes.push(idx);
        });

        if (emptyBoxes.length === 0) return;

        const randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

        boxes[randomIndex].innerText = "X";
        boxes[randomIndex].disabled = true;

        playerTurn = true;
        checkWinner();
    };

    const disableBoxes = () => {
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

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disableBoxes();
    };

    const checkWinner = () => {

        for (let pattern of winPatterns) {
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;

            if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
                if (pos1 === pos2 && pos2 === pos3) {
                    showWinner(pos1);
                    return;
                }
            }
        }

        // Tie
        let allFilled = true;
        boxes.forEach((box) => {
            if (box.innerText === "") allFilled = false;
        });

        if (allFilled) {
            msg.innerText = "Game Tied!, Try Again";
            msgContainer.classList.remove("hide");
            disableBoxes();
        }
    };

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
    backMenu.addEventListener("click",backBtn);
};


const play1 = () => {
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    backMenu.classList.remove("hide");
    homeScreen.classList.add("hide");
    playerVComputer();
};

playBtn.addEventListener("click",play1);

//Player vs Player   

const playerVPlayer = () => {
let turnO = true;

    const winPatterns = [
       [0, 1, 2],
       [0, 3, 6],
       [0, 4, 8],
       [1, 4, 7],
       [2, 5, 8],
       [3, 4, 5],
       [6, 7, 8],
       [2, 4, 6,]
    ];

    const resetGame = () => {
       turnO = true;
       enabledBoxes();
       msgContainer.classList.add("hide");
    };

    const backBtn = () => {
       container.classList.add("hide");
       resetBtn.classList.add("hide");
       backMenu.classList.add("hide");
       homeScreen.classList.remove("hide");
    };


    boxes.forEach((box) => {
        box.addEventListener("click",() =>{
          console.log("button was clicked");
          if (turnO) {
             box.innerText = "O";
             turnO = false;
            } else{
             box.innerText ="X";
             turnO = true;
            }
           box.disabled = true; 

           checkWinner();
        });
    });

    const disabledBoxes = () => {
        for(let box of boxes) {
          box.disabled = true;
        }
    }

    const enabledBoxes = () => {
        for(let box of boxes) {
          box.disabled = false;
          box.innerText = "";
        }
    }

    const showWinner = (winner) => {
        msg.innerText = `Congratulations, Winner is ${winner}`;
        msgContainer.classList.remove("hide");
        disabledBoxes();
    }

    const checkWinner = () => {
        for(let pattern of winPatterns){
           let pos1Val = boxes[pattern[0]].innerText;
           let pos2Val = boxes[pattern[1]].innerText;
           let pos3Val = boxes[pattern[2]].innerText;

           if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
               if (pos1Val === pos2Val && pos2Val === pos3Val) {
                  console.log("Winner Is ", pos1Val);
                  showWinner(pos1Val);
                }
            }
        }

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
    }

    newGameBtn.addEventListener("click", resetGame);
    resetBtn.addEventListener("click", resetGame);
    backMenu.addEventListener("click",backBtn);
};

const play2 = () => {
    homeScreen.classList.add("hide");
    container.classList.remove("hide");
    resetBtn.classList.remove("hide");
    backMenu.classList.remove("hide");
    playerVPlayer();
};

playerVP.addEventListener("click", play2);


