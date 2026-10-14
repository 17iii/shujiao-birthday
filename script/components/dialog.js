(function () {
  window.Components = window.Components || {};

  window.Components.dialog = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-dialog";
      const messages = section.messages || [];
      const bubbles = messages
        .map((m) => {
          const side = m.side === "left" ? "dialog-left" : "dialog-right";
          const chars = (m.text || "")
            .split("")
            .map((ch) => `<span>${ch}</span>`)
            .join("");
          return `<div class="dialog-bubble ${side}">${chars}</div>`;
        })
        .join("");
      div.innerHTML = `<div class="dialog-box">${bubbles}</div>`;
      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const bubbles = el.querySelectorAll(".dialog-bubble");
      bubbles.forEach((b, i) => {
        const spans = b.querySelectorAll("span");
        const fromVars = {
          duration: 0.45,
          scale: 0.3,
          opacity: 0,
          ease: "back.out(1.6)",
        };
        if (i === 0) {
          tl.from(b, fromVars);
        } else {
          tl.from(b, fromVars, "+=0.4");
        }
        tl.to(spans, {
          duration: 0.8,
          visibility: "visible",
          stagger: 0.05,
        });
      });
      tl.to(el.querySelector(".dialog-box"), {
        duration: 0.6,
        opacity: 0,
        y: -30,
      }, "+=2.5");
    },
  };
})();
