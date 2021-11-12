const img = [
    {
        id:1,
        name: "Rock",
        source: "./images/stone.jpg",
        value: "rock"
    },
    {
        id:2,
        name: "Paper",
        source: "./images/paper.jpg",
        value: "paper"
    },
    {
        id:3,
        name: "Scissor",
        source: "./images/scissor.jpg",
        value: "scissor"
    }
];

const playBtn = document.getElementById("play-btn");
const home = document.querySelector(".home");
const choice = document.getElementById("C0iS");
const choose = document.querySelector(".choose");
const display = document.getElementById("play");
const play = document.querySelector(".images-chosen");
const popUp = document.getElementById("pop-up");
const message = document.getElementById("message");
const playAgain = document.getElementById("play-again");
const quit = document.getElementById("quit");

let playerImg = '';
let playerValue = '';
let enemyValue = '';
window.addEventListener("DOMContentLoaded", () => {
    showImg(img);
    chooseImg();
})
playBtn.addEventListener("click", () => {
    home.classList.add("hide-home");
    choose.classList.add("choose-index");
})

function showImg(arr) {
    const newArr = arr.map((item) => {
        return `
        <div class="choice">
        <img src=${item.source} alt=${item.name} class="img" data-id=${item.value}>
        <p>${item.name}</p>
        </div>`;
    }).join("");
    choice.innerHTML = newArr;
}

function randomNumber() {
    return Math.floor(Math.random() * 3);
}
function computer() {
    const number = randomNumber();
    return img[number].value;
}
function chooseImg() {
    const images = document.querySelectorAll(".img");
    let newImg = '';
    enemyValue = computer();
    images.forEach((item) => {
        item.addEventListener("click", () => {
            playerValue = item.dataset.id;
            display.style.zIndex = 2;
            img.forEach((e) => {
                if (playerValue === e.value) {
                    newImg += `<img src=${e.source} alt=${e.name} class="player">`;
                }
            })
            img.forEach((e) => {
                if (enemyValue === e.value) {
                    newImg += `<img src=${e.source} alt=${e.name} class="enemy">`;
                }
            })
            play.innerHTML = newImg;
            
            rule();
        })
    })
    
}

function rule() {
    game = "";
    if (playerValue === "paper" && enemyValue === "rock" || playerValue === "rock" && enemyValue === "scissor" || playerValue === "scissor" && enemyValue === "paper") {
        game = "win";
    } else if (enemyValue === "paper" && playerValue === "rock" || enemyValue === "rock" && playerValue === "scissor" || enemyValue === "scissor" && playerValue === "paper") {
        game = "lose";
    } else {
        game = "draw";
    }
    const player = document.querySelector(".player");
    const enemy = document.querySelector(".enemy")
    if (game === "win") {
        player.classList.add("right");
        enemy.classList.add("out");
        message.textContent = "You won";
        timeout(2000);
    } else if (game === "lose") {
        enemy.classList.add("left");
        player.classList.add("out");
        message.textContent = "You lose";
        timeout(2000);
    } else {
        message.textContent = "Draw";
        timeout(500);
    }
    function timeout(num) {
        setTimeout(() => {
            popUp.style.display = "flex";
            popUp.style.zIndex = 10;
        }, num)
    }
    
    playAgain.addEventListener("click", () => {
        if (game === "win") {
            player.classList.remove("right");
            enemy.classList.remove("out");
        } else if (game === "lose") {
            enemy.classList.remove("left");
            player.classList.remove("out");
        }
        display.style.zIndex = -2;
        popUp.style.display = "none";
        popUp.style.zIndex = -10;
        message.textContent = "";
        chooseImg();
    
    })
    quit.addEventListener("click", () => {
        window.close();
    })
}
