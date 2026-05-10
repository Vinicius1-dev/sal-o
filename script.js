// Translation system
const translations = {
  pt: {
    "nav-about": "Sobre",
    "nav-experience": "Experiência",
    "nav-services": "Serviços",
    "nav-gallery": "Galeria",
    "nav-team": "Equipe",
    "nav-testimonials": "Depoimentos",
    "nav-contact": "Contato",
    "header-cta": "Agendar no WhatsApp",
    "brand-eyebrow": "Beleza de alto padrão",
    "brand-name": "Maison Élégance",
    "hero-tag": "Luxo, técnica e delicadeza",
    "hero-title": "Uma experiência de beleza",
    "hero-title-accent": "assinada",
    "hero-subtitle": "pela elegância.",
    "hero-description": "Atendimento exclusivo para mulheres que valorizam acabamento impecável, conforto e um resultado sofisticado — com naturalidade, presença e confiança.",
    "hero-cta-primary": "Agendar no WhatsApp",
    "hero-cta-secondary": "Ver a experiência",
    "trust-rating": "Avaliação",
    "trust-appointments": "Atendimentos",
    "trust-standard": "Padrão",
    "trust-microcopy-1": "Agendamento com confirmação rápida",
    "trust-microcopy-2": "Equipe especializada",
    "trust-microcopy-3": "Ambiente de alto padrão"
  },
  en: {
    "nav-about": "About",
    "nav-experience": "Experience",
    "nav-services": "Services",
    "nav-gallery": "Gallery",
    "nav-team": "Team",
    "nav-testimonials": "Testimonials",
    "nav-contact": "Contact",
    "header-cta": "Book on WhatsApp",
    "brand-eyebrow": "High-end beauty",
    "brand-name": "Maison Élégance",
    "hero-tag": "Luxury, technique and delicacy",
    "hero-title": "A beauty experience",
    "hero-title-accent": "signed",
    "hero-subtitle": "by elegance.",
    "hero-description": "Exclusive service for women who value impeccable finish, comfort and sophisticated results — with naturalness, presence and confidence.",
    "hero-cta-primary": "Book on WhatsApp",
    "hero-cta-secondary": "See the experience",
    "trust-rating": "Rating",
    "trust-appointments": "Appointments",
    "trust-standard": "Standard",
    "trust-microcopy-1": "Fast confirmation booking",
    "trust-microcopy-2": "Specialized team",
    "trust-microcopy-3": "High-end environment"
  }
};

// Language switching functionality
let currentLang = localStorage.getItem('language') || 'pt';

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  
  // Update language buttons
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Update HTML lang attribute
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  
  // Update all translatable elements
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.getAttribute('data-translate');
    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });
  
  // Update special elements
  const brandEyebrow = document.querySelector('.brand__eyebrow');
  const brandName = document.querySelector('.brand__name');
  if (brandEyebrow && translations[lang]['brand-eyebrow']) {
    brandEyebrow.textContent = translations[lang]['brand-eyebrow'];
  }
  if (brandName && translations[lang]['brand-name']) {
    brandName.textContent = translations[lang]['brand-name'];
  }
  
  // Update hero section
  const heroTag = document.querySelector('.hero .section-tag');
  const heroTitle = document.querySelector('.hero h1');
  const heroDescription = document.querySelector('.hero p');
  
  if (heroTag && translations[lang]['hero-tag']) {
    heroTag.textContent = translations[lang]['hero-tag'];
  }
  if (heroTitle) {
    const titleHtml = `${translations[lang]['hero-title']} <span class="hero__title-accent">${translations[lang]['hero-title-accent']}</span> ${translations[lang]['hero-subtitle']}`;
    heroTitle.innerHTML = titleHtml;
  }
  if (heroDescription && translations[lang]['hero-description']) {
    heroDescription.textContent = translations[lang]['hero-description'];
  }
  
  // Update hero buttons
  const heroButtons = document.querySelectorAll('.hero__actions a');
  if (heroButtons[0] && translations[lang]['hero-cta-primary']) {
    heroButtons[0].textContent = translations[lang]['hero-cta-primary'];
  }
  if (heroButtons[1] && translations[lang]['hero-cta-secondary']) {
    heroButtons[1].textContent = translations[lang]['hero-cta-secondary'];
  }
  
  // Update trust pills
  const trustPills = document.querySelectorAll('.trust-pill__label');
  if (trustPills[0] && translations[lang]['trust-rating']) {
    trustPills[0].textContent = translations[lang]['trust-rating'];
  }
  if (trustPills[1] && translations[lang]['trust-appointments']) {
    trustPills[1].textContent = translations[lang]['trust-appointments'];
  }
  if (trustPills[2] && translations[lang]['trust-standard']) {
    trustPills[2].textContent = translations[lang]['trust-standard'];
  }
  
  // Update microcopy
  const microcopySpans = document.querySelectorAll('.hero__microcopy span');
  const microcopyTexts = [
    translations[lang]['trust-microcopy-1'],
    '•',
    translations[lang]['trust-microcopy-2'],
    '•',
    translations[lang]['trust-microcopy-3']
  ];
  
  microcopySpans.forEach((span, index) => {
    if (microcopyTexts[index]) {
      span.textContent = microcopyTexts[index];
    }
  });
}

// Initialize language switcher
document.addEventListener('DOMContentLoaded', function() {
  // Set up language button listeners
  document.querySelectorAll('.language-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.dataset.lang;
      updateLanguage(lang);
    });
  });
  
  // Initialize with saved language
  updateLanguage(currentLang);
});

// Controla o menu mobile e melhora a navegação em telas menores.
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav a");
const pageBody = document.body;

if (menuToggle && nav) {
  const closeMenu = () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    pageBody.classList.remove("no-scroll");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    pageBody.classList.add("no-scroll");
  };

  menuToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = nav.classList.contains("is-open");
    if (isOpen) closeMenu();
    else openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Fecha ao clicar fora (sensação mais refinada no mobile).
  document.addEventListener("click", (event) => {
    if (!nav.classList.contains("is-open")) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (nav.contains(target) || menuToggle.contains(target)) return;
    closeMenu();
  });

  // Fecha com ESC (acessibilidade).
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (!nav.classList.contains("is-open")) return;
    closeMenu();
  });
}

// Adiciona profundidade ao header quando a página é rolada.
const handleHeaderScroll = () => {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 20);
};

window.addEventListener("scroll", handleHeaderScroll);
handleHeaderScroll();

// Cria animações suaves de entrada para os blocos da página.
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealElements.forEach((element) => revealObserver.observe(element));

// Controla a expansão do FAQ com abertura individual.
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const button = item.querySelector(".faq-question");
  const answer = item.querySelector(".faq-answer");

  if (!button || !answer) return;

  button.addEventListener("click", () => {
    const isActive = item.classList.contains("active");

    faqItems.forEach((faqItem) => {
      faqItem.classList.remove("active");
      const faqAnswer = faqItem.querySelector(".faq-answer");
      if (faqAnswer) faqAnswer.style.maxHeight = null;
    });

    if (!isActive) {
      item.classList.add("active");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});
