(function () {
  window.Components = window.Components || {};

  window.Components.profile = {
    render(container, section, config) {
      const div = document.createElement("div");
      div.className = "section section-profile";
      const photoHtml = config.photo
        ? `<div class="profile-wrapper">
            <img src="${config.photo}" alt="profile" class="profile-picture" />
          </div>`
        : "";
      div.innerHTML = `
        ${photoHtml}
        <div class="wish">
          <h3 class="wish-hbd">${section.wishTitle || "生日快乐！"}</h3>
          <h5 class="wish-text">${section.wishText || ""}</h5>
        </div>
      `;
      // Split wish title into spans for stagger animation
      const hbd = div.querySelector(".wish-hbd");
      hbd.innerHTML = hbd.textContent
        .split("")
        .map((ch) => `<span>${ch}</span>`)
        .join("");

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const photo = el.querySelector(".profile-picture");
      if (photo) {
        // Photo appears with gentle scale
        tl.from(photo, {
          duration: 0.8, scale: 0.5, opacity: 0, ease: "back.out(1.4)",
        }, "-=2");
      }
      // Wish title letters stagger in
      tl.from(el.querySelectorAll(".wish-hbd span"), {
        duration: 0.5, opacity: 0, y: -30,
        ease: "back.out(1.7)", stagger: 0.06,
      })
      // Color each letter
      .to(el.querySelectorAll(".wish-hbd span"), {
        color: "var(--primary)", duration: 0.4,
        stagger: 0.04, ease: "none",
      }, "-=0.3")
      // Wish text fades in
      .from(el.querySelector(".wish-text"), {
        duration: 0.5, opacity: 0, y: 10,
      }, "-=0.2");
    },

    exit(tl, el) {
      tl.to(el, {
        duration: 0.6, opacity: 0, y: 20,
      });
    },
  };
})();
