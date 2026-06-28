/* ─────────────────────────────────────────────
   Particle network — matcha palette, mouse-reactive
───────────────────────────────────────────── */
const canvas = document.getElementById("bg");
const ctx    = canvas.getContext("2d");

const NUM      = 55;
const MAX_DIST = 140;
const MOUSE_R  = 180;
const C        = "138,171,92";   /* matcha */

let particles = [];
let mouse     = { x: null, y: null };

function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

window.addEventListener("mousemove", e => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

for (let i = 0; i < NUM; i++) {
  particles.push({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r:  Math.random() * 1.2 + 0.8
  });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < NUM; i++) {
    for (let j = i + 1; j < NUM; j++) {
      const dx   = particles[i].x - particles[j].x;
      const dy   = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MAX_DIST) {
        const a = (1 - dist / MAX_DIST) * 0.28;
        ctx.strokeStyle = `rgba(${C},${a})`;
        ctx.lineWidth   = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  for (const p of particles) {
    if (mouse.x !== null) {
      const dx   = mouse.x - p.x;
      const dy   = mouse.y - p.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < MOUSE_R) {
        const f = (1 - dist / MOUSE_R) * 0.01;
        p.vx += dx * f;
        p.vy += dy * f;
      }
    }
    const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
    if (spd > 1.4) { p.vx = p.vx/spd*1.4; p.vy = p.vy/spd*1.4; }
    p.vx *= 0.997; p.vy *= 0.997;
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(${C},0.45)`;
    ctx.fill();
  }

  requestAnimationFrame(draw);
}
draw();

/* ─────────────────────────────────────────────
   Scroll reveal
───────────────────────────────────────────── */
const revealEls = document.querySelectorAll(".reveal");
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add("visible");
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObs.observe(el));

/* ─────────────────────────────────────────────
   Navbar: scroll state + active link
───────────────────────────────────────────── */
const navbar  = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar ul a");
const sections = document.querySelectorAll("section[id], footer[id]");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });

const activeObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.remove("active"));
      const match = document.querySelector(`.navbar ul a[href="#${e.target.id}"]`);
      if (match) match.classList.add("active");
    }
  });
}, { rootMargin: "-40% 0px -55% 0px" });

sections.forEach(s => activeObs.observe(s));
