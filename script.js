const instrectionText = document.getElementById("instraction-text");
const logo = document.getElementById("logo")
const board = document.getElementById("game-board");
const scores = document.getElementById("score")
const highScoreText = document.getElementById("highscore")
let audio = new Audio("mixkit-arcade-game-explosion-1699.wav")
let audi2 = new Audio("mixkit-arcade-bonus-alert-767.wav")
let audi3 = new Audio("mixkit-retro-emergency-tones-2971.wav")
let highScore = 0
let gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let barrier = generateBarrier()
let direction = "right";
let isGameStarted = false;
let gameSpeedDeley = 400;
let gameIntervalId;
let barrier2 = generateBarrier()
let barrier3 = generateBarrier()
let barrier4 = generateBarrier()
let barrier5 = generateBarrier()

function draw() {
    board.innerHTML = ""
    drawSnake();
    drawFood();
    switch (snake.length) {
        case 6:
            
            drawBarrier()
            drawBarrier2()
            break;
        case 7:
            
            drawBarrier()
            drawBarrier2()
            break;
        case 8:
            
            drawBarrier()
            drawBarrier2()
            drawBarrier3()
            break;
        case 9:
           
            drawBarrier()
            drawBarrier2()
            drawBarrier3()
            break;
        case 10:
          
            drawBarrier()
            drawBarrier2()
            break;
        case 11:
            drawBarrier()
            drawBarrier2()
            drawBarrier3()
      
            drawBarrier5()
            break;
        case 12:
      
            drawBarrier2()
            drawBarrier3()
            drawBarrier4()
            drawBarrier5()
            break;
        case 13:
            drawBarrier()
            drawBarrier2()
            drawBarrier3()
        
            drawBarrier5()
            break;
        case 14:
            drawBarrier()
            drawBarrier2()
            drawBarrier3()
            drawBarrier4()
          
            break;
        case 15:
      
            drawBarrier2()
            drawBarrier3()
            drawBarrier4()
            drawBarrier5()
            break;
        case 16:
            drawBarrier()
            drawBarrier2()
            drawBarrier4()
            drawBarrier5()
        
            break;

    }


    snakeScore()
    snakeHighScoretext()
}

function drawSnake() {
    audi3.play()
    snake.forEach((segment) => {
        const snakeElement = creatElement("div", "snake");

        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);

    });

}

function creatElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}


function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;

}

// draw();



function drawFood() {
    let foodElement = creatElement("div", "food");
    foodElement.textContent = "🍎";
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}



function move() {
    let head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
        case "left":
            head.x--;
            break;
        case "right":
            head.x++;
            break;
    }



    snake.unshift(head);



    for (i = 0; i < 1; i++) {

        if (head.x === barrier.x && head.y === barrier.y) {
            stopGame()
            audio.play()
            barrier = generateBarrier()
        }
       else if (head.x === barrier2.x && head.y === barrier2.y) {
            stopGame()
            audio.play()
            barrier2 = generateBarrier()
        }
        else if (head.x === barrier3.x && head.y === barrier3.y) {
            stopGame()
            audio.play()
            barrier3 = generateBarrier()
        }
        else if (head.x === barrier4.x && head.y === barrier4.y) {
            stopGame()
            audio.play()
            barrier4 = generateBarrier()
        }
        else if (head.x === barrier5.x && head.y === barrier5.y) {
            stopGame()
            audio.play()
            barrier5 = generateBarrier()
        }
    }

    if (head.x === food.x && head.y === food.y) {
       audi2.play()
        gameSpeedDeley = Math.max(gameSpeedDeley-5)
        food = generateFood();
        clearInterval(gameIntervalId);
        gameIntervalId = setInterval(() => {
            move();
            checkCollision();
            draw()
        }, gameSpeedDeley);

    } else {
        snake.pop();
    }
}

function startGame() {
    isGameStarted = true;
    instrectionText.style.display = "none";
    logo.style.display = "none";
     gameSpeedDeley = 300;
    gameIntervalId = setInterval(() => {
        move();
        checkCollision()
        draw()
    }, gameSpeedDeley);
}

function hendleKeyPress(e) {

    if ((!isGameStarted && e.code === "Space") ||
        (!isGameStarted && e.key === " ")) {
        startGame();
    } else {
        switch (e.key) {
            case "ArrowUp":
                direction = "up"
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }
}

function checkCollision() {
    let head = { ...snake[0] };
    if (head.x < 1 || head.x > gridSize ||
        head.y < 1 || head.y > gridSize) {
        resetGame()
        audio.play()
        gameSpeedDeley = 300;
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame()
            audio.play()
            gameSpeedDeley = 300;
        }
    }
    if (head.x === barrier.x && head.y === barrier.y) {
        stopGame()
        audio.play()
        barrier = generateBarrier()
    }
   else if (head.x === barrier2.x && head.y === barrier2.y) {
        stopGame()
        audio.play()
        barrier2 = generateBarrier()
    }
    else if (head.x === barrier3.x && head.y === barrier3.y) {
        stopGame()
        audio.play()
        barrier3 = generateBarrier()
    }
    else if (head.x === barrier4.x && head.y === barrier4.y) {
        stopGame()
        audio.play()
        barrier4 = generateBarrier()
    }
    else if (head.x === barrier5.x && head.y === barrier5.y) {
        stopGame()
        audio.play()
        barrier5 = generateBarrier()
    }
}

function resetGame() {
    stopGame()
    snake = [{ x: 10, y: 10 }];
    food = generateFood();
    direction = "right";
    gameSpeedDeley =300
    barrier = generateBarrier()
    snakeScore()
    snakeHighScoretext()
}

function stopGame() {
   gameSpeedDeley = 300;

    clearInterval(gameIntervalId);
    isGameStarted = false;
    logo.style.display = "block";
    instrectionText.style.display = "block"
}

document.addEventListener("keydown", hendleKeyPress)
// setInterval(()=>{
//     move();
//     draw()
// },200);

function snakeScore() {
    let currentSCore = snake.length - 1;
    scores.textContent = currentSCore.toString().padStart(3, "0")
}

function snakeHighScoretext() {
    let currentSCore = snake.length - 1;
    if (currentSCore > highScore) {
        highScore = currentSCore
    }
    highScoreText.textContent = highScore.toString().padStart(3, "0")
    highScoreText.style.display = "block"


}


function generateBarrier() {

    let x = Math.floor(Math.random() * gridSize) + 1;
    let y = Math.floor(Math.random() * gridSize) + 1;

    return { x, y }

}

function drawBarrier() {

    let BarrierElement = creatElement("div", "barrier");
    BarrierElement.textContent = "🪨";
    setPosition(BarrierElement, barrier);
    board.appendChild(BarrierElement);

}

function drawBarrier2() {

    let Barrier2Element = creatElement("div", "barrier2");
    Barrier2Element.textContent = "🪨";
    setPosition(Barrier2Element, barrier2);
    board.appendChild(Barrier2Element);

}

function drawBarrier3() {

    let Barrier3Element = creatElement("div", "barrier3");
    Barrier3Element.textContent = "🪨";
    setPosition(Barrier3Element, barrier3);
    board.appendChild(Barrier3Element);

}

function drawBarrier4() {

    let Barrier4Element = creatElement("div", "barrier4");
    Barrier4Element.textContent = "🪨";
    setPosition(Barrier4Element, barrier4);
    board.appendChild(Barrier4Element);

}

function drawBarrier5() {

    let Barrier5Element = creatElement("div", "barrier5");
    Barrier5Element.textContent = "🪨";
    setPosition(Barrier5Element, barrier5);
    board.appendChild(Barrier5Element);

}
