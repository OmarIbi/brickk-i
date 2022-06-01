var x = 150;
var y = 80;
var dx = 2;
var dy = 4;
var ctx;
var width;
var height;
var wallPos;
var wallHei;
var wallWid;
var score = 0;
var paused = false;
rightDown = false;
leftDown = false;
var paddlecolor = "#00FFFF";
var ballcolor = "#e9967a";
var backcolor = "#a0522d";
var audio = new Audio("sound/hit3.wav");
var audio2 = new Audio("sound/hitrect.wav");
var img = new Image();
var bricks;
var NROWS;
var NCOLS;
var BRICKWIDTH;
var BRICKHEIGHT;
var PADDING;
var int = 20;
var intt = 10;
const soundOn = localStorage.getItem("sound");
var rowcolors = ["#FF1C0A", "#FFFD0A", "#00A308", "#0008DB", "#EB0093"];
var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var interval = setInterval(draw,int);
//var timeout = setTimeout(draw,Math.floor(score) == 2);
var intervalnext;
function init (){
var canvas = document.getElementById("canvas");

ctx = canvas.getContext("2d");
width = document.getElementById("canvas").width;
height = document.getElementById("canvas").height;

//return setTimeout(draw,1700);
}
function onKeyDown(evt) {
    if (evt.keyCode == 39) rightDown = true;
    else if (evt.keyCode == 37) leftDown = true;
  }
  function onKeyUp(evt) {
    if (evt.keyCode == 39) rightDown = false;
    else if (evt.keyCode == 37) leftDown = false;
}
//document.addEventListener(keyCode,onkeydown);
//document.addEventListener(keyCode,onkeyup);
   $(document).keydown(onKeyDown);
   $(document).keyup(onKeyUp);
function init_wall() {
    wallPos = width / 2;
    wallHei = 6;
    wallWid = 80;}

function clear(){
    ctx.clearRect(0,0,width,height);
}

function circle(x,y,r)
{
ctx.beginPath();
ctx.arc(x,y,r,0,2 * Math.PI,true);
ctx.closePath();
ctx.fill();

}
function rect(x,y,w,h) {
    //ctx.fillStyle = backcolor;
    ctx.beginPath();
    ctx.rect(x,y,w,h);
    ctx.closePath();
    ctx.fill();
    
  }

  function initbricks() {
    NROWS = 5;
    NCOLS = 5;
    BRICKWIDTH = (width/NCOLS) - 1;
    BRICKHEIGHT = 10;
    PADDING = 1;
  
    bricks = new Array(NROWS);
    for (i=0; i < NROWS; i++) {
      bricks[i] = new Array(NCOLS);
      for (j=0; j < NCOLS; j++) {
        bricks[i][j] = 1;
      }
    }
    
  }
  function drawbricks()
  {
    
    for (i=0; i < NROWS; i++) {
        for (j=0; j < NCOLS; j++) {
          if (bricks[i][j] == 1) {
            rect((j * (BRICKWIDTH + PADDING)) + PADDING, 
                 (i * (BRICKHEIGHT + PADDING)) + PADDING,
                 BRICKWIDTH, BRICKHEIGHT);
          }
        
         
        }
        ctx.fillStyle = rowcolors[i];
        
      }
      
     
  }
  /*function changeTimer(){
    return int = int - 1;
}*/
function draw()
{
ctx.fillStyle = ballcolor;
    clear();
  
    circle(x,y,8);
    //drawScore(score);
    if(rightDown) wallPos += 5;

    if(leftDown) wallPos -=5;
    
    
    ctx.fillStyle = backcolor;
     rect(wallPos,height-wallHei,wallWid,wallHei);
     ctx.fillStyle = paddlecolor;
       //draw bricks
 
  drawbricks();
  
 text("Score : " + Math.floor(score),"15px Comic Sans MS",0,140,"white");
 score +=1/100;
 if(Math.floor(score) == 18){
  //clear();
  clearInterval(interval);
  ctx.fillStyle= "white";
  ctx.fillRect(0, 0, width, height);
  
  
  write2();
  
  window.open("nexPage.html", "_self");
//init_wall();

  //int = 12;
  //var interval = setInterval(draw,10);
  //changeTimer();
  
 
 
 

  //setInterval(draw,int);

 }
  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
    if(soundOn == "on"){
    audio2.play();}
      }  
    
      
  
    if(x + dx > width || x + dx < 0 ) 
    dx = -dx;
    if(y + dy < 0)
    dy = -dy;
    else if (y + dy > height){
    if(x > wallPos && x < wallWid + wallPos){
    dy = -dy; 
    if(soundOn == "on")
      audio.play();}
    
        else     {
          clearInterval(interval);
          
          ctx.fillStyle= "white";
          ctx.fillRect(0, 0, width, height)
         GameOver();
          
          return
          //ctx.fillRect(0, 0, width, height)
          //ctx.font = "40px Arial";
          //ctx.fillText("you lost try again",0,0);
          /*ctx.fillStyle = "black";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "40px Arial";
          ctx.fillText("you lost try again",1000,1000);*/
     
         //clearInterval(intervalId);
         //app.stage.removeChild(knife);
         //GameOver();
             
        //window.close();
        //app.clear();
    //clearInterval(init);
      
        }
      
    }
    
   
   
    //alert("you lost Try again");
    x += dx;
    y += dy;

}

