// Smooth scroll for navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Obrigado pelo seu contato! Em breve responderemos.');
    contactForm.reset();
  });
  // Input focus effect
  contactForm.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', e => {
      e.target.style.borderColor = '#1976d2';
      e.target.style.boxShadow = '0 0 0 2px #e3eafc';
    });
    input.addEventListener('blur', e => {
      e.target.style.borderColor = '';
      e.target.style.boxShadow = '';
    });
  });
}

// Carousel for testimonials
(function() {
  const track = document.querySelector('.carousel-track');
  const items = Array.from(document.querySelectorAll('.carousel-item'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  let current = 0;
  let interval;

  function showItem(idx) {
    items.forEach((item, i) => {
      item.setAttribute('aria-hidden', i !== idx);
      item.classList.remove('slide-in');
      if (i === idx) {
        setTimeout(() => item.classList.add('slide-in'), 10);
      }
    });
    current = idx;
  }

  function next() {
    showItem((current + 1) % items.length);
  }

  function prev() {
    showItem((current - 1 + items.length) % items.length);
  }

  function startAuto() {
    interval = setInterval(next, 5000);
  }

  function stopAuto() {
    clearInterval(interval);
  }

  if (track && items.length > 1) {
    showItem(0);
    startAuto();
    nextBtn.addEventListener('click', () => {
      stopAuto();
      next();
      startAuto();
    });
    prevBtn.addEventListener('click', () => {
      stopAuto();
      prev();
      startAuto();
    });
    track.addEventListener('mouseenter', stopAuto);
    track.addEventListener('mouseleave', startAuto);
  }
})();

// Add slide-in animation for carousel
const style = document.createElement('style');
style.innerHTML = `
  .carousel-item.slide-in {
    animation: slideIn 0.6s cubic-bezier(.4,1.4,.6,1) both;
  }
  @keyframes slideIn {
    0% { opacity: 0; transform: translateX(40px) scale(0.97); }
    100% { opacity: 1; transform: translateX(0) scale(1); }
  }
`;
document.head.appendChild(style);

// Animated counters for stats
function animateCounter(id, end, duration) {
  const el = document.getElementById(id);
  if (!el) return;
  let start = 0;
  const isHours = typeof end === 'string';
  if (isHours) {
    el.textContent = end;
    return;
  }
  const step = Math.ceil(end / (duration / 20));
  function update() {
    start += step;
    if (start >= end) {
      el.textContent = end + '+';
    } else {
      el.textContent = start + '+';
      setTimeout(update, 20);
    }
  }
  update();
}

let statsAnimated = false;
function handleStatsAnimation() {
  const stats = document.querySelector('.stats-section');
  if (!stats) return;
  const rect = stats.getBoundingClientRect();
  if (!statsAnimated && rect.top < window.innerHeight - 100) {
    animateCounter('yearsExp', 10, 800);
    animateCounter('projectsDone', 250, 1200);
    animateCounter('clientsSat', 180, 1000);
    animateCounter('serviceHours', '08h - 18h', 0);
    statsAnimated = true;
  }
}
window.addEventListener('scroll', handleStatsAnimation);
handleStatsAnimation();

// Highlight nav on scroll
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
});

// Scroll-to-top button
let scrollBtn = document.getElementById('scrollToTopBtn');
if (!scrollBtn) {
  scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollToTopBtn';
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.style.position = 'fixed';
  scrollBtn.style.bottom = '32px';
  scrollBtn.style.right = '32px';
  scrollBtn.style.display = 'none';
  scrollBtn.style.background = '#1976d2';
  scrollBtn.style.color = '#fff';
  scrollBtn.style.border = 'none';
  scrollBtn.style.borderRadius = '50%';
  scrollBtn.style.width = '48px';
  scrollBtn.style.height = '48px';
  scrollBtn.style.fontSize = '1.5rem';
  scrollBtn.style.boxShadow = '0 2px 8px rgba(25,118,210,0.13)';
  scrollBtn.style.cursor = 'pointer';
  scrollBtn.style.zIndex = '999';
  document.body.appendChild(scrollBtn);
}
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
});
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}); 