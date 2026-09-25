// Floating petals
const petalField = document.getElementById('petals');
const petalGlyphs = ['🌸', '🤍', '🌿', '✨'];
const petalCount = window.innerWidth < 700 ? 12 : 22;

for (let i = 0; i < petalCount; i++) {
  const petal = document.createElement('span');
  petal.className = 'petal';
  petal.textContent = petalGlyphs[Math.floor(Math.random() * petalGlyphs.length)];
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.fontSize = 14 + Math.random() * 16 + 'px';
  petal.style.animationDuration = 10 + Math.random() * 14 + 's';
  petal.style.animationDelay = Math.random() * 10 + 's';
  petalField.appendChild(petal);
}

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => io.observe(el));

// Image fallback placeholders
document.querySelectorAll('.gallery img').forEach((img) => {
  img.addEventListener('error', () => {
    const figure = img.closest('figure');
    const filename = img.getAttribute('data-filename') || img.src.split('/').pop();
    const caption = img.getAttribute('data-caption') || '';
    figure.innerHTML = `
      <div class="placeholder">
        <span class="icon">🤍</span>
        <span class="label">Add <code>${filename}</code><br>to the images folder</span>
      </div>
      <figcaption>${caption}</figcaption>
    `;
  }, { once: true });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCap = lightbox.querySelector('.lightbox-cap');

document.querySelectorAll('.gallery figure').forEach((figure) => {
  figure.addEventListener('click', () => {
    const img = figure.querySelector('img');
    if (!img || !img.complete || img.naturalWidth === 0) return;
    lightboxImg.src = img.src;
    lightboxCap.textContent = img.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Heart button
const heartBtn = document.getElementById('heart-btn');
if (heartBtn) {
  heartBtn.addEventListener('click', () => {
    for (let i = 0; i < 24; i++) {
      const heart = document.createElement('span');
      heart.textContent = ['💚', '🤍', '💛', '✨'][Math.floor(Math.random() * 4)];
      heart.style.position = 'fixed';
      heart.style.left = '50%';
      heart.style.bottom = '10%';
      heart.style.fontSize = 18 + Math.random() * 20 + 'px';
      heart.style.transform = `translateX(${(Math.random() - 0.5) * 400}px)`;
      heart.style.transition = 'transform 1.8s ease-out, opacity 1.8s ease-out';
      heart.style.zIndex = 60;
      heart.style.pointerEvents = 'none';
      document.body.appendChild(heart);
      requestAnimationFrame(() => {
        heart.style.transform += ' translateY(-70vh) rotate(' + (Math.random() * 60 - 30) + 'deg)';
        heart.style.opacity = '0';
      });
      setTimeout(() => heart.remove(), 1900);
    }
  });
}
