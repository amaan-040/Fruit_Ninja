//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,fruit, alien1, alien2, fruit1, fruit2, fruit3, fruit4, gameOver;
var knifeImage,alien1Img, alien2Img, fruit1Img, fruit2Img, fruit3Img, fruit4Img, gameOverImg;
var knifeSound, gameOverSound;

var score;

var fruitGroup, alienGroup;


function preload(){
  knifeImage = loadImage("knife.png");
  alien1Img = loadImage("alien1.png");
  alien2Img = loadImage("alien2.png");
  fruit1Img = loadImage("fruit1.png");
  fruit2Img = loadImage("fruit2.png");
  fruit3Img = loadImage("fruit3.png");
  fruit4Img = loadImage("fruit4.png");
  gameOverImg = loadImage("gameover.png");
  
  knifeSound = loadSound("knifeSwoosh.mp3");
  gameOverSound = loadSound("gameover.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
  
  
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

  score=0;
  //create fruit and monster Group variable here
  fruitGroup = new Group()
  alienGroup = new Group()
}

function draw() {
  background("lightblue");
  
  if(gameState===PLAY){
    
    //calling fruit and monster function
    fruits();
    alien();
    // Move knife with mousefri
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
    // Increase score if knife touching fruit
    if(fruitGroup.isTouching(knife)){
      score=score+2;
      fruitGroup.destroyEach();
      knifeSound.play();
    }
   
    // Go to end state if knife touching enemy
      if(alienGroup.isTouching(knife)){
        gameState = END;
        
      fruitGroup.destroyEach();
      alienGroup.destroyEach();
      fruitGroup.velocityXEach=0;
      alienGroup.velocityXEach=0;
      knife.addImage(gameOverImg);
      knife.scale=1.5;
      knife.x=300;
      knife.y=300;
      gameOverSound.play();  
      }
  }
  
  drawSprites();
 
  //Display score
  textSize(25);
  text("Score : "+ score,250,50);
}

function fruits() {
  
  if(World.frameCount%80===0){ 
   fruit=createSprite(400,200,20,20);
   fruit.scale=0.2;
    
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: fruit.addImage(fruit1Img);
              break;
      case 2: fruit.addImage(fruit2Img);
              break;
      case 3: fruit.addImage(fruit3Img);
              break;
      case 4: fruit.addImage(fruit4Img);
               break;
      default: break;
    }

     fruit.y=Math.round(random(50,340));
     fruit.velocityX=-7;
     fruit.setlifetime=100;

     fruitGroup.add(fruit);
  }
}  
  
  function alien(){
    
  
  if(World.frameCount%200 === 0) {
     
     alien2=createSprite(800,200,20,20);
     alien2.addImage("alien2Img", alien2Img);
     alien2.y=Math.round(random(325,575));
     alien2.velocityX=-(8+(score/10));
     alien2.setlifetime=50;

     alienGroup.add(alien2);
     
   }
 }
  
