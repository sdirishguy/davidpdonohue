/* davidpdonohue/script.js */

// Define languages and animations
const languages = [
  "Welcome", "Fáilte", "Bienvenido", "Bienvenue", "Benvenuto", "Willkommen",
  "私の世界へようこそ", "欢迎来到我的世界"
];

const animations = [
  "typewriter", "bounceInLetter", "bounceInWord",
  "slideInRightLetter", "slideInRightWord",
  "rollInRightLetter", "rollInRightWord",
  "slideInLeftLetter", "slideInLeftWord"
];

let animationPool = [...animations];
let lastAnimClass = "";
let currentLangIndex = 0;

// Load content from JSON
async function loadContent() {
  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error('Failed to fetch content');

    const content = await response.json();
    const mainContent = content.main;

    // Navigation
    const logo = document.querySelector('.logo');
    if (logo) logo.textContent = mainContent.navigation.logo;

    // Hero
    const heroText = document.querySelector('#heroText');
    const heroDesc = document.querySelector('.hero-description');
    if (heroText) heroText.textContent = mainContent.hero.heading;
    if (heroDesc) heroDesc.textContent = mainContent.hero.description;

    // About Section
    const aboutTitle = document.querySelector('#about .section-title');
    const aboutCardsContainer = document.getElementById('aboutCardsContainer');
    if (aboutTitle) aboutTitle.textContent = mainContent.about.title;
    if (aboutCardsContainer) {
      aboutCardsContainer.innerHTML = '';
      Object.entries(mainContent.about.cards).forEach(([key, card]) => {
        aboutCardsContainer.insertAdjacentHTML('beforeend', `
          <div onclick="openModal('${key}')" class="card">
            <h3>${card.title}</h3>
            <p>${card.preview}</p>
          </div>
        `);
      });
    }

    // Projects Section
    const projectsTitle = document.querySelector('#projects .section-title');
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsTitle) projectsTitle.textContent = mainContent.projects.title;
    if (projectsGrid) {
      projectsGrid.innerHTML = '';
      mainContent.projects.items.forEach(project => {
        const extraLinksHTML = project.extraLinks
          ? `<div class="project-links">
               ${Object.entries(project.extraLinks).map(
                 ([label, url]) => `<a href="${url}" target="_blank">${label}</a>`
               ).join(' ')}
             </div>`
          : '';

        const cardHTML = project.link
          ? `<a href="${project.link}" target="_blank" class="project-item">
               <div class="${project.hasGradientWave ? 'gradient-wave' : ''}">
                 <h3>${project.title}</h3>
                 <p>${project.description}</p>
                 ${extraLinksHTML}
               </div>
             </a>`
          : `<div class="project-item">
               <h3>${project.title}</h3>
               <p>${project.description}</p>
               ${extraLinksHTML}
             </div>`;
        projectsGrid.insertAdjacentHTML('beforeend', cardHTML);
      });
    }

    // Contact
    const contact = mainContent.contact;
    document.querySelector('#contact .section-title').textContent = contact.title;
    document.querySelector('#contact .contact p').textContent = contact.description;
    document.querySelector('#contact .contact .btn').href = `mailto:${contact.email}`;

    // Footer
    document.querySelector('footer p').textContent = mainContent.footer?.copyright || '';
    document.querySelector('footer .social-links').innerHTML = `
      <a href="${contact.socialLinks.github}" target="_blank">GitHub</a>
      <a href="${contact.socialLinks.linkedin}" target="_blank">LinkedIn</a>
      <a href="mailto:${contact.socialLinks.email}">Email</a>
    `;
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

function updateHeroText(newText, animClass) {
  const heroText = document.getElementById("heroText");
  if (!heroText) return;

  heroText.innerHTML = "";

  if (animClass === "typewriter") {
    heroText.textContent = newText;
    heroText.classList.add("typewriter");
  } else {
    heroText.classList.remove("typewriter");
    const fragments = animClass.includes("Word") ? newText.split(" ") : [...newText];
    fragments.forEach((part, i) => {
      const span = document.createElement("span");
      span.textContent = part + (animClass.includes("Word") ? " " : "");
      span.style.animationDelay = `${i * (animClass.includes("Word") ? 0.2 : 0.1)}s`;
      span.classList.add(animClass);
      heroText.appendChild(span);
    });
  }
}

