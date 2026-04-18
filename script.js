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
