// Set up canvas
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

// Define the size of the game play area
const box = 20;
const canvasSize = 20;
canvas.width = box * canvasSize;
canvas.height = box * canvasSize;

let score = 0;
let snake = [];
snake[0] = { x: canvasSize / 2 * box, y: canvasSize / 2 * box };

let food = {
    x: Math.floor(Math.random() * canvasSize) * box,
    y: Math.floor(Math.random() * canvasSize) * box,
};

let obstacles = [
  { x: 5 * box, y: 3 * box },
  { x: 8 * box, y: 7 * box },
  { x: 13 * box, y: 10 * box },
  // Add more obstacles as needed
];

let d;
document.addEventListener('keydown', direction);

function direction(event) {
    if (event.keyCode == 37 && d != 'RIGHT') d = 'LEFT';
    else if (event.keyCode == 38 && d != 'DOWN') d = 'UP';
    else if (event.keyCode == 39 && d != 'LEFT') d = 'RIGHT';
    else if (event.keyCode == 40 && d != 'UP') d = 'DOWN';
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = i == 0 ? 'lime' : 'green'; // Changed snake color
        context.fillRect(snake[i].x, snake[i].y, box, box);

        context.strokeStyle = 'white'; // Changed border color
        context.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = 'red'; // Changed food color
    context.fillRect(food.x, food.y, box, box);

    for (let i = 0; i < snake.length; i++) {
  // Existing code to draw the snake
}

for (let i = 0; i < obstacles.length; i++) {
  context.fillStyle = 'gray'; // Obstacle color
  context.fillRect(obstacles[i].x, obstacles[i].y, box, box);

  context.strokeStyle = 'white'; // Obstacle border color
  context.strokeRect(obstacles[i].x, obstacles[i].y, box, box);
}

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == 'LEFT') snakeX -= box;
    if (d == 'UP') snakeY -= box;
    if (d == 'RIGHT') snakeX += box;
    if (d == 'DOWN') snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x: Math.floor(Math.random() * canvasSize) * box,
            y: Math.floor(Math.random() * canvasSize) * box,
        };
    } else {
        snake.pop();
    }
let newHead = {
    x: snakeX,
    y: snakeY,
};

if (snakeX < 0) newHead.x = canvasSize * box - box;
if (snakeY < 0) newHead.y = canvasSize * box - box;
if (snakeX >= canvasSize * box) newHead.x = 0;
if (snakeY >= canvasSize * box) newHead.y = 0;

// Check for collision with the snake's body
if (collision(newHead, snake)) {
    clearInterval(game);
    context.fillStyle = 'white';
    context.font = '50px Arial';
    context.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}

if (
  collision(newHead, snake) ||
  collision(newHead, obstacles) // Added check for collision with obstacles
) {
  clearInterval(game);
  context.fillStyle = 'white';
  context.font = '50px Arial';
  context.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}

snake.unshift(newHead);

    context.fillStyle = 'white'; // Changed score color
    context.font = '20px Arial'; // Changed score font
    context.fillText(score, 2 * box, 1.6 * box);
}

canvas.style.backgroundColor = '#000'; // Added background color to canvas

function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
let game = setInterval(draw, 100);