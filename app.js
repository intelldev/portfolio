const menuButton = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  menuButton.setAttribute('aria-label', open ? 'Ouvrir le menu' : 'Fermer le menu');
  mobileMenu.hidden = open;
});

mobileMenu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.hidden = true;
  menuButton?.setAttribute('aria-expanded', 'false');
  menuButton?.setAttribute('aria-label', 'Ouvrir le menu');
}));

const lines = [
  'un site qui simplifie le choix.',
  'une marque que l’on reconnaît.',
  'des contenus qui restent cohérents.',
];
const rotatingLine = document.querySelector('#rotating-line');
let lineIndex = 0;

if (rotatingLine && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.setInterval(() => {
    lineIndex = (lineIndex + 1) % lines.length;
    rotatingLine.textContent = lines[lineIndex];
    rotatingLine.style.animation = 'none';
    requestAnimationFrame(() => { rotatingLine.style.animation = ''; });
  }, 3000);
}

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealElements = document.querySelectorAll('.reveal');
if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: 0.12 });
  revealElements.forEach((element) => observer.observe(element));
}

const form = document.querySelector('#brief-form');
const errorBox = document.querySelector('#form-error');
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name');
  const email = document.querySelector('#email');
  const company = document.querySelector('#company');
  const service = document.querySelector('#service');
  const message = document.querySelector('#message');
  const fields = [name, email, message];
  fields.forEach((field) => field.removeAttribute('aria-invalid'));

  const issue = !name.value.trim() || name.value.trim().length < 2
    ? 'Indiquez votre nom.'
    : !/^\S+@\S+\.\S+$/.test(email.value.trim())
      ? 'Indiquez une adresse e-mail valide.'
      : message.value.trim().length < 10
        ? 'Ajoutez quelques détails sur votre projet.'
        : '';

  if (issue) {
    errorBox.textContent = issue;
    errorBox.hidden = false;
    if (!name.value.trim() || name.value.trim().length < 2) name.setAttribute('aria-invalid', 'true');
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) email.setAttribute('aria-invalid', 'true');
    if (message.value.trim().length < 10) message.setAttribute('aria-invalid', 'true');
    return;
  }

  errorBox.hidden = true;
  form.submit();
});

document.querySelector('#year').textContent = new Date().getFullYear();
