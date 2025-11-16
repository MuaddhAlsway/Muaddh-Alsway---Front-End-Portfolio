// ==============================
// DOCUMENT READY
// ==============================
document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // TYPING EFFECT
    // ==============================
    const typingText = document.getElementById("typing-text");
    const texts = [
        "Front-End Developer",
        "Web Developer",
        "Full Stack | React",
        "UI/UX Enthusiast",
        "Creative Coder"
    ];

    let index = 0;
    let charIndex = 0;
    const typingDelay = 150;
    const erasingDelay = 100;
    const newTextDelay = 1500;

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

    // ==============================
    // GSAP ANIMATIONS
    // ==============================
    gsap.registerPlugin(ScrollTrigger);

    // Header Animations
    gsap.from(".img img", {
        opacity: 0,
        scale: 0.6,
        duration: 1,
        delay: 0.2,
        ease: "back.out(1.7)"
    });

    gsap.from(".titleIntroduction h3", {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.4,
        ease: "power2.out"
    });

    gsap.from(".titleIntroduction h2", {
        opacity: 0,
        y: -20,
        duration: 1,
        delay: 0.6,
        ease: "power2.out"
    });

    // Social Icons animation + hover
    gsap.from(".iconWrapper i", {
        opacity: 0,
        y: -20,
        scale: 0.5,
        duration: 0.7,
        stagger: 0.1,
        delay: 0.8,
        ease: "back.out(1.7)"
    });

    document.querySelectorAll(".iconWrapper i").forEach(icon => {
        icon.addEventListener("mouseenter", () => {
            gsap.to(icon, { scale: 1.3, duration: 0.3, ease: "power2.out" });
        });
        icon.addEventListener("mouseleave", () => {
            gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" });
        });
    });

    // Timeline & Experience
    gsap.utils.toArray(".timeline-item, .experience-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // Project Cards initial scroll animation
    gsap.utils.toArray(".project-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });

    // ==============================
    // PROJECT FILTER WITH SMOOTH ANIMATION
    // ==============================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;

            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                    gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
                } else {
                    gsap.to(card, { opacity: 0, y: 50, duration: 0.5, ease: "power2.out", onComplete: () => {
                        card.style.display = 'none';
                    }});
                }
            });
        });
    });

    // ==============================
    // SKILL PROGRESS BARS & FILTER
    // ==============================
    const skillItems = document.querySelectorAll(".skill-item");
    skillItems.forEach(item => {
        const level = item.getAttribute("data-skill");
        const bar = item.querySelector(".progress div");
        setTimeout(() => {
            bar.style.width = level + "%";
        }, 300);
    });

    const skillButtons = document.querySelectorAll(".filter-skills-btn");
    skillButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            skillButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            skillItems.forEach(item => {
                if (filter === "all") {
                    item.style.display = "flex";
                } else {
                    item.style.display = item.classList.contains(filter) ? "flex" : "none";
                }
            });
        });
    });

    // Default skill filter
    const defaultSkillFilter = document.querySelector('[data-filter="all"]');
    if (defaultSkillFilter) defaultSkillFilter.click();

    // ==============================
    // SORT PROJECT CARDS BY DATE
    // ==============================
    const cardsContainer = document.querySelector(".project-cards");
    if (cardsContainer) {
        const cards = Array.from(cardsContainer.children);
        cards.sort((a, b) => {
            const dateA = new Date(a.querySelector(".updated-date").textContent.replace(/Updated on |In Progress — started /, ''));
            const dateB = new Date(b.querySelector(".updated-date").textContent.replace(/Updated on |In Progress — started /, ''));
            return dateB - dateA;
        });
        cards.forEach(card => cardsContainer.appendChild(card));
    }

    // ==============================
    // CONTACT FORM SUBMISSION
    // ==============================
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            const response = document.querySelector(".form-response");
            if (response) response.textContent = "Thanks for reaching out! We'll contact you soon.";
            this.reset();
        });
    }

    // ==============================
    // DOWNLOAD CV BUTTON
    // ==============================
    const downloadBtn = document.getElementById("downloadCVBtn");

    // ==============================
    // ICON WRAPPER HIDE ON SCROLL
    // ==============================
    const iconWrapper = document.querySelector('.iconWrapper1');

    // ==============================
    // SCROLL EVENTS (Progress Bar, Arrow, CV Button, Icon Wrapper)
    // ==============================
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;

        // Scroll progress bar
        const scrollBar = document.getElementById("scrollBar");
        if (scrollBar) scrollBar.style.width = scrollPercent + "%";

        // Scroll up arrow
        const scrollArrow = document.getElementById("scrollArrow");
        if (scrollArrow) scrollArrow.style.display = scrollTop > 300 ? "block" : "none";

        // Scroll down arrow (optional)
        const scrollDownArrow = document.getElementById("scrollDownArrow");
        if (scrollDownArrow) scrollDownArrow.style.display = scrollTop < scrollHeight - 300 ? "block" : "none";

        // Show CV download button after 50%
        if (downloadBtn) scrollPercent >= 50 ? downloadBtn.classList.add("show") : downloadBtn.classList.remove("show");

        // Icon wrapper hide on scroll
        if (iconWrapper) iconWrapper.style.opacity = scrollTop > 2 ? '0' : '1';
    });

    // ==============================
    // SCROLL ARROWS CLICK EVENTS
    // ==============================
    const scrollUpArrow = document.getElementById("scrollArrow");
    if (scrollUpArrow) {
        scrollUpArrow.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const scrollDownArrow = document.getElementById("scrollDownArrow");
    if (scrollDownArrow) {
        scrollDownArrow.addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));
    }

}); // END DOMContentLoaded
const whatsappIcon = document.getElementById('whatsappIcon');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    if (whatsappIcon) {
        // Show icon only until 50% scroll
        whatsappIcon.style.display = scrollPercent < 50 ? 'flex' : 'none';
    }
});
