let particles = [];
let palette = [
  [244, 152, 152],   // rojo
  [24, 132, 196],   // verde

];

function setup() {
  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i <300; i++) {
    let col = random(palette);
    particles.push({
      x: random(width),
      y: random(height),
      vx: random(-0.3, 0.3),
      vy: random(-0.3, 0.3),
      rBase: random(1, 3),
      r: random(1, 3),
      growing: random([true, false]),
      speed: random(0.02, 0.08),
      color: col
    });
  }
}

function draw() {
  background(47, 65, 89);

  for (let p of particles) {
    // Movimiento normal
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > width) p.vx *= -1;
    if (p.y < 0 || p.y > height) p.vy *= -1;

    // Crecimiento aleatorio
    if (p.growing) {
      p.r += p.speed;
      if (p.r > p.rBase * 2) p.growing = false;
    } else {
      p.r -= p.speed;
      if (p.r < p.rBase / 2) p.growing = true;
    }

    // ===== Interacción con ratón: repulsión =====
    let dx = p.x - mouseX;
    let dy = p.y - mouseY;
    let d = dist(p.x, p.y, mouseX, mouseY);

    if (d < 100) { // rango de repulsión
      let force = (100 - d) / 10; // fuerza proporcional a la cercanía
      p.vx += (dx / d) * force;
      p.vy += (dy / d) * force;
    }

    // Opcional: limitar velocidad máxima
    let maxSpeed = 0.5;
    p.vx = constrain(p.vx, -maxSpeed, maxSpeed);
    p.vy = constrain(p.vy, -maxSpeed, maxSpeed);

   
  

noStroke();
    fill(p.color[0], p.color[1], 150,120); // 150 = transparencia color, 120 = transparencia particula
    circle(p.x, p.y, p.r * 2);
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
