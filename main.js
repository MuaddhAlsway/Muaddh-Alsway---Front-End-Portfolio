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
    gsap.from(".img img", { opacity: 0, scale: 0.6, duration: 1, delay: 0.2, ease: "back.out(1.7)" });
    gsap.from(".titleIntroduction h3", { opacity: 0, y: -20, duration: 1, delay: 0.4, ease: "power2.out" });
    gsap.from(".titleIntroduction h2", { opacity: 0, y: -20, duration: 1, delay: 0.6, ease: "power2.out" });

    // Social Icons animation + hover
    gsap.from(".iconWrapper i", { opacity: 0, y: -20, scale: 0.5, duration: 0.7, stagger: 0.1, delay: 0.8, ease: "back.out(1.7)" });
    document.querySelectorAll(".iconWrapper i").forEach(icon => {
        icon.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.3, duration: 0.3, ease: "power2.out" }));
        icon.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, duration: 0.3, ease: "power2.out" }));
    });

    // Timeline & Experience
    gsap.utils.toArray(".timeline-item, .experience-item ").forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 80%", toggleActions: "play reverse play reverse" },
            y: 50, opacity: 0, duration: 0.8, ease: "power2.out"
        });
    });

    // Project Cards initial scroll animation
    gsap.utils.toArray(".project-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play reverse play reverse" },
            y: 40, opacity: 0, duration: 0.6, ease: "power2.out"
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
                    gsap.to(card, { opacity: 0, y: 50, duration: 0.5, ease: "power2.out", onComplete: () => card.style.display = 'none' });
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
        setTimeout(() => bar.style.width = level + "%", 300);
    });

    const skillButtons = document.querySelectorAll(".filter-skills-btn");
    skillButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            skillButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-filter");
            skillItems.forEach(item => item.style.display = (filter === "all" || item.classList.contains(filter)) ? "flex" : "none");
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
    // DOWNLOAD CV BUTTON & ICON WRAPPER
    // ==============================
    const downloadBtn = document.getElementById("downloadCVBtn");
    const iconWrapper = document.querySelector('.iconWrapper1');
    const scrollUpArrow = document.getElementById("scrollArrow");
    const scrollDownArrow = document.getElementById("scrollDownArrow");
    const whatsappIcon = document.getElementById('whatsappIcon');
    const footer = document.querySelector("footer");

    window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    const scrollBar = document.getElementById("scrollBar");
    const scrollArrow = document.getElementById("scrollArrow");
    const scrollDownArrow = document.getElementById("scrollDownArrow");
    const downloadBtn = document.getElementById("downloadCVBtn");
    const iconWrapper = document.querySelector('.iconWrapper1');
    const whatsappIcon = document.getElementById('whatsappIcon');
    const footer = document.querySelector("footer");

    // Update scroll progress bar
    if (scrollBar) scrollBar.style.width = scrollPercent + "%";

    // Get positions
    const viewportBottom = scrollTop + window.innerHeight;
    const footerTop = footer ? footer.offsetTop : document.body.scrollHeight;

    // Scroll up arrow: show after 300px, hide near footer
    if (scrollArrow) {
        scrollArrow.style.display = (scrollTop > 300 && viewportBottom < footerTop) ? "block" : "none";
    }

    // Scroll down arrow (optional)
    if (scrollDownArrow) {
        scrollDownArrow.style.display = (scrollTop < scrollHeight - 300) ? "block" : "none";
    }

    // Download CV button: show after 50%, hide before footer
    if (downloadBtn) {
        const btnRect = downloadBtn.getBoundingClientRect();
        const btnBottom = scrollTop + btnRect.bottom; // Absolute position of button bottom
        if (scrollPercent >= 50 && btnBottom < footerTop) {
            downloadBtn.classList.add("show");
        } else {
            downloadBtn.classList.remove("show");
        }
    }

    // Icon wrapper fade
    if (iconWrapper) iconWrapper.style.opacity = scrollTop > 2 ? '0' : '1';

const header = document.querySelector(".HeaderContainer");

if (header && whatsappIcon) {
    const headerBottom = header.offsetTop + header.offsetHeight;

    // If user is still in header → hide
    if (scrollTop < headerBottom) {
        whatsappIcon.style.display = "none";
        return;
    }

    // Calculate scroll %
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    // If scroll > 50% → hide
    if (scrollPercent > 50) {
        whatsappIcon.style.display = "none";
    } 
    else {
        // Between header bottom and 50% → show
        whatsappIcon.style.display = "flex";
    }
}


});


    // ==============================
    // SCROLL ARROWS CLICK EVENTS
    // ==============================
    if (scrollUpArrow) scrollUpArrow.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    if (scrollDownArrow) scrollDownArrow.addEventListener("click", () => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }));

}); // END DOMContentLoaded


const myEmail = "muaddhalsway@gmail.com";
const subject = " ";
const body = "How can I help you?";

const emailLink = document.getElementById("contactEmail");
const gmailIcon = document.getElementById("gmailIcon");

// Function to open Gmail compose
function openGmail() {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailURL, "_blank");
}

// Attach click events
if (emailLink) emailLink.addEventListener("click", e => { e.preventDefault(); openGmail(); });
if (gmailIcon) gmailIcon.addEventListener("click", e => { e.preventDefault(); openGmail(); });
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    // Distance from bottom
    const distanceFromBottom = docHeight - (scrollTop + windowHeight);

    // 30% of document height from bottom
    const showTrigger = docHeight * 0.03;

    if (distanceFromBottom <= showTrigger) {
        // Show Gmail icon
        gmailIcon.style.opacity = "1";
        
        gmailIcon.style.pointerEvents = "auto";
    } else {
        // Hide Gmail icon
        gmailIcon.style.opacity = "0";
        gmailIcon.style.pointerEvents = "none";
    }
});