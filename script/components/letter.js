(function () {
  window.Components = window.Components || {};

  window.Components.letter = {
    render(container, section) {
      const div = document.createElement("div");
      div.className = "section section-letter";
      const paragraphs = section.paragraphs || [];
      const contentHtml = paragraphs
        .map((p) => `<p class="letter-para">${p}</p>`)
        .join("");
      div.innerHTML = `
        <div class="letter-scene">
          <div class="letter-paper">
            <div class="letter-content">${contentHtml}</div>
          </div>
          <div class="envelope">
            <div class="env-body"></div>
            <div class="env-flap">
              <svg class="env-heart" viewBox="0 0 32 29.6">
                <path d="M16 29.6S0 18.7 0 9.3C0 4.2 4.2 0 9.3 0c3.3 0 5.4 1.7 6.7 3.4C17.3 1.7 19.4 0 22.7 0 27.8 0 32 4.2 32 9.3c0 9.4-16 20.3-16 20.3z" fill="currentColor"/>
              </svg>
            </div>
            <div class="env-front"></div>
          </div>
        </div>
      `;

      // 每个字包成 span，用于逐字显示
      div.querySelectorAll(".letter-para").forEach((p) => {
        p.innerHTML = p.textContent
          .split("")
          .map((ch) => `<span class="letter-char">${ch === " " ? "&nbsp;" : ch}</span>`)
          .join("");
      });

      container.appendChild(div);
      return div;
    },

    animate(tl, el) {
      const scene = el.querySelector(".letter-scene");
      const envelope = el.querySelector(".envelope");
      const flap = el.querySelector(".env-flap");
      const heart = el.querySelector(".env-heart");
      const paper = el.querySelector(".letter-paper");
      const chars = el.querySelectorAll(".letter-char");
      const paras = el.querySelectorAll(".letter-para");

      // 初始：信纸折叠藏在信封里
      tl.set(paper, { top: "46%", scaleY: 0.32, opacity: 1 });
      tl.set(chars, { opacity: 0 });

      // 1. 信封入场
      tl.from(scene, {
        duration: 0.8, scale: 0.4, opacity: 0, y: 80, ease: "back.out(1.6)",
      })
        // 2. 爱心跳动两下
        .to(heart, {
          duration: 0.22, scale: 1.35, ease: "power1.inOut",
          transformOrigin: "center center",
        })
        .to(heart, { duration: 0.22, scale: 1, ease: "power1.inOut" })
        .to(heart, { duration: 0.22, scale: 1.35, ease: "power1.inOut" })
        .to(heart, { duration: 0.22, scale: 1, ease: "power1.inOut" })
        // 3. 翻盖打开
        .to(flap, {
          duration: 0.9, rotationX: -180, ease: "power2.inOut",
        }, "+=0.3")
        // 4. 折叠的信纸抽出
        .to(paper, {
          duration: 1.1, top: "-28%", ease: "power2.out",
        }, "-=0.05")
        // 5. 信封淡出
        .to(envelope, {
          duration: 0.45, opacity: 0, y: 25, ease: "power1.in",
        }, "-=0.3")
        // 6. 信纸落到中央并展开
        .to(paper, {
          duration: 0.7, top: "50%", ease: "power2.inOut",
        }, "-=0.1")
        .to(paper, {
          duration: 1.0, scaleY: 1, yPercent: -50, ease: "power3.out",
        });

      // 7. 文字逐字出现（每字 0.05s，段落间稍作停顿）
      paras.forEach((para, i) => {
        const paraChars = para.querySelectorAll(".letter-char");
        const isLast = i === paras.length - 1;
        tl.to(paraChars, {
          duration: 0.01,
          opacity: 1,
          stagger: isLast ? 0.18 : 0.12,
          ease: "none",
        }, i === 0 ? "+=0.3" : "+=0.7");
      });
    },
  };
})();