function changeLanguage() {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  const animClass = pickAnimation();
  updateHeroText(languages[currentLangIndex], animClass);
}

function pickAnimation() {
  if (animationPool.length === 0) animationPool = [...animations];
  let animClass;
  do {
    const index = Math.floor(Math.random() * animationPool.length);
    animClass = animationPool.splice(index, 1)[0];
  } while (animClass === lastAnimClass && animationPool.length > 1);
  lastAnimClass = animClass;
  return animClass;
}

// Modal Handling
async function openModal(contentId) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  const contentArea = modal.querySelector('.content-area');
  if (!modal || !modalTitle || !modalBody || !contentArea) return;

  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error('Failed to fetch content');
    const data = await response.json();
    const content = data.main.about.cards[contentId];
    if (!content) throw new Error(`Content not found for: ${contentId}`);

    modalTitle.textContent = content.title;

    if (contentId === 'resume') {
      modalBody.innerHTML = `
        <iframe 
          src="/resume-build/index.html"
          style="width: 95%; max-width: 1024px; height: 80vh; border: none; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.2); transition: transform 0.5s ease, opacity 0.5s ease;"
          class="resume-iframe"
          title="Resume Viewer"
        ></iframe>`;
    } else if (contentId === 'favorites') {
      const container = document.createElement('div');
      container.className = 'favorites-container';
      Object.entries(content.categories).forEach(([cat, items]) => {
        const section = document.createElement('div');
        section.className = 'favorites-category';
        section.innerHTML = `<h4 class="favorites-category-title">${cat}</h4>`;
        const list = document.createElement('ul');
        list.className = 'favorites-list';
        items.forEach(({ label, value }) => {
          if (label && value) {
            const li = document.createElement('li');
            li.className = 'favorites-item';
            li.innerHTML = `<strong>${label}:</strong> ${value}`;
            list.appendChild(li);
          }
        });
        if (list.children.length) section.appendChild(list);
        container.appendChild(section);
      });
      modalBody.innerHTML = '';
      modalBody.appendChild(container);
    } else {
      modalBody.innerHTML = content.content;
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
    checkScrollIndicator(contentArea);
    contentArea.addEventListener('scroll', () => checkScrollIndicator(contentArea));
  } catch (err) {
    console.error("Modal error:", err);
    modalBody.innerHTML = `<p class="error-message">Error loading content: ${err.message}</p>`;
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  modal.classList.add("closing");
  setTimeout(() => {
    modal.classList.remove("open", "closing");
    document.body.style.overflow = "";
  }, 300);
}

function checkScrollIndicator(contentArea) {
  if (!contentArea) return;
  const hasOverflow = contentArea.scrollHeight > contentArea.clientHeight;
  const atBottom = Math.abs(contentArea.scrollHeight - contentArea.scrollTop - contentArea.clientHeight) < 1;
  contentArea.parentElement?.classList.toggle('has-overflow', hasOverflow && !atBottom);
}

// Global listeners
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document.addEventListener("click", (e) => {
  if (e.target.id === "modal") closeModal();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadContent();
  if (!document.body.classList.contains("splash-page")) {
    const hero = document.getElementById("heroText");
    if (hero) {
      updateHeroText(languages[currentLangIndex], animations[0]);
      setInterval(changeLanguage, 3000);
    }
  }

  // IntersectionObserver for section animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('section-visible', entry.isIntersecting);
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('#mainContainer section').forEach(s => observer.observe(s));

  // Smooth scroll
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const id = link.getAttribute('href')?.substring(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Fade-in animation
  const container = document.getElementById("mainContainer");
  if (container) {
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.transition = "opacity 1.5s ease";
      container.style.opacity = 1;
    }, 100);
  }
});

window.onload = () => window.scrollTo(0, 0);
