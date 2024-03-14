var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");
c.fillStyle="white";
c.fillRect(10,10,50,50);
c.fillStyle="grey";
c.fillRect(65,10,50,50);
c.fillStyle="black";
c.fillRect(120,10,50,50);
c.fillStyle="green";
c.fillRect(175,10,50,50);

console.log(canvas);

//drawing lines
c.beginPath();
c.moveTo(10,70);
c.lineTo(225,70);
c.lineTo(225,285);
c.lineTo(10,285);
c.lineTo(10,70);
c.strokeStyle="blue";
c.stroke();

//drawing arcs/circles
// c.beginPath();
// c.arc(60,340,50,0,2*Math.PI);
// c.strokeStyle="yellow";
// c.stroke();


// for(var i =0 ; i< 3; i++){
//     var x = Math.random()*window.innerHeight;
//     var y = Math.random()*window.innerWidth;
//     c.beginPath();
//     c.arc(x,y,50,0,2*Math.PI);
//     // var r = Math.floor(Math.random()*255);
//     // var g = Math.floor(Math.random()*255);
//     // var b = Math.floor(Math.random()*255);
//     // var color = rgb(r,g,b);
//     // console.log(r);
//     c.lineWidth = 3;
//     c.strokeStyle='blue';
//     c.stroke();
// }


//animating

var mouse = {
    x: undefined,
    y: undefined,
}

var maxRadius = 40;
var minRadius = 3;

var colorArray = ['#240A34','#891652','#EABE6C','#FFEDD8'];

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(event);
})

function Circle(x, y, dx, dy, radius){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];

    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,2*Math.PI);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth){
            this.dx = -this.dx;
        }
        if(this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x = this.x + this.dx;//it determines the movement speed
        this.y = this.y + this.dy;

        //interactivity
        if(mouse.x-this.x<50 && mouse.x - this.x >-50
            && mouse.y - this.y<50 && mouse.y - this.y>-50){
                if(this.radius < maxRadius){
                    this.radius += 1;
                }
            }else if(this.radius >minRadius){
                this.radius -=1;
            }
        this.draw();
    }

}

var circleArray = [];
for(var i = 0 ; i<2000; i++){
    var x = Math.random()*(innerWidth - 2*radius) + radius;
    var y = Math.random()*(innerWidth - 2*radius) + radius;
    var dx = Math.random()*0.5;
    var dy = Math.random()*0.5;
    var radius = 50;
    circleArray.push(new Circle(x,y,dx,dy,radius));
}
// console.log(circleArray);


function anime(){
    requestAnimationFrame(anime);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i = 0; i<circleArray.length; i++){
        circleArray[i].update();
    }
    
}

anime();