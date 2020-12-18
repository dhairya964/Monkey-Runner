var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstaclesGroup,ground;
var SurvivalTime = 0
var BananaEaten = 0
var PLAY=1;
var END=0;
var gameState=PLAY
function preload(){
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 var Score = 0;
}



function setup() {
  
  monkey=createSprite(80,280,20,20);
 monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,290,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)     
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
  SurvivalTime=0
  bananaEaten= 0
}


function draw() {
createCanvas(600,300)
background("white")
  
 
  if(gameState===PLAY){
  
    var survivaltime 
  stroke("white");
  textSize(20);
  fill("white");
  text("bananaEaten: " + bananaEaten, 500,50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivaltime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivaltime, 100,50);
  
    ground.velocityX = -(4 + 3* SurvivalTime/20)
  
    text("BananaEaten: "+ BananaEaten, 300,50);
  if(FoodGroup.isTouching(monkey)){
  FoodGroup.destroyEach();
  BananaEaten=BananaEaten+1
  
}
    
     

    if (ground.x < 150){
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
      monkey.velocityY = monkey.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(monkey)){
      gameState=END;
      
      
}
    spawnFood();
    spawnObstacle();
  }else if (gameState===END){
    
    SurvivalTime.visible = true;
    BananaEaten.visible = true;
    
    textSize(50);
    fill("red");
    text("Game Over",150,150);
    
    ground.velocityX=0;
    monkey.velocityY=0;

    FoodGroup.setLifetimeEach(-1)
    obstaclesGroup.setLifetimeEach(-1);
     
    FoodGroup.setVelocityXEach(0);
     obstaclesGroup.setVelocityXEach(0);
  }

  
  
  

  
  monkey.collide(ground);
  
  drawSprites();
  
}


function spawnObstacle(){
if (frameCount % 300 === 0) {
   var obstacle = createSprite(360,250,10,10);
   obstacle.velocityX = -(6 + SurvivalTime/100);
    obstacle.x = Math.round(random(500,500));
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
  obstaclesGroup.add(obstacle);
}
    
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    var food = createSprite(200,200,20,20);
    food.y = Math.round(random(120,200));
    food.addImage(bananaImage);
    food.scale = 0.1;
    food.velocityX = -3
    FoodGroup.add(food);

}

}






