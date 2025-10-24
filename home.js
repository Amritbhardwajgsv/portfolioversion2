/* ---------- Mobile toggle ---------- */
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle?.addEventListener('click', () => {
  const shown = navMenu.style.display === 'flex';
  navMenu.style.display = shown ? 'none' : 'flex';
  navMenu.style.flexDirection = 'column';
  navMenu.style.gap = '0.75rem';
});

/* ---------- Typing headline ---------- */
const typingEl = document.getElementById('typingText');
const phrases = [
  "Competitive programmer • C++ & Python",
  "Full-stack & ML tinkerer",
  "Designing practical ML systems and prototypes"
];
let ph = 0, pos = 0, forward = true;

(function typeLoop(){
  if(!typingEl) return;
  const cur = phrases[ph];
  typingEl.textContent = cur.slice(0, pos) + (Date.now() % 800 < 400 ? '|' : '');
  if(forward) {
    pos++;
    if(pos > cur.length) { forward = false; setTimeout(typeLoop, 900); return; }
  } else {
    pos--;
    if(pos < 0) { forward = true; ph = (ph+1) % phrases.length; pos = 0; setTimeout(typeLoop, 300); return; }
  }
  setTimeout(typeLoop, forward ? 45 : 22);
})();

/* ---------- Counters (animate when visible) ---------- */
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      const el = entry.target;
      const parent = el.closest('.stat-card');
      const targetVal = parseFloat(parent?.dataset.count || el.dataset.count || 0);
      const duration = 900;
      const start = performance.now();
      function tick(now){
        const t = Math.min(1, (now - start) / duration);
        // ease-out
        const val = targetVal * (1 - Math.pow(1 - t, 3));
        el.textContent = (targetVal % 1 === 0) ? Math.floor(val) : (Math.round(val * 100) / 100);
        if(t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    }
  });
}, {threshold:0.6});

counters.forEach(c => counterObserver.observe(c));

/* ---------- Skill bars ---------- */
const skillEls = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      skillEls.forEach(el=>{
        const w = el.dataset.width || 60;
        el.style.width = w + '%';
      });
      skillObserver.disconnect();
    }
  });
},{threshold:0.25});
const aboutCard = document.querySelector('.about-card');
if(aboutCard) skillObserver.observe(aboutCard);

/* ---------- Contact form (mailto) ---------- */
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const email = encodeURIComponent(document.getElementById('emailField').value.trim());
    const message = encodeURIComponent(document.getElementById('message').value.trim());
    const to = 'amritbharadwaj4@gmail.com'; // replace if needed
    const subject = encodeURIComponent(`Website message from ${name}`);
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
}

/* ---------- Scroll to top button ---------- */
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
  if(window.scrollY > 400) scrollBtn.style.display = 'block';
  else scrollBtn.style.display = 'none';

  // header shadow on scroll
  const header = document.getElementById('siteHeader');
  if(header) header.classList.toggle('scrolled', window.scrollY > 30);

  // update active nav link
  document.querySelectorAll('.nav-link').forEach(link => {
    const id = link.getAttribute('href')?.replace('#','');
    if(!id) return;
    const section = document.getElementById(id);
    if(!section) return;
    const rect = section.getBoundingClientRect();
    if(rect.top <= 120 && rect.bottom >= 120) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
});

scrollBtn?.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));

/* ---------- Accessibility: keyboard skip to content (nice upgrade) ---------- */
/* You can add <a class="skip" href="#home">Skip to content</a> in the header if wanted. */

/* ---------- Small improvement: close mobile nav on link click ---------- */
document.querySelectorAll('#navMenu a').forEach(a=>{
  a.addEventListener('click', ()=> {
    if(window.innerWidth <= 780) navMenu.style.display = 'none';
  });
});
