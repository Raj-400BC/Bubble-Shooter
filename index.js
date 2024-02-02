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
    mouse.x = event.x - canvasPosition.left ;
    mouse.y = event.y - canvasPosition.top ;

})

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
        
    }
}

// Bubbles
// Animation Loop