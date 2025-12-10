import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;

  // Spotlight effect tracking mouse
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;

    root.style.setProperty('--spotlight-x', `${x}%`);
    root.style.setProperty('--spotlight-y', `${y}%`);
  });

  // Optional: Add simple particle background (kept from previous version but adjusted)
  createParticles();
});

function createParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '0'; // Behind everything
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.2; // Slower movement
      this.vy = (Math.random() - 0.5) * 0.2;
      this.size = Math.random() * 2;
      this.alpha = Math.random() * 0.3; // Lower opacity
      this.fade = (Math.random() * 0.005) + 0.002;
      this.growing = true;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.growing) {
        this.alpha += this.fade;
        if (this.alpha >= 0.5) this.growing = false;
      } else {
        this.alpha -= this.fade;
        if (this.alpha <= 0) this.reset();
      }

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.fillStyle = `rgba(230, 185, 166, ${this.alpha})`; // Rose Gold particles
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < 40; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animate);
  }

  animate();
}
