/* davidpdonohue/script.js */

// Define languages and animations at the global scope
const languages = [
  "Welcome",
  "Fáilte",
  "Bienvenido",
  "Bienvenue",
  "Benvenuto",
  "Willkommen",
  "私の世界へようこそ",
  "欢迎来到我的世界",
];

const animations = [
  "typewriter",
  "bounceInLetter",
  "bounceInWord",
  "slideInRightLetter",
  "slideInRightWord",
  "rollInRightLetter",
  "rollInRightWord",
  "slideInLeftLetter",
  "slideInLeftWord"
];

let animationPool = [...animations];
let lastAnimClass = "";
let currentLangIndex = 0;

// Content Loading Function
async function loadContent() {
  try {
    const response = await fetch('content.json');
    if (!response.ok) throw new Error('Failed to fetch content');
    
    const content = await response.json();
    const mainContent = content.main;

    // Update navigation (with error checking)
    const logoElement = document.querySelector('.logo');
    if (logoElement) logoElement.textContent = mainContent.navigation.logo;

    // Update hero section (with error checking)
    const heroTextElement = document.querySelector('#heroText');
    const heroDescElement = document.querySelector('.hero-description');
    if (heroTextElement) heroTextElement.textContent = mainContent.hero.heading;
    if (heroDescElement) heroDescElement.textContent = mainContent.hero.description;

    // Update about section (with error checking)
    const aboutTitleElement = document.querySelector('#about .section-title');
    if (aboutTitleElement) aboutTitleElement.textContent = mainContent.about.title;
    
    // Dynamically create about cards (with error checking)
    const aboutCardsContainer = document.getElementById('aboutCardsContainer');
    if (aboutCardsContainer) {
      aboutCardsContainer.innerHTML = ''; // Clear existing content
      
      Object.entries(mainContent.about.cards).forEach(([key, card]) => {
        const cardHTML = `
          <div onclick="openModal('${key}')" class="card">
            <h3>${card.title}</h3>
            <p>${card.preview}</p>
          </div>
        `;
        aboutCardsContainer.insertAdjacentHTML('beforeend', cardHTML);
      });
    }

    // Update projects section (with error checking)
    const projectsTitleElement = document.querySelector('#projects .section-title');
    const projectsGrid = document.querySelector('.projects-grid');
    if (projectsTitleElement) projectsTitleElement.textContent = mainContent.projects.title;
    if (projectsGrid) {
      projectsGrid.innerHTML = '';
      
      mainContent.projects.items.forEach(project => {
        const projectHTML = project.link
          ? `<a href="${project.link}" target="_blank" class="project-item">
              <div class="${project.hasGradientWave ? 'gradient-wave' : ''}">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
              </div>
            </a>`
          : `<div class="project-item">
              <h3>${project.title}</h3>
              <p>${project.description}</p>
            </div>`;
        projectsGrid.insertAdjacentHTML('beforeend', projectHTML);
      });
    }

    // Update contact section (with error checking)
    const contactTitleElement = document.querySelector('#contact .section-title');
    const contactDescElement = document.querySelector('#contact .contact p');
    const contactBtnElement = document.querySelector('#contact .contact .btn');
    if (contactTitleElement) contactTitleElement.textContent = mainContent.contact.title;
    if (contactDescElement) contactDescElement.textContent = mainContent.contact.description;
    if (contactBtnElement) contactBtnElement.href = `mailto:${mainContent.contact.email}`;

    // Update footer (with error checking)
    const footerTextElement = document.querySelector('footer p');
    const footerSocialLinks = document.querySelector('footer .social-links');
    if (footerTextElement) footerTextElement.textContent = mainContent.footer.copyright;
    if (footerSocialLinks) {
      footerSocialLinks.innerHTML = `
        <a href="${mainContent.contact.socialLinks.github}" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="${mainContent.contact.socialLinks.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="mailto:${mainContent.contact.socialLinks.email}">Email</a>
      `;
    }
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

function updateHeroText(newText, animClass) {
  const heroText = document.getElementById("heroText");
  if (!heroText) return; // Guard clause for missing element

  heroText.innerHTML = ""; // Clear previous content

  if (animClass === "typewriter") {
    heroText.textContent = newText;
    heroText.classList.add("typewriter");
  } else if (animClass.includes("Letter")) {
    heroText.classList.remove("typewriter");
    for (let i = 0; i < newText.length; i++) {
      const span = document.createElement("span");
      span.textContent = newText[i];
      span.style.animationDelay = `${i * 0.1}s`;
      span.classList.add(animClass);
      heroText.appendChild(span);
    }
  } else if (animClass.includes("Word")) {
    heroText.classList.remove("typewriter");
    const words = newText.split(" ");
    words.forEach((word, index) => {
      const span = document.createElement("span");
      span.textContent = word + " ";
      span.style.animationDelay = `${index * 0.2}s`;
      span.classList.add(animClass);
      heroText.appendChild(span);
    });
  }
}

function changeLanguage() {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  const heroText = document.getElementById("heroText");
  if (!heroText) return; // Guard clause for missing element

  heroText.classList.remove(...animations);

  if (animationPool.length === 0) {
    animationPool = [...animations];
  }
  let randomIndex = Math.floor(Math.random() * animationPool.length);
  let animClass = animationPool[randomIndex];
  
  if (animationPool.length > 1) {
    while (animClass === lastAnimClass) {
      randomIndex = Math.floor(Math.random() * animationPool.length);
      animClass = animationPool[randomIndex];
    }
  }
  
  animationPool.splice(randomIndex, 1);
  lastAnimClass = animClass;

  updateHeroText(languages[currentLangIndex], animClass);
}

/* Modal Functions */
async function openModal(contentId) {
  const modal = document.getElementById("modal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");
  
  if (!modal || !modalTitle || !modalBody) return;
  
  const contentArea = modal.querySelector('.content-area');
  if (!contentArea) return;

  try {
    const response = await fetch('content.json');
    if (!response.ok) {
      throw new Error('Failed to fetch content');
    }
    
    const data = await response.json();
    const content = data.main.about.cards[contentId];
    if (!content) {
      throw new Error(`Content not found for: ${contentId}`);
    }

    modalTitle.textContent = content.title;

    // === Updated logic: React Resume modal ===
    if (contentId === 'resume') {
      modalTitle.textContent = content.title || "Resume";
      modalBody.innerHTML = '<div id="resume-root" style="width:100%"></div>';
      // React bundle will mount the resume here!
    } else if (contentId === 'favorites') {
      const favoritesContainer = document.createElement('div');
      favoritesContainer.className = 'favorites-container';

      Object.entries(content.categories).forEach(([categoryName, items]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'favorites-category';
        const categoryTitle = document.createElement('h4');
        categoryTitle.textContent = categoryName;
        categoryTitle.className = 'favorites-category-title';
        categorySection.appendChild(categoryTitle);
        const itemsList = document.createElement('ul');
        itemsList.className = 'favorites-list';
        items.forEach(item => {
          if (item.label && item.value) {
            const listItem = document.createElement('li');
            listItem.className = 'favorites-item';
            listItem.innerHTML = `<strong>${item.label}:</strong> ${item.value}`;
            itemsList.appendChild(listItem);
          }
        });
        if (itemsList.children.length > 0) {
          categorySection.appendChild(itemsList);
          favoritesContainer.appendChild(categorySection);
        }
      });
      modalBody.innerHTML = '';
      modalBody.appendChild(favoritesContainer);
    } else {
      modalBody.innerHTML = content.content;
    }

    modal.classList.add("open");
    document.body.style.overflow = "hidden";

    checkScrollIndicator(contentArea);
    contentArea.addEventListener('scroll', () => checkScrollIndicator(contentArea));

  } catch (error) {
    console.error('Error loading modal content:', error);
    modalBody.innerHTML = `
      <div class="error-message">
        <p>Error loading content. Please try again later.</p>
        <p class="error-details">${error.message}</p>
      </div>
    `;
  }
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (!modal) return;
  
  modal.classList.remove("open");
  document.body.style.overflow = "";
  // Optional: Unmount resume on modal close to reset React state
  const resumeRoot = document.getElementById('resume-root');
  if (resumeRoot) resumeRoot.remove();
}

function checkScrollIndicator(contentArea) {
  if (!contentArea) return;
  
  const hasOverflow = contentArea.scrollHeight > contentArea.clientHeight;
  const isScrolledToBottom = Math.abs(
    contentArea.scrollHeight - contentArea.scrollTop - contentArea.clientHeight
  ) < 1;
  
  contentArea.parentElement?.classList.toggle('has-overflow', hasOverflow && !isScrolledToBottom);
}

// Event Listeners
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target === modal) {
    closeModal();
  }
});

// Scroll handling
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

// DOM Content Loaded handler
document.addEventListener('DOMContentLoaded', () => {
  // Load content
  loadContent();

  // Initialize language animation if not on splash page
  if (!document.body.classList.contains("splash-page")) {
    const heroText = document.getElementById("heroText");
    if (heroText) {
      updateHeroText(languages[currentLangIndex], animations[0]);
      setInterval(changeLanguage, 3000);
    }
  }

  // Intersection Observer for sections
  const sections = document.querySelectorAll('#mainContainer section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('section-visible');
        
        // Update nav links
        const id = entry.target.getAttribute('id');
        document.querySelectorAll('nav a').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      } else {
        entry.target.classList.remove('section-visible');
      }
    });
  }, {
    threshold: 0.3
  });

  sections.forEach(section => observer.observe(section));

  // Smooth scroll handling
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetSection = targetId ? document.getElementById(targetId) : null;
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Fade in main container
  const container = document.getElementById("mainContainer");
  if (container) {
    container.style.opacity = 0;
    setTimeout(() => {
      container.style.transition = "opacity 1.5s ease";
      container.style.opacity = 1;
    }, 100);
  }
});

// Reset scroll position on page load
window.onload = function() { 
  window.scrollTo(0, 0);
};