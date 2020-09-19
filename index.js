const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const button = document.querySelector("#start");
let squares = [];
let currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;
let intervalTime = 1000;
let speed = 0.9;
let timerId = 0;

function createGrid() {
    //create 100 of these elements with a for loop
    for (let i = 0; i < width * width; i++) {
        //create element
        const square = document.createElement("div");
        //add styling to the element
        square.classList.add("square");
        //put the element into our grid
        grid.appendChild(square);
        //push it into a new squares array 
        squares.push(square);

    }
}

createGrid();

currentSnake.forEach(index => squares[index].classList.add('snake'));

function startGame() {
    //remove the snake 
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    //remove the apple
    squares[appleIndex].classList.remove('apple');
    clearInterval(timerId);
    currentSnake = [2, 1, 0];
    direction = 1;
    score = 0;
    //reset the score
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    generateApple();
    //readd the currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    timerId = setInterval(move, intervalTime);
}

function move() {

    if (
        (currentSnake[0] + width >= width * width && direction === width) || //if snake hits bottom wall
        (currentSnake[0] % width === 0 && direction === -1) || //if snake hits left wall
        (currentSnake[0] % width === width - 1 && direction === +1) || //if snake hits right wall
        (currentSnake[0] - width < 0 && direction === -width) || //if snake hits top wall
        squares[currentSnake[0] + direction].classList.contains('snake')
    )
        return clearInterval(timerId);

    //remove last element from our currentSnake array
    const tail = currentSnake.pop();
    //remove styling from last element
    squares[tail].classList.remove('snake');
    //add square in direction we are heading
    currentSnake.unshift(currentSnake[0] + direction);

    if (squares[currentSnake[0]].classList.contains('apple')) {
        //remove the class of apple
        squares[currentSnake[0]].classList.remove('apple');
        //grow our snake by adding class of snake to it
        squares[tail].classList.add('snake');
        //grow our snake array
        currentSnake.push(tail);
        //generate a new apple
        generateApple();
        //add one to the score
        score++;
        //display score
        scoreDisplay.innerHTML = score;
        //speed up snake
        clearInterval(timerId);
        intervalTime = intervalTime * speed;
        timerId = setInterval(move, intervalTime);
    }

    //add styling so we can see it
    squares[currentSnake[0]].classList.add('snake');
}




function generateApple() {
    do {
        //generate a random number
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
}

generateApple()

function control(e) {
    if (e.keyCode === 39) {
        direction = 1;
    } else if (e.keyCode === 38) {
        direction = -width;
    } else if (e.keyCode === 37) {
        direction = -1;
    } else if (e.keyCode === 40) {
        direction = +width;
    }
}

document.addEventListener('keyup', control);
button.addEventListener('click', startGame);