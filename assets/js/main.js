/* ==========================================================================
   Malwarius — Script principal
   Navigation mobile, highlight page active, formulaire contact
   ========================================================================== */

(function () {
  "use strict";

  /* --- Navigation mobile ------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("nav--open");
    });

    // Fermer le menu au clic sur un lien (mobile)
    nav.querySelectorAll(".nav__link").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("nav--open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* --- Highlight de la page active --------------------------------------- */
  (function highlightActivePage() {
    var currentPath = window.location.pathname.split("/").pop() || "index.html";
    // Normaliser: si vide ou "/", c'est index.html
    if (currentPath === "" || currentPath === "/") {
      currentPath = "index.html";
    }

    document.querySelectorAll(".nav__link").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href === currentPath) {
        link.classList.add("nav__link--active");
        link.setAttribute("aria-current", "page");
      }
    });
  })();

  /* --- Formulaire de contact (simulation) -------------------------------- */
  var contactForm = document.getElementById("contact-form");
  var formSuccess = document.getElementById("form-success");

  if (contactForm && formSuccess) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Validation basique côté client
      var nom = contactForm.querySelector("#nom");
      var email = contactForm.querySelector("#email");
      var message = contactForm.querySelector("#message");
      var valid = true;

      [nom, email, message].forEach(function (field) {
        if (field && !field.value.trim()) {
          field.setAttribute("aria-invalid", "true");
          valid = false;
        } else if (field) {
          field.removeAttribute("aria-invalid");
        }
      });

      if (email && email.value && !isValidEmail(email.value)) {
        email.setAttribute("aria-invalid", "true");
        valid = false;
      }

      if (valid) {
        formSuccess.classList.add("form-success--visible");
        contactForm.reset();
        // Masquer le message après 5 secondes
        setTimeout(function () {
          formSuccess.classList.remove("form-success--visible");
        }, 5000);
      }
    });
  }

  /**
   * Validation simple d'email
   * @param {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* --- Smooth scroll pour les ancres internes ---------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      var targetId = this.getAttribute("href").substring(1);
      var target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        target.focus({ preventScroll: true });
      }
    });
  });
})();
