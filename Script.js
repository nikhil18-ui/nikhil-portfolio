
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const themeLabel = document.getElementById("themeLabel");

if (year) {
  year.textContent = new Date().getFullYear();
}

const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "dark" ? "dark" : "light";

document.documentElement.setAttribute("data-theme", initialTheme);

function updateThemeButton(theme) {
  if (!themeIcon || !themeLabel || !themeToggle) return;

  if (theme === "dark") {
    themeIcon.textContent = "☀";
    themeLabel.textContent = "Light mode";
    themeToggle.setAttribute("aria-label", "Switch to light mode");
  } else {
    themeIcon.textContent = "☾";
    themeLabel.textContent = "Dark mode";
    themeToggle.setAttribute("aria-label", "Switch to dark mode");
  }
}

updateThemeButton(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!reducedMotion) {
      const buttonPosition = themeToggle.getBoundingClientRect();
      const wipe = document.createElement("div");

      wipe.className = "theme-wipe";

      wipe.style.setProperty(
        "--wipe-x",
        `${buttonPosition.left + buttonPosition.width / 2}px`
      );

      wipe.style.setProperty(
        "--wipe-y",
        `${buttonPosition.top + buttonPosition.height / 2}px`
      );

      wipe.style.background =
        newTheme === "dark" ? "#141a18" : "#f5f3ee";

      document.body.appendChild(wipe);

      wipe.addEventListener("animationend", () => wipe.remove(), {
        once: true
      });
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);

    updateThemeButton(newTheme);
  });
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

/* SCROLL REVEAL ANIMATIONS */

const revealElements = document.querySelectorAll(
  ".hero-topline, .hero-copy, .hero-note, .hero-bottom, .section-heading, .about-grid, .about-facts, .fact, .work-intro, .project-card, .skills-grid, .skill-group, .education-grid, .education-item, .contact-section .container, .footer-inner"
);

revealElements.forEach((element, index) => {
  element.classList.add("reveal");

  if (element.classList.contains("project-card")) {
    element.style.transitionDelay = `${(index % 3) * 120}ms`;
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}
