// canvas setup

const canvas = document.getElementById('canvas1');
const cxt = canvas.getContext('2d');
canvas.height = 500;
canvas.width = 800;

let score = 0;
let gameFrame = 0;
cxt.font = '50px Georgia';

// Mouse interactivity
let canvasPosition = canvas.getBoundingClientRect()
const mouse = {
    x : canvas.width/2,
    y : canvas.height/2,
    click : false
}

canvas.addEventListener('mousedown',function(event){
    mouse.click = true;
    mouse.x = event.x - canvasPosition.left ;
    mouse.y = event.y - canvasPosition.top ;

})
canvas.addEventListener('mouseup',function(event){
    mouse.click = false;

})

// Game Over

function gameOver(){
    score = 0
    cxt.fillStyle = 'black';
    cxt.fillText("Game over", canvas.width / 3, canvas.height - 410 );
}

//  Player

class Player{
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 50;
        this.angle = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.frame = 0;
        this.spriteHeight = 327;
        this.spriteWidth = 498;
    }
    update(){
        const dx =  this.x - mouse.x;
        const dy = this.y - mouse.y;
        if(mouse.x != this.x){
            this.x = this.x - dx/10;
        }
        if(mouse.y != this.y){
            this.y = this.y - dy/10;
        }
        if(this.x > 750){
            gameOver(); // right touch
            return ;
            
        }
        // console.log('return stop test')
        if(this.y > 450){
            gameOver();// bottom touch
            return;

        }
        if(this.x + canvas.height < 550){
            gameOver(); // left touch
            return;
        }
        
    }
    draw(){
        if(mouse.click){
            cxt.lineWidth = 0.2;
            cxt.beginPath();
            cxt.moveTo(this.x , this.y);
            cxt.lineTo(mouse.x , mouse.y);
            cxt.stroke(); 
        }
        cxt.fillStyle = 'red';
        cxt.beginPath();
        cxt.arc(this.x, this.y , this.radius , 0 , Math.PI * 2);
        cxt.fill();
        cxt.closePath();
        cxt.fillRect(this.x , this.y , this.radius , 10)
        }
        
}

const player = new Player()



// Bubbles

const bubblesArray = [];
class Bubbles{
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y =  canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 10 + 1;
        this.distance;
        this.counted = false;
    }
    update(){
        this.y -= this.speed;
        const dx = this.x  - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy);
    }
    draw(){
        cxt.fillStyle = 'blue';
        cxt.beginPath();
        cxt.arc(this.x, this.y , this.radius , 0 , Math.PI * 2);
        cxt.fill();
        cxt.closePath();
        cxt.stroke();
        }

}

function handleBubbles(){
    if(gameFrame % 50 == 0){
        bubblesArray.push(new Bubbles())
    }
    for(let i = 0 ; i < bubblesArray.length ; i++){
        bubblesArray[i].update();
        bubblesArray[i].draw();
    }
    for(let i = 0 ; i < bubblesArray.length ; i++){
        if(bubblesArray[i].y < 0 - bubblesArray[i].radius *2 ){
            bubblesArray.splice(i,1)
        }
        
        if(bubblesArray[i].distance < bubblesArray[i].radius + player.radius){
            if(!bubblesArray[i].counted){
                score++;
                bubblesArray[i].counted = true;
                bubblesArray.splice(i,1);
            }
        }
        
    }
    
}

// Animation Loop

function animate(){
    cxt.clearRect(0,0,canvas.width,canvas.height)
    handleBubbles();
    player.update();
    player.draw();
    // gameOver()
    cxt.fillStyle = 'black';
    cxt.fillText('score: ' + score , 10 ,50);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate()