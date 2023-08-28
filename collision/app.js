
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined
}

let collided = false;

class Particle {

    constructor(x, y, radius, color = '#ddd') {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 2 ,
            y: (Math.random() - 0.5) * 2
        }
        this.mass = 1;

    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        // ctx.strokeStyle = this.color;
        // ctx.stroke();
        ctx.fillStyle = '#ccc';
        ctx.fill();
    }

    line(particles) {
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) {
                continue;
            }
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particles[i].x, particles[i].y);
            ctx.lineWidth = 0.1;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
            
        }

    }

    update(particles) {
        // console.log(particles);
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) {
                continue;
            }
            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 <= 0) {
                resolveCollision(this, particles[i]);
            }
        }

        


        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

window.addEventListener('mousemove', evt => {
    mouse.x = evt.x;
    mouse.y = evt.y;
})

let particles;
const colors = ['red', 'blue'];

function init() {
    particles = [];

    for (let i = 0; i < 20; i++) {
        let radius = 20;
        let x = randomNum(radius, canvas.width - radius);
        let y = randomNum(radius, canvas.height - radius);
        let color = colors[Math.floor(Math.random()*2)];

        if (i > 0) {
            let overlapping = true;
            while (overlapping) {
                overlapping = false;
                for (let j = 0; j < particles.length; j++) {
                    if (distance(x, y, particles[j].x, particles[j].y) - radius * 2 <= 0) {
                        overlapping = true;
                        x = randomNum(radius, canvas.width - radius);
                        y = randomNum(radius, canvas.height - radius);
                        break;
                    }
                }
            }

        }
        particles.push(new Particle(x, y, radius, color));
    }

}

function main() {
    const id = requestAnimationFrame(main);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // particles[1].x = mouse.x;
    // particles[1].y = mouse.y;
    for (let particle of particles) {
        particle.draw();
        // particle.line(particles);
        particle.update(particles);
    }
   
}
init();
main();


/* Utility functions */

function rotate(velocity, angle) {
    const rotatedVelocity = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    }
    return rotatedVelocity;
}

function resolveCollision(particle, otherParticle) {

    // const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);
    const angle = -Math.atan2(particle.y - otherParticle.y, particle.x - otherParticle.x);

    console.log((angle * 180)/Math.PI);


    const u1 = rotate(particle.velocity, angle);
    const u2 = rotate(otherParticle.velocity, angle);

    const m1 = particle.mass;
    const m2 = particle.mass;

    const v1 = {
        x: (u1.x * (m1 - m2) + 2 * m2 * u2.x) / (m1 + m2), y: u1.y,
    }
    const v2 = {
        x: (u2.x * (m2 - m1) + 2 * m1 * u1.x) / (m1 + m2), y: u2.y
    }

    const vFinal1 = rotate(v1, -angle);
    const vFinal2 = rotate(v2, -angle);


    particle.velocity.x = vFinal1.x;
    particle.velocity.y = vFinal1.y;

    otherParticle.velocity.x = vFinal2.x;
    otherParticle.velocity.y = vFinal2.y;
}




function randomNum(min, max) {
    return Math.random() * (max - min) + min;
}

function distance(x1, y1, x2, y2) {
    let dx = x1 - x2;
    let dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
}