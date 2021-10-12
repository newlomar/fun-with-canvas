const canvas = document.querySelector("[data-js='draw']");
const ctx = canvas.getContext('2d');

window.addEventListener('click', () => {
  const h1 = document.querySelector('h1');
  h1.style.display = 'none';
})
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeSyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 100

let isDrawing = false;

let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(event) {

  if (!isDrawing) return; // faz a função ser encerrada quando o botão do mouse não está clicado

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY); // começa daqui
  ctx.lineTo(event.offsetX, event.offsetY); // vai ate aqui
  ctx.stroke();
  
  [lastX, lastY] = [event.offsetX, event.offsetY];
  
  hue++;

  if (hue >= 360) {
    hue = 0;
  }
  
  if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
    direction = !direction
  }

  if(direction) {
    ctx.lineWidth++;
  }
  else {
    ctx.lineWidth-- ;
  }
  
}

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;

  [lastX, lastY] = [event.offsetX, event.offsetY];

});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);