
const display = document.querySelector('#my-canvas');

display.width = window.innerWidth;
display.height = window.innerHeight;

const ctx = display.getContext('2d');

let myCircles = [];

const mouse = {
    x: undefined,
    y: undefined
}

const colorList = ['#e63946', '#f1faee', '#a8dadc', '#457b9d', '#1d3557']

display.addEventListener('mouseout', () => {
    mouse.x = undefined;
    mouse.y = undefined;
    console.log('mouseOut')
})

window.addEventListener('resize', () => {
    display.width = window.innerWidth - 2;
    display.height = window.innerHeight - 2;
    init();
})

window.addEventListener('mousemove', evt => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    // console.log(mouse);
})



 /* circle class */

class Circle {

    // minRadius = 10;
    maxRadius = 50;

    constructor() {
        this.radius = Math.floor(Math.random() * 10) + 1;
        this.x = Math.floor(Math.random() * (display.width - this.radius * 2)) + this.radius;
        this.y = Math.floor(Math.random() * (display.height - this.radius * 2)) + this.radius;
        this.dx = (Math.random() - 0.5) ;
        this.dy = (Math.random() - 0.5) ;
        this.color = colorList[Math.floor(Math.random() * colorList.length)];
        this.minRadius = Math.floor(Math.random() * 10) + 1;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = '#fff'
        ctx.stroke();
    }

    bounce() {

        if (this.x + this.radius > display.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > display.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

    }
    grow() {
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius <= this.maxRadius) {
                this.radius += 3;
            }

        }
        else {
            if (this.radius >= this.minRadius) {
                this.radius -= 1;
                // mouse.x = undefined;
                // mouse.y = undefined;
            }

        }

    }
}

/* default initialization */
for (let i = 0; i < 2000; i++) {
    myCircles.push(new Circle());
}
for (let circle of myCircles) {
    circle.draw();
}

/* initializing circle whenever window has been resize */

function init(){
    myCircles = [];

    for (let i = 0; i < 2000; i++) {
        myCircles.push(new Circle());
    }
    for (let circle of myCircles) {
        circle.draw();
    }
    
}


/* ||********************|| */

function animation() {
    const animationId = requestAnimationFrame(animation);
    ctx.clearRect(0, 0, display.width, display.height);


    for (let circle of myCircles) {

        circle.grow();
        circle.bounce();
        circle.draw();
    }

    // setTimeout(()=>{
    //     cancelAnimationFrame(animationId);
    // })

}
animation()