/*
window.addEventListener('keydown', function (e) {
  var key = e.keyCode;
  if (key === 37)// p key
  {
      togglePause();
  }
  });*/
function togglePause()
{
    if (!paused)
    {
        paused = true;
    } else if (paused)
    {
       paused= false;
    }

}
  /*
function init2 (){
  var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
width = document.getElementById("canvas").width;
height = document.getElementById("canvas").height;
  return setInterval(draw,10);
  }*/
function text(txt,fnt,x,y,c) {
  
  ctx.fillStyle = c;
  ctx.font = fnt;
  ctx.fillText(txt, x, y);
}
function write2() {
 // img.src = "giphy.png";
  //ctx.textAlign = "start";
    // ctx.fillStyle = "red";
   // ctx.font = "40px Comic Sans MS";
   // ctx.fillText("you win",60,80);
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
   //togglePause();
   //canvas.style.opacity = 0.5;
  // img.src = "giphy.png";
  // ctx.drawImage(img, 0, 0);
   //int --;
   //interval-=10;
   //ctx.clear();
   
   ctx.textAlign = "start";
   ctx.fillStyle = "red";
  ctx.font = "40px Comic Sans MS";
  ctx.fillText("You win",60,80);
  //int = 10;
  //interval = setInterval(drawnextlevel,intt);
  //initbricks();
  
  
  
  // window.open("index.html", "_self");
   }300;
 function write() {
 
ctx.textAlign = "start";
   ctx.fillStyle = "red";
  ctx.font = "40px Comic Sans MS";
  ctx.fillText("Game Over ",60,80);
 }
function GameOver() {
  write();
  window.open("firstPagee.html", "_self");
  return setInterval(GameOver,30);
}
function drawnextlevel()
{
ctx.fillStyle = ballcolor;
    clear();
  
    circle(x,y,8);
    //drawScore(score);
    if(rightDown) wallPos += 5;

    if(leftDown) wallPos -=5;
    
    
    ctx.fillStyle = backcolor;
     rect(wallPos,height-wallHei,wallWid,wallHei);
     ctx.fillStyle = paddlecolor;
       //draw bricks
 
  drawbricks();
  
 text("Score : " + Math.floor(score),"15px Comic Sans MS",0,140,"white");
 score +=1/100;
 //if(Math.floor(score) == 2){
 // clearInterval(interval);
 /*
  int = 12;
  //var interval = setInterval(draw,10);
  //changeTimer();
  
  ctx.fillStyle= "white";
  ctx.fillRect(0, 0, width, height)
 interval = setInterval(draw, int)*/
// write2();
 
  //setInterval(draw,int);

 //}
  //have we hit a brick?
  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y/rowheight);
  col = Math.floor(x/colwidth);
  //if so, reverse the ball and mark the brick as broken
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
    dy = -dy;
    bricks[row][col] = 0;
    audio2.play();
      }  
    
      
  
    if(x + dx > width || x + dx < 0 ) 
    dx = -dx;
    if(y + dy < 0)
    dy = -dy;
    else if (y + dy > height){
    if(x > wallPos && x < wallWid + wallPos){
    dy = -dy; 
    audio.play();}
        else     {
          clearInterval(interval);
          
          ctx.fillStyle= "white";
          ctx.fillRect(0, 0, width, height)
         GameOver();
          
          return
          //ctx.fillRect(0, 0, width, height)
          //ctx.font = "40px Arial";
          //ctx.fillText("you lost try again",0,0);
          /*ctx.fillStyle = "black";
          ctx.fillRect(0, 0, width, height);
          ctx.font = "40px Arial";
          ctx.fillText("you lost try again",1000,1000);*/
     
         //clearInterval(intervalId);
         //app.stage.removeChild(knife);
         //GameOver();
             
        //window.close();
        //app.clear();
    //clearInterval(init);
      
        }
      
    }
    
   
   
    //alert("you lost Try again");
    x += dx;
    y += dy;

}

init();
init_wall();
initbricks();