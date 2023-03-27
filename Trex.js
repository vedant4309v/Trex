// Set up the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 200;
document.body.appendChild(canvas);

// Set up the game variables
var score = 0;
var highScore = 0;
var obstacles = [];
var gameOver = false;
var gameSpeed = 4;
var gravity = 1;
var jumpSpeed = 15;

// Set up the T-Rex
var trex = {
  x: 50,
  y: 150,
  width: 50,
  height: 50,
  yVelocity: 0,
  jump: function() {
    this.yVelocity -= jumpSpeed;
  },
  update: function() {
    this.yVelocity += gravity;
    this.y += this.yVelocity;
    if (this.y + this.height > canvas.height) {
      this.y = canvas.height - this.height;
      this.yVelocity = 0;
    }
  },
  draw: function() {
    ctx.fillStyle = "#666";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
  isCollidingWith: function(obstacle) {
    if (
      this.x + this.width > obstacle.x &&
      this.x < obstacle.x + obstacle.width &&
      this.y + this.height > obstacle.y
    ) {
      return true;
    }
    return false;
  }
};

// Set up the obstacle class
function Obstacle() {
  this.x = canvas.width;
  this.y = 150;
  this.width = 20 + Math.random() * 30;
  this.height = 20 + Math.random() * 80;
  this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  this.update = function() {
    this.x -= gameSpeed;
  };
  this.draw = function() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
}

// Set up the game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Add new obstacles
  if (Math.random() < 0.05) {
    obstacles.push(new Obstacle());
  }

  // Update and draw the obstacles
  for (var i = 0; i < obstacles.length; i++) {
    obstacles[i].update();
    obstacles[i].draw();
    if (trex.isCollidingWith(obstacles[i])) {
      gameOver = true;
    }
    if (obstacles[i].x + obstacles[i].width < 0) {
      obstacles.splice(i, 1);
      score++;
    }
  }

  // Update and draw the T-Rex
  trex.update();
  trex.draw();

  // Display the score and high score
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
  ctx.fillText("High Score: " + highScore, 10, 60);

  // Increase the game speed every 100 points
  if (score % 100 == 0 && score > 0) {
    gameSpeed += 1;
  }

  // Check for game over
  if (gameOver) {
    if (score > highScore) {
      highScore = score;
    }
    ctx.fillStyle = "#000";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over", 200, 100);
    ctx }