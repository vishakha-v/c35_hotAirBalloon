var balloon;
var balloon_img, bg_img;
var database, position;

function preload()
{
  balloon_img = loadImage("hotballoon.png");
  bg_img = loadImage("cityimage.png");
}

function setup() {
  createCanvas(800,500);
  database = firebase.database();
  balloon = createSprite(400, 150, 50, 100);
  balloon.addImage("balloon",balloon_img);
  balloon.scale = 0.3;
}

function draw() {
  background(bg_img);  

  textSize(20);
  stroke("red")
  fill("black");
  text("Use arrow keys to move the air balloon..!",20,50);

  
  
  if(keyDown(LEFT_ARROW))
  {
    updatePosition(-5,0);
    
  }

  if(keyDown(RIGHT_ARROW))
  {
    updatePosition(5,0);

  }

  if(keyDown(UP_ARROW))
  {
    updatePosition(0,-5);
    balloon.addImage("airballoon",balloon_img);
    balloon.scale = balloon.scale - 0.01;
  }

  if(keyDown(DOWN_ARROW))
  {
    updatePosition(0,5);
    balloon.addImage("airballoon",ballon_img);
    balloon.scale = balloon.scale + 0.01;
  }
  var balloonPosition = database.ref('balloon/position');
  balloonPosition.on("value",readPosition,showError);
  
 
  drawSprites();
}

function updatePosition(x,y)
{
  database.ref('balloon/position').set({
  'x' : position.x + x,
  'y' : position.y + y
  })
}

function readPosition(data)
{
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y; 
}

function showError()
{
  console.log("Error in database!!");
}