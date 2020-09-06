var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running, monkey_collided 
var banana ,bananaImage, obstacle, obstacleImage, ground, invisibleGround
var bananaGroup, obstacleGroup, score

function preload(){
  
  
  monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  monkey_collided = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 600);
  
  monkey = createSprite(100,320,20,50);
  monkey.addAnimation("running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(400,330,1200,10);
  invisibleGround.velocityX = -4;
  invisibleGround.x = invisibleGround.width /2;
  invisibleGround.visible = false;
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  monkey.setCollider("circle",0,0,40);
  
  score = 0;
  
  bscore = 0;
  
}

function draw() {
  
  background(1000);

  stroke("black");
  textSize(20);
  fill("black")
  text("Survival Time: "+ score, 400,50);
  
  if(gameState === PLAY){
    
    ground.velocityX = -(4 + 3* score/100)

    score = Math.ceil(frameCount/frameRate());
    
    if(score>0 && score%100 === 0){
    }
    
    if (ground.x < 0 || invisibleGround.x < 0){
      ground.x = ground.width/2;
      invisibleGround.x = invisibleGround.width/2;
    }
  
    if(keyDown("space")&& monkey.y >= 310) {
        monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.8
  
    bananas();
  
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState = END;
      
      monkey.changeAnimation("collided", monkey_collided);
    }
  }
   else if (gameState === END) {
    
      ground.velocityX = 0;
      monkey.velocityY = 0
      
    obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0);    
   }
  
  monkey.collide(invisibleGround);

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 200 === 0){
   var obstacles = createSprite(600,330,10,40);
   obstacles.velocityX = -(6 + score/100);
   
   obstacles.addImage(obstacleImage);
             
    obstacles.scale = 0.1;
    obstacles.lifetime = 300;
   
    obstaclesGroup.add(obstacles);
 }
}

function bananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(200,250));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    banana.lifetime = 200;
    
    bananasGroup.add(banana);
  }
}