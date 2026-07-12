/* ============================================================
   Blog interactions — code copy buttons
   ============================================================ */
(function () {
  "use strict";

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
