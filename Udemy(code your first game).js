var canvas;
var canvasContext;
var ballX=50;
var ballY=50;
var ballSpeedY=4;
var ballSpeedX=10;
var counter=0;
var paddle1Y=250;
var paddle2Y=250;
var playerscore1=0;
var playerscore2=0;
var endTextHeight=250;
var endTextWidth=500;
var showingWinScreen=false;
const WINNING_SCORE=1;
const PADDLE_HEIGHT=100;
 const PADDLE_THICKNESS=10;
//start canvas with onload page
function handleMouseClick(evt)
{
if(showingWinScreen){
  playerscore1=0;
  playerscore2=0;
  showingWinScreen=false;
}
}
window.onload=function(){

  canvas =document.getElementById('canvas');
  canvasContext=canvas.getContext('2d');
  var framesPerSecond=30
  setInterval(function(){
    moveEverything();
    drawEverything();
    colorCircle();

  },1000/framesPerSecond);
  canvas.addEventListener('mousemove',function(evt){
    var mousePose=calculateMousePos(evt);
    paddle1Y=mousePose.y-PADDLE_HEIGHT/2;
  });
    canvas.addEventListener('mousedown',handleMouseClick);

}
function ballReset(){
  // if(playerscore1===WINNING_SCORE || playerscore2===WINNING_SCORE){
  //   playerscore1=0;
  //   playerscore2=0;
  // }
  ballSpeedX=-10;
  ballX=canvas.width/2;
  ballY=canvas.height/2;
showingWinScreen=true;
 // paddle1Y=250;
 //   paddle2Y=250;
}
function calculateMousePos(evt){
  var rect=canvas.getBoundingClientRect();
  var root=document.documentElement;
  var mouseX=evt.clientX-rect.left-root.scrollLeft;
  var mouseY=evt.clientY-rect.top-root.scrollTop;
  return{
    x:mouseX,
    y:mouseY
  };
}
function computermovement()
{
  var paddle2YCenter=paddle2Y+(PADDLE_HEIGHT/2);
  if(paddle2YCenter<ballY-35){
    paddle2Y+=6;
  }
  else if(paddle2YCenter>ballY+35){
    paddle2Y-=6;
  }
}
//moving component
function moveEverything(){
  computermovement();
  ballX+=ballSpeedX;
  ballY+=ballSpeedY;
  // ballSpeedX=ballSpeedX+5;

  if (ballX>canvas.width) {

    if(ballY>paddle2Y && ballY<paddle2Y+PADDLE_HEIGHT){
      ballSpeedX=-(ballSpeedX+3);
      var deltaY=ballY-(paddle2Y+PADDLE_HEIGHT/2);
      ballSpeedY=deltaY*0.35;
    }else {
        playerscore1++;// must be before all reset
      ballReset();

    }

  }
  if (ballX<0) {
    // ballSpeedX =-ballSpeedX;
    if(ballY>paddle1Y && ballY<paddle1Y+PADDLE_HEIGHT){
      var deltaY=ballY-(paddle1Y+PADDLE_HEIGHT/2);
      ballSpeedY=deltaY*0.35;
      ballSpeedX=-ballSpeedX;

    }else {
        playerscore2++;// must be before all reset
      ballReset();

    }

  }
  if (ballY>canvas.height) {
    ballSpeedY =-ballSpeedY;
  }
  if (ballY<0) {
    ballSpeedY =-ballSpeedY;
  }

}
function colorCircle(centerX,centerY,radius,drawColor){
  canvasContext.fillStyle=drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX,centerY,radius,0,Math.PI*2,true);
  canvasContext.fill();
}
//Draw boxes
function endgame(){
  ballX=475;
  ballY=245;

}
function drawEverything(){
  console.log(ballX);
  //next line blanks out the screen black
  colorRect(0,0,canvas.width,canvas.height,'black');
  if(showingWinScreen){
    if(playerscore2>=WINNING_SCORE){
      canvasContext.fillStyle='white';
      canvasContext.fillText("Right Player 2 win",endTextWidth,endTextHeight);

    }
    else if(playerscore1>=WINNING_SCORE){
      canvasContext.fillStyle='white';
      canvasContext.fillText("Left Player  win ",endTextWidth,endTextHeight);

    }
      endgame();
    canvasContext.fillStyle='white';
    canvasContext.fillText("click to continue",endTextWidth,endTextHeight+200);

    return;
  }
  //next line blanks out the box white
  colorRect(0,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //next line blanks out the box white
  colorRect(canvas.width-10,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

  //next line blanks out the box red
  colorCircle(ballX,ballY,10,10,'white');
 canvasContext.fillText("Player 1: "+playerscore1+"" ,100,100);
  canvasContext.fillText("Player 2 :"+playerscore2+"",canvas.width-100,100);





}

function colorRect(leftX,topY,width,height,drawColor){
  canvasContext.fillStyle=drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}
