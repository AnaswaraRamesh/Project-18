var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection=0;
var cashG,diamondsG,jwelleryG,swordGroup;
var PLAY=1;
var END=0
var gameState=1;
var gameOver
var lives =3
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
}

function setup(){
  
  createCanvas(400,400);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
  


//creating boy running
boy = createSprite(70,330,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
  gameOver=createSprite(200,200)
  gameOver.addAnimation("gameover",endImg)
  gameOver.scale=0.5
  
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(0);
  
  
  if(gameState===PLAY){
  
    
  
    gameOver.visible=false
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
            treasureCollection=treasureCollection+100
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection=treasureCollection+150
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        gameState=END 
    }
  }
    
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    
    
  }

    
    

if(gameState===END){
    
  
  gameOver.visible=true;
  swordGroup.setLifetimeEach(-1);
  swordGroup.setVelocityYEach(0);
  diamondsG.setLifetimeEach(-1);
    diamondsG.setVelocityYEach(0);

  cashG.setLifetimeEach(-1);
    cashG.setVelocityYEach(0);

  jwelleryG.setLifetimeEach(-1);
  jwelleryG.setVelocityYEach(0);

  path.velocityY=0
  boy.addAnimation("SahilRunning",boyImg)
  boy.x=200
  boy.y=300
  if(mousePressedOver(gameOver)){
    if(lives>0){
      lives =lives-1
    reset();
  }
  }
}
 
  drawSprites();
  textSize(20)
    fill("pink")
    text("Treasure:"+treasureCollection,200,100)
}


function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
    gameOver.depth=cash.depth+1
  cashG.add(cash);
    
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
    gameOver.depth=diamonds.depth+1
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
    gameOver.depth=jwellery.depth+1;
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}
function reset(){
  gameState=PLAY
  gameOver.visible=false
  
  jwelleryG.destroyEach();
  cashG.destroyEach();
  diamondsG.destroyEach();
  swordGroup.destroyEach();

treasureCollection=0
  path.velocityY = 4;
}