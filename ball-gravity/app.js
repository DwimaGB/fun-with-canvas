
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.4;
const friction = 0.8;

function Ball(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx
    this.radius = radius;
    this.color = color;

}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.fillStyle = this.color;
    ctx.fill();
}

Ball.prototype.gravity = function () {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
        this.dx = -this.dx;
    }

    if (this.y + this.radius + this.dy > canvas.height) {
        this.dy = -this.dy*friction;
        console.log(this.dy);
    }
    else {
        this.dy += gravity;
        // console.log(this.dy);
    }
    this.y += this.dy;
    this.x += this.dx;
    // console.log(this.y);
}

// const ball = new Ball(canvas.width / 2, canvas.height / 2, 1, 30, '#fff');

let balls;

window.addEventListener('click', () => {
    init();
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function init() {
    balls = []
    for (let i = 0; i < 100; i++) {
        let radius = Math.floor(Math.random() * 6) + 25;
        let x = Math.floor(Math.random() * (canvas.width - radius * 2) + radius) + 1;
        let y = Math.floor(Math.random() * (canvas.height - radius * 5) + radius) + 1;
        let dx = randomMinMaxNumber(-2, 2);
        balls.push(new Ball(x, y, dx, 2, radius, '#fff'));
    }
}

function randomMinMaxNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function animation() {
    

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    balls.forEach(ball => {
        ball.draw();
        ball.gravity();
    })

    requestAnimationFrame(animation);

}

init();
animation();

console.log("hi");