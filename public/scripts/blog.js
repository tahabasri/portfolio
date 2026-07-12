/* ============================================================
   Blog interactions — code copy buttons + image lightbox
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Image lightbox (click any article image to view full screen) ---------- */
  document.querySelectorAll(".prose img, .post-hero img").forEach(function (img) {
    img.addEventListener("click", function () {
      var overlay = document.createElement("div");
      overlay.className = "img-lightbox";
      overlay.setAttribute("role", "dialog");
      overlay.setAttribute("aria-label", "Image preview");

      var full = document.createElement("img");
      full.src = img.currentSrc || img.src;
      full.alt = img.alt || "";
      if (img.classList.contains("img-white-bg")) full.classList.add("img-white-bg");
      overlay.appendChild(full);
      document.body.appendChild(overlay);
      document.body.style.overflow = "hidden";
      requestAnimationFrame(function () { overlay.classList.add("open"); });

      function close() {
        overlay.classList.remove("open");
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
        setTimeout(function () { overlay.remove(); }, 200);
      }
      function onKey(e) { if (e.key === "Escape") close(); }
      overlay.addEventListener("click", close);
      document.addEventListener("keydown", onKey);
    });
  });

  var COPY_ICON = '<i class="fa-regular fa-copy" aria-hidden="true"></i>';
  var DONE_ICON = '<i class="fa-solid fa-check" aria-hidden="true"></i>';

  document.querySelectorAll(".prose pre").forEach(function (pre) {
    var wrap = document.createElement("div");
    wrap.className = "code-wrap";
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy";
    btn.setAttribute("aria-label", "Copy code");
    btn.innerHTML = COPY_ICON;
    wrap.appendChild(btn);

    btn.addEventListener("click", function () {
      var code = pre.querySelector("code");
      var text = (code || pre).innerText.replace(/\n$/, "");
      navigator.clipboard.writeText(text).then(function () {
        btn.innerHTML = DONE_ICON;
        btn.classList.add("copied");
        setTimeout(function () {
          btn.innerHTML = COPY_ICON;
          btn.classList.remove("copied");
        }, 1600);
      });
    });
  });
})();
