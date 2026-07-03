/* ============================================================
   Taha Basri — Portfolio interactions
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      const open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Nav shadow on scroll ---------- */
  const nav = document.getElementById("nav");
  const onScrollNav = function () {
    if (!nav) return;
    nav.style.boxShadow =
      window.scrollY > 40
        ? "0 12px 34px rgba(20, 60, 120, 0.22)"
        : "0 10px 30px rgba(20, 60, 120, 0.16)";
  };
  window.addEventListener("scroll", onScrollNav, { passive: true });

  /* ---------- Reveal-up via IntersectionObserver ---------- */
  const revealEls = document.querySelectorAll(".reveal-up");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Scroll-reveal statement (words light up) ---------- */
  const statement = document.getElementById("statement");
  let words = [];
  if (statement) {
    // Wrap each word of every text node in a .w span; leave <em> intact.
    const nodes = Array.from(statement.childNodes);
    nodes.forEach(function (node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(function (part) {
          if (/^\s+$/.test(part) || part === "") {
            frag.appendChild(document.createTextNode(part));
          } else {
            const span = document.createElement("span");
            span.className = "w";
            span.textContent = part;
            frag.appendChild(span);
          }
        });
        statement.replaceChild(frag, node);
      }
    });
    words = Array.from(statement.querySelectorAll(".w"));
  }

  const updateStatement = function () {
    if (!statement || !words.length) return;
    const rect = statement.getBoundingClientRect();
    const vh = window.innerHeight;
    // progress: 0 when top at 80% of viewport, 1 when bottom passes 45%
    const start = vh * 0.8;
    const end = vh * 0.35;
    const progress = (start - rect.top) / (start - end);
    const p = Math.max(0, Math.min(1, progress));
    const count = Math.round(p * words.length);
    words.forEach(function (w, i) {
      w.classList.toggle("on", i < count);
    });
  };
  window.addEventListener("scroll", updateStatement, { passive: true });
  window.addEventListener("resize", updateStatement);
  updateStatement();

  /* ---------- CTA word cycling ---------- */
  const cycle = document.getElementById("cycle");
  if (cycle) {
    const verbs = ["build", "ship", "design", "create"];
    let idx = 0;
    setInterval(function () {
      idx = (idx + 1) % verbs.length;
      cycle.style.opacity = "0";
      cycle.style.transform = "translateY(8px)";
      cycle.style.transition = "opacity .25s ease, transform .25s ease";
      setTimeout(function () {
        cycle.textContent = verbs[idx];
        cycle.style.opacity = "1";
        cycle.style.transform = "none";
      }, 250);
    }, 2200);
  }

  /* ---------- Dynamic years of experience (counts from data-since) ---------- */
  const yearEls = document.querySelectorAll(".js-years");
  yearEls.forEach(function (el) {
    const since = parseInt(el.getAttribute("data-since"), 10);
    if (!isNaN(since)) {
      const years = new Date().getFullYear() - since;
      if (years > 0) el.textContent = String(years);
    }
  });
})();
