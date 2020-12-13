var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var score = 0;
var ground;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ab;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  createCanvas(500, 500);
  monkey = createSprite(150, 450, 10, 10);
  monkey.addAnimation("monkey1", monkey_running);
  monkey.scale = 0.1;


  ground = createSprite(10, 460, 1000, 10);
  ground.x = ground.width / 2;
  ground.shapeColor = "lightbrown";

  foodGroup = new Group();
  obstacleGroup = new Group();


}


function draw() {
  background("black");
  
  textSize(18);
  text("Survival Time: " + score, 150, 100);

  if (gameState === PLAY) {
    score = score + Math.round(getFrameRate() / 60);
    ground.velocityX = -5;
    if (ground.x < 0) {
      ground.x = ground.width / 2;
    }

    if (keyDown("space")) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    food();
    spawnObstacles();
    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();

    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      
    }
  } else if (gameState === END) {
    
    ground.velocityX = 0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }




  monkey.collide(ground);
  drawSprites();
}

function spawnObstacles() {
  if (frameCount%300 === 0) {
    obstacle = createSprite(450, 410, 50, 50);
    obstacle.velocityX=-5;
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.2;
    obstacle.lifeTime = 150;
    obstacleGroup.add(obstacle);
  }

}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(450, 250, 10, 10);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.y = random(120, 300);
    banana.lifetime = 150;
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    foodGroup.add(banana);
  }
}