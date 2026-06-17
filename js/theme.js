/* King's BioAI Lab — subtle, intentional interactions */
(function () {
  "use strict";

  /* Nav: collapse branding and show menu after scrolling */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    var threshold = Math.min(header.offsetHeight * 0.55, 140);
    header.classList.toggle("scrolled", window.scrollY > threshold);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.querySelector(".mobile-menu");
  if (toggle && menu) {
    function setMenuOpen(open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    }

    toggle.addEventListener("click", function () {
      setMenuOpen(!menu.classList.contains("open"));
    });

    var closeBtn = menu.querySelector(".mobile-menu-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setMenuOpen(false);
      });
    }

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        setMenuOpen(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) {
        setMenuOpen(false);
      }
    });
  }

  /* Scroll reveal */
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var els = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    els.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }
})();
