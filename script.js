let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-button");
let newGameBtn = document.querySelector("#new_btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let drwMsg = document.querySelector("#draw-msg");
let drwContainer = document.querySelector(".draw-container");
let newGameBtn4drw = document.querySelector("#new_btn_4drw");
let turnO = true; //player X, player Y

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];



const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    drwContainer.classList.add("hide-1");
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("box was clicked")
        if(turnO) { //player O
            box.innerText = "O";
            // box.style.color = "black";
            turnO = false;
            if(box.innerText === "O")
            {
                box.style.color = "black";
            }
            else 
            {
                box.style.color = "#b0413e";
            }
        }
        else {     //player X
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;

        checkWinner();
        checkDraw();
    })
}) 
const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
        if(box.innerText === "O")
        {
            box.style.color = "black";
        }
        else 
        {
            box.style.color = "#b0413e";
        }
    }
}


const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const itsDraw = () => {
    drwMsg.innerText = "Its a Draw, Try again!";
    drwContainer.classList.remove("hide-1");
    disableBoxes();
}

const checkWinner = () => {
    for(let pattern of winPatterns) {
        // console.log(boxes[pattern[0]])
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")  {
            if(pos1Val === pos2Val && pos2Val === pos3Val) {
                console.log("Winner",pos1Val);
                showWinner(pos1Val);
            }
            
            
        }
    }
}

const checkDraw = () => {
    let i = 0;
    for(let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != "")
        {   
            if(pos1Val === pos2Val && pos2Val !== pos3Val || pos1Val !== pos2Val && pos2Val === pos3Val || pos1Val !== pos2Val && pos2Val !==pos3Val)
            {
                i++;
                console.log(i);
            }
            if(i===8) {   //if count increases to 8 (0 to 8 (total 9 boxes will be filled)) i.e all boxes are filled withno winnners then call the itsDraw function
                itsDraw();  // you can even make the count from 1 to 9(total 9 boxes) ...... you will getthe same result
            }
        }

    }

}

newGameBtn.addEventListener("click",resetGame);
newGameBtn4drw.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);