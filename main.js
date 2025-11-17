// main.js - FULL WORKING VERSION
// Drop into your repo and include with: <script src="main.js" defer></script>

document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // Utility helpers
  // ------------------------------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));
  const safeSetStyle = (el, prop, val) => { if (el) el.style[prop] = val; };

  // ------------------------------
  // Elements (with fallbacks)
  // ------------------------------
  const gmailIcon = $("#gmailIcon") || $(".gmailIcon") || null;
  const whatsappIcon = $("#whatsappIcon") || $(".whatsappIcon") || null;
  const typingText = $("#typing-text") || $(".typing-text") || null;
  const filterButtons = $$(".filter-btn");
  const projectCards = $$(".project-card");
  const skillItems = $$(".skill-item");
  const skillButtons = $$(".filter-skills-btn");
  const cardsContainer = $(".project-cards") || null;
  const scrollArrow = $("#scrollArrow") || $(".scrollArrow") || null;
  const scrollDownArrow = $("#scrollDownArrow") || $(".scrollDownArrow") || null;
  const downloadBtn = $("#downloadCVBtn") || $(".downloadCVBtn") || null;
  const footer = $("footer") || null;
  const scrollBar = $("#scrollBar") || null;
  const emailLink = $("#contactEmail") || null;

  // ------------------------------
  // HIDE ICONS ON PAGE LOAD
  // ------------------------------
  if (gmailIcon) {
    safeSetStyle(gmailIcon, "display", "none");
    safeSetStyle(gmailIcon, "opacity", "0");
    safeSetStyle(gmailIcon, "pointerEvents", "none");
  }
  if (whatsappIcon) {
    safeSetStyle(whatsappIcon, "display", "none");
    safeSetStyle(whatsappIcon, "opacity", "0");
    safeSetStyle(whatsappIcon, "pointerEvents", "none");
  }

  // ------------------------------
  // TYPING EFFECT
  // ------------------------------
  if (typingText) {
    const texts = [
      "Front-End Developer",
      "Web Developer",
      "Full Stack | React",
      "UI/UX Enthusiast",
      "Creative Coder"
    ];
    let index = 0, charIndex = 0;
    const typingDelay = 150, erasingDelay = 100, newTextDelay = 1500;

    function type() {
      if (charIndex < texts[index].length) {
        typingText.textContent += texts[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
      } else {
        setTimeout(erase, newTextDelay);
      }
    }
    function erase() {
      if (charIndex > 0) {
        typingText.textContent = texts[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
      } else {
        index = (index + 1) % texts.length;
        setTimeout(type, typingDelay + 500);
      }
    }
    setTimeout(type, 1000);
  }

  // ------------------------------
  // GSAP (only if available)
  // ------------------------------
  try {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);

      if ($(".img img")) gsap.from(".img img", { opacity: 0, scale: 0.6, duration: 1, delay: 0.2, ease: "back.out(1.7)" });
      if ($(".titleIntroduction h3")) gsap.from(".titleIntroduction h3", { opacity: 0, y: -20, duration: 1, delay: 0.4 });
      if ($(".titleIntroduction h2")) gsap.from(".titleIntroduction h2", { opacity: 0, y: -20, duration: 1, delay: 0.6 });
      if ($$(".iconWrapper i").length) gsap.from(".iconWrapper i", { opacity: 0, y: -20, scale: 0.5, duration: 0.7, stagger: 0.1, delay: 0.8 });

      $$(".iconWrapper i").forEach(icon => {
        icon.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.3, duration: 0.3 }));
        icon.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, duration: 0.3 }));
      });

      gsap.utils.toArray(".timeline-item, .experience-item").forEach(item => {
        gsap.from(item, { scrollTrigger: { trigger: item, start: "top 80%" }, y: 50, opacity: 0, duration: 0.8 });
      });

      gsap.utils.toArray(".project-card").forEach(card => {
        gsap.from(card, { scrollTrigger: { trigger: card, start: "top 90%" }, y: 40, opacity: 0, duration: 0.6 });
      });
    }
  } catch (e) {
    // if gsap not present, silently continue
    // console.warn("GSAP not available:", e);
  }

  // ------------------------------
  // PROJECT FILTER
  // ------------------------------
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        projectCards.forEach(card => {
          if (filter === "all" || card.dataset.category === filter) {
            card.style.display = "block";
            if (window.gsap) gsap.to(card, { opacity: 1, y: 0, duration: 0.5 });
            else { card.style.opacity = "1"; card.style.transform = "none"; }
          } else {
            if (window.gsap) {
              gsap.to(card, { opacity: 0, y: 50, duration: 0.5, onComplete: () => card.style.display = "none" });
            } else {
              card.style.opacity = "0";
              card.style.display = "none";
            }
          }
        });
      });
    });
  }

  // ------------------------------
  // SKILLS & PROGRESS BARS
  // ------------------------------
  if (skillItems.length) {
    skillItems.forEach(item => {
      const level = item.getAttribute("data-skill") || "0";
      const bar = item.querySelector(".progress div");
      if (bar) setTimeout(() => bar.style.width = level + "%", 300);
    });
  }
  if (skillButtons.length) {
    skillButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        skillButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const filter = btn.getAttribute("data-filter");
        skillItems.forEach(item => {
          item.style.display = (filter === "all" || item.classList.contains(filter)) ? "flex" : "none";
        });
      });
    });
    const defaultSkillFilter = document.querySelector('[data-filter="all"]');
    if (defaultSkillFilter) defaultSkillFilter.click();
  }

  // ------------------------------
  // SORT PROJECT CARDS BY DATE (if container exists)
  // ------------------------------
  if (cardsContainer) {
    const cards = Array.from(cardsContainer.children);
    cards.sort((a, b) => {
      const getDate = el => {
        const node = el.querySelector(".updated-date");
        if (!node) return new Date(0);
        const txt = node.textContent.replace(/Updated on |In Progress — started /, '').trim();
        const d = new Date(txt);
        return isNaN(d) ? new Date(0) : d;
      };
      return getDate(b) - getDate(a);
    });
    cards.forEach(card => cardsContainer.appendChild(card));
  }

  // ------------------------------
  // Centralized Scroll Handler (one listener)
  // ------------------------------
  function onScrollHandler() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    const viewportBottom = scrollTop + window.innerHeight;
    const footerTop = footer ? footer.offsetTop : document.body.scrollHeight;

    // Show/Hide Scroll Up Arrow
    if (scrollArrow) {
      if (scrollTop > 300 && viewportBottom < footerTop) {
        scrollArrow.style.display = "block";
      } else {
        scrollArrow.style.display = "none";
      }
    }

    // Show/Hide Scroll Down Arrow
    if (scrollDownArrow) {
      if (scrollTop < scrollHeight - 300) scrollDownArrow.style.display = "block";
      else scrollDownArrow.style.display = "none";
    }

    // Download CV button show/hide
    if (downloadBtn) {
      const btnRect = downloadBtn.getBoundingClientRect();
      // btnRect.bottom is relative to viewport: add scrollTop to get absolute
      const btnBottomAbs = scrollTop + btnRect.bottom;
      if (scrollPercent >= 50 && btnBottomAbs < footerTop) {
        downloadBtn.classList.add("show");
      } else {
        downloadBtn.classList.remove("show");
      }
    }

    // Gmail icon: show only near footer
    if (gmailIcon) {
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = docHeight - (scrollTop + windowHeight);
      const showTrigger = docHeight * 0.03;
      if (distanceFromBottom <= showTrigger) {
        gmailIcon.style.display = "block";
        gmailIcon.style.opacity = "1";
        gmailIcon.style.pointerEvents = "auto";
      } else {
        gmailIcon.style.display = "none";
        gmailIcon.style.opacity = "0";
        gmailIcon.style.pointerEvents = "none";
      }
    }

    // WhatsApp icon logic relative to header area (if header exists)
    const header = document.querySelector(".HeaderContainer") || null;
    if (header && whatsappIcon) {
      const headerBottom = header.offsetTop + header.offsetHeight;
      if (scrollTop < headerBottom) {
        whatsappIcon.style.display = "none";
      } else {
        // hide when scrolled past 50% of the page
        if (scrollPercent > 50) {
          whatsappIcon.style.display = "none";
        } else {
          whatsappIcon.style.display = "flex";
          whatsappIcon.style.opacity = "1";
          whatsappIcon.style.pointerEvents = "auto";
        }
      }
    }

    // Scroll Bar progress
    if (scrollBar) {
      scrollBar.style.width = Math.min(Math.max(scrollPercent, 0), 100) + "%";
    }
  }

  // throttle scroll handler for performance
  let scrollThrottle;
  window.addEventListener("scroll", () => {
    if (scrollThrottle) cancelAnimationFrame(scrollThrottle);
    scrollThrottle = requestAnimationFrame(onScrollHandler);
  });
  // run once on load to set initial states
  onScrollHandler();

  // ------------------------------
  // SCROLL TO TOP - CLICK HANDLER
  // ------------------------------
  if (scrollArrow) {
    scrollArrow.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // make arrow keyboard accessible
    scrollArrow.setAttribute("role", "button");
    scrollArrow.setAttribute("tabindex", "0");
    scrollArrow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  // ------------------------------
  // SCROLL DOWN ARROW (if you have one that should go down)
  // ------------------------------
  if (scrollDownArrow) {
    scrollDownArrow.addEventListener("click", (e) => {
      e.preventDefault();
      // scroll down one viewport
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    });
  }

  // ------------------------------
  // GMAIL ICON (open compose)
  // ------------------------------
  const myEmail = "muaddhalsway@gmail.com";
  const subject = " ";
  const body = "How can I help you?";

  function openGmail() {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailURL, "_blank");
  }

  if (emailLink) {
    emailLink.addEventListener("click", (e) => { e.preventDefault(); openGmail(); });
  }
  if (gmailIcon) {
    gmailIcon.addEventListener("click", (e) => { e.preventDefault(); openGmail(); });
  }

  // ------------------------------
  // Accessibility tip: ensure scroll arrows are visible/focusable (CSS needed)
  // ------------------------------

}); // DOMContentLoaded end

// ------------------------------
// If you include any scroll-based logic AFTER DOMContentLoaded (outside),
// keep it minimal. Prefer using the central handler above.
// ------------------------------
