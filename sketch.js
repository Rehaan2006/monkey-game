var play=1;
var end=0;
var gamestate=1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground,groundimg;
var score=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
 obstacleImage  = loadImage("obstacle.png");

}



function setup() {
  createCanvas(600,300);
  monkey=createSprite(100,200,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.1 ;
   
  
   ground = createSprite(1000,270,2000,20);
   ground.velocityX=-4   
 
  ground.x = ground.width /2;
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
   
}



function draw() {
background(220)
  textSize(20);
  
  text("Score: "+score,100,50);
  
  if (gamestate===play){
  if (ground.x<10){
  ground.x = ground.width /2;
}
    score=Math.ceil(frameCount/frameRate());            if(keyDown("space")&& monkey.y >= 190) {
        monkey.velocityY = -12;
    
    }
    if (monkey.isTouching(obstacleGroup)){
      gamestate=end;
    }
    fruit();
  obstacles();
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide (ground);
  }
  if (gamestate===end){
      ground.velocityX = 0;
      monkey.velocityY = 0
      
     
      
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  
  }
  drawSprites();
  
  
  
}

function fruit(){

  if (frameCount % 80 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(80,120));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
    banana.lifetime = 200;
    
   
    banana.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    
   
 FoodGroup.add (banana);
  }
}
function obstacles(){
  if (frameCount%300 === 0){
    var obstacle=createSprite(600,230,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.2
    obstacle.lifetime = 300;
    obstacle.velocityX = -6
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle)
  }
}