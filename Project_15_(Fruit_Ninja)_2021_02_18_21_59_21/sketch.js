var sword 
var fruit1, fruit2, fruit3, fruit4
var alien1, alien2
var gameOver
var monster
var kitchen
var kn
var gm


var PLAY=1;
var END =0;
var gameState = 1;




function preload(){
swordImage = loadImage("sword.png")  
fruit1Image = loadImage("fruit1.png")
fruit2Image = loadImage("fruit2.png")
fruit3Image = loadImage("fruit3.png")
fruit4Image = loadImage("fruit4.png")
gameOverImage = loadImage("gameover.png")
monsterImage = loadImage("alien1.png","alien2.png")
kitchenImage = loadImage("modern-kitchen-interior-background-template-cartoon-dinner-room-with-furniture_33099-131.webp")
knSound = loadSound("Sword Slash SFX.mp3")
gmSound = loadSound("failuresfx.mp3")
}

function setup() {
kitchen = createSprite(280,150,20,20);
kitchen.addImage("kitchen", kitchenImage)
kitchen.scale = 1.25

sword = createSprite(40, 200, 20, 20);  
sword.addImage(swordImage);
sword.scale = 0.8
  
sword.setCollider("rectangle",0,0,40,40); 
  
score = 0;
fruitGroup=createGroup();
enemyGroup =createGroup();
  

}




function draw(){
  
background("lightblue")
 createCanvas(360, 360); 
if(gameState===PLAY){  
fruits();
enemy();
  
sword.y=World.mouseY;
sword.x=World.mouseX; 
  
if(fruitGroup.isTouching(sword)){
fruitGroup.destroyEach();
score = score + 1;    
knSound.play()
}  
else
{
 if(enemyGroup.isTouching(sword)){
gameState=END;
fruitGroup.destroyEach();
enemyGroup.destroyEach();
fruitGroup.setVelocityXEach(0);
enemyGroup.setVelocityXEach(0);
sword.addImage(gameOverImage);
sword.x=180;
sword.y=180;
//knSound.play()
gmSound.play()

 }
}          
  
}
drawSprites();  
text("Score : "+ score,275,60);

}

function enemy(){
if(World.frameCount%200===0){
monster=createSprite(400,200,20,20);
monster.addAnimation("moving",monsterImage);
monster.y=Math.round(random(100,300));
monster.velocityX=-(8+(score/10));
monster.setLifetime=50;
    
enemyGroup.add(monster);
  }
}

function fruits(){
  if(World.frameCount%80===0){
    fruit=createSprite(340,200,20,20);
    fruit.scale = 0.2
    
    
    
    
    
    r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1Image);
    } else if (r == 2) {
      fruit.addImage(fruit2Image);
    } else if (r == 3) {
      fruit.addImage(fruit3Image);
    } else {
      fruit.addImage(fruit4Image);
    }
    
    fruit.y=Math.round(random(50,340));
   
fruit.velocityX=-(7+(score/4));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }

}