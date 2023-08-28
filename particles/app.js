const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}
let deg = 0;
let particles = [];

class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width + 1;
        // this.y = Math.random() * canvas.height + 1;
        this.dx = Math.random() * 3 - 1.5;
        this.dy = Math.random() * 3 - 1.5;
        this.radius = Math.floor(Math.random() * 3) + 1;
        this.color = `hsl(${deg}, 100%, 50%)`;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    update() {

        this.radius -= 0.01;

        this.x += this.dx;
        this.y += this.dy;
    }
}

window.addEventListener('click', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    for (let i = 0; i < 30; i++) {
        particles.push(new Particle());
    }
    init();
})

window.addEventListener('mousemove', (evt) => {
    mouse.x = evt.x;
    mouse.y = evt.y;
    for (let i = 0; i < 9; i++) {
        particles.push(new Particle());
    }
    // init();
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

function init() {

    for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
        if (particles[i].radius < 0.2) {
            particles.splice(i, 1);
            i--;
            // console.log(particles.length);
        }
        
    }
}

function animation() {
    if (deg > 360) {
        deg = 2;
    }
    // console.log(deg);
    deg += 1;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    init();

    requestAnimationFrame(animation);
}
animation();