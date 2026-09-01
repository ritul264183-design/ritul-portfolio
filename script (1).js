/* ==========================================================================
   RITUL KUMAR — PORTFOLIO SCRIPT
   Handles: background circuit canvas, terminal typing effect, nav behavior,
   scroll reveal, FAQ accordion, contact form (static/demo), placeholder
   link warnings, back-to-top.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- 1. Circuit / node background canvas ---------------- */
  (function initCanvas(){
    const canvas = document.getElementById('bg-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, nodes;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function resize(){
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }

    function createNodes(){
      const count = Math.min(70, Math.floor((w * h) / 24000));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.8
      }));
    }

    function step(){
      ctx.clearRect(0, 0, w, h);
      const maxDist = 140;

      for(let i = 0; i < nodes.length; i++){
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        if(n.x < 0 || n.x > w) n.vx *= -1;
        if(n.y < 0 || n.y > h) n.vy *= -1;

        for(let j = i + 1; j < nodes.length; j++){
          const o = nodes[j];
          const dx = n.x - o.x, dy = n.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if(dist < maxDist){
            const alpha = (1 - dist / maxDist) * 0.16;
            ctx.strokeStyle = `rgba(139, 130, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(o.x, o.y);
            ctx.stroke();
          }
        }
      }

      for(const n of nodes){
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(163, 178, 255, 0.55)';
        ctx.fill();
      }

      if(!prefersReducedMotion) requestAnimationFrame(step);
    }

    resize();
    createNodes();
    step();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => { resize(); createNodes(); if(prefersReducedMotion) step(); }, 200);
    });
  })();

  /* ---------------- 2. Terminal typing effect (hero signature) ---------------- */
  (function initTypewriter(){
    const el = document.getElementById('typed-line');
    if(!el) return;
    const lines = [
      '> initializing curiosity_engine...',
      '> loading imagination.exe',
      '> compiling ideas → reality',
      '> status: still learning, still building'
    ];
    let lineIndex = 0, charIndex = 0, deleting = false;

    function tick(){
      const current = lines[lineIndex];
      if(!deleting){
        el.textContent = current.slice(0, charIndex + 1);
        charIndex++;
        if(charIndex === current.length){
          deleting = true;
          setTimeout(tick, 1600);
          return;
        }
      } else {
        el.textContent = current.slice(0, charIndex - 1);
        charIndex--;
        if(charIndex === 0){
          deleting = false;
          lineIndex = (lineIndex + 1) % lines.length;
        }
      }
      setTimeout(tick, deleting ? 22 : 42);
    }
    tick();
  })();

  /* ---------------- 3. Sticky nav: mobile toggle + scroll state ---------------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
    });
  });

  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 20 ? '0 8px 30px -14px rgba(0,0,0,.6)' : 'none';
  });

  /* ---------------- 4. Active nav link on scroll ---------------- */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

  sections.forEach(s => navObserver.observe(s));

  /* ---------------- 5. Scroll reveal ---------------- */
  const revealItems = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));

  /* ---------------- 6. FAQ accordion ---------------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        if(other !== item) other.classList.remove('open');
      });
      item.classList.toggle('open', !isOpen);
    });
  });

  /* ---------------- 7. Back to top ---------------- */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  });
  backToTop?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- 8. Placeholder link notices ---------------- */
  // These links are marked with data-placeholder-link because the corresponding
  // real URL (Facebook, LeetCode, some project repos) has not been provided yet.
  // Clicking them explains what to do instead of silently navigating to '#'.
  document.querySelectorAll('[data-placeholder-link]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.alert('This link is a placeholder. Add the real URL in index.html (look for the matching [ADD ...] text) to activate it.');
    });
  });

  /* ---------------- 9. Contact form (static demo, no backend) ---------------- */
  const form = document.getElementById('contact-form');
  const formNote = document.getElementById('form-note');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    formNote.innerHTML = 'This is a static site with no backend attached, so the message above was not actually sent. Please email <a href="mailto:ritul264183@gmail.com">ritul264183@gmail.com</a> directly, or connect this form to a service like Formspree — see the README for setup steps.';
    formNote.style.color = 'var(--purple-soft)';
  });

});
