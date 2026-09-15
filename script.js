(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvas = document.getElementById('starfield');
  const ctx = canvas?.getContext('2d');
  let stars = [];
  let raf = null;

  function resize() {
    if (!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(innerWidth * dpr);
    canvas.height = Math.floor(innerHeight * dpr);
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.min(170, Math.floor((innerWidth * innerHeight) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: Math.random() * 1.15 + .2,
      a: Math.random() * .55 + .16,
      s: Math.random() * .12 + .02,
    }));
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    for (const star of stars) {
      ctx.beginPath();
      ctx.fillStyle = `rgba(130, 198, 255, ${star.a})`;
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fill();
      if (!reduceMotion) {
        star.y += star.s;
        if (star.y > innerHeight + 4) { star.y = -4; star.x = Math.random() * innerWidth; }
      }
    }
    if (!reduceMotion) raf = requestAnimationFrame(draw);
  }

  if (canvas && ctx) {
    resize();
    draw();
    addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw(); }, { passive: true });
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-button');
  menu?.addEventListener('click', () => {
    const open = header.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => {
    header?.classList.remove('open');
    menu?.setAttribute('aria-expanded', 'false');
  }));

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
