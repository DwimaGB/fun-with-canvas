
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove', (evt)=>{
    mouse.x = evt.x;
    mouse.y = evt.y;
    draw();
})

window.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    // ctx.moveTo(mouse.x, mouse.y)
})

function draw(){
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 10, 0, 2*Math.PI, false);
    ctx.fillStyle = 'red';
    ctx.fill();
}

