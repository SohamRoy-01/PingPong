// Update loop

import Ball from "./ball.js";
import Paddle from "./paddle.js"

const ball = new Ball(document.getElementById("ball"))
const playerPaddle = new Paddle(document.getElementById("player-paddle"))
const compPaddle = new Paddle(document.getElementById("computer-paddle"))
const playerScoreElement = document.getElementById("player-score")
const compScoreElement = document.getElementById("computer-score")


let lastTime;
function Update(time){
    if(lastTime != null){
    const delta = time-lastTime;
    ball.Update(delta,[playerPaddle.rect(),compPaddle.rect()])
    compPaddle.Update(delta,ball.y)
    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))

document.documentElement.style.setProperty("--hue",hue + delta * 0.01)

    if (isLose()) handleLose()
    }

    lastTime = time;
    // console.log(time)
    window.requestAnimationFrame(Update)
}

function isLose(){
    const rect = ball.rect()
    return (rect.right >= window.innerWidth || rect.left <=0)

    
}

function handleLose(){
    const rect = ball.rect()
    if(rect.right >= window.innerWidth ){
        playerScoreElement.textContent = parseInt(playerScoreElement.textContent)+1
    } else{
        compScoreElement.textContent = parseInt(compScoreElement.textContent)+1
    }
    ball.reset();
    compPaddle.reset()
}

document.addEventListener("mousemove",e=>{
    playerPaddle.position =( e.y / window.innerHeight) *100
})


let lastTouchY = null;
let touchStartY = null;

document.addEventListener("touchstart", e => {
  const touch = e.touches[0];
  touchStartY = touch.pageY;
});

document.addEventListener("touchmove", e => {
  const touch = e.touches[0];
  const touchY = touch.pageY;
  const delta = touchY - (lastTouchY || touchStartY || touchY);
  lastTouchY = touchY;
  playerPaddle.position = Math.max(0, Math.min(100, playerPaddle.position + (delta / window.innerHeight) * 100));
});

document.addEventListener("touchend", e => {
  lastTouchY = null;
  touchStartY = null;
});

window.requestAnimationFrame(Update)