// ==============================
// DOCUMENT READY
// ==============================
document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // HIDE ICONS ON PAGE LOAD
    // ==============================
    const gmailIcon = document.getElementById("gmailIcon");
    const whatsappIcon = document.getElementById("whatsappIcon");

    if (gmailIcon) {
        gmailIcon.style.display = "none";
        gmailIcon.style.opacity = "0";
        gmailIcon.style.pointerEvents = "none";
    }

    if (whatsappIcon) {
        whatsappIcon.style.display = "none";
        whatsappIcon.style.opacity = "0";
        whatsappIcon.style.pointerEvents = "none";
    }

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

    gsap.from(".img img", { opacity: 0, scale: 0.6, duration: 1, delay: 0.2, ease: "back.out(1.7)" });
    gsap.from(".titleIntroduction h3", { opacity: 0, y: -20, duration: 1, delay: 0.4 });
    gsap.from(".titleIntroduction h2", { opacity: 0, y: -20, duration: 1, delay: 0.6 });

    gsap.from(".iconWrapper i", { opacity: 0, y: -20, scale: 0.5, duration: 0.7, stagger: 0.1, delay: 0.8 });

    document.querySelectorAll(".iconWrapper i").forEach(icon => {
        icon.addEventListener("mouseenter", () => gsap.to(icon, { scale: 1.3, duration: 0.3 }));
        icon.addEventListener("mouseleave", () => gsap.to(icon, { scale: 1, duration: 0.3 }));
    });

    gsap.utils.toArray(".timeline-item, .experience-item").forEach(item => {
        gsap.from(item, {
            scrollTrigger: { trigger: item, start: "top 80%" },
            y: 50, opacity: 0, duration: 0.8
        });
    });

    gsap.utils.toArray(".project-card").forEach(card => {
        gsap.from(card, {
            scrollTrigger: { trigger: card, start: "top 90%" },
            y: 40, opacity: 0, duration: 0.6
        });
    });


    // ==============================
    // PROJECT FILTER
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
                    gsap.to(card, { opacity: 1, y: 0, duration: 0.5 });
                } else {
                    gsap.to(card, { opacity: 0, y: 50, duration: 0.5, onComplete: () => card.style.display = 'none' });
                }
            });
        });
    });


    // ==============================
    // SKILLS & PROGRESS BARS
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
            skillItems.forEach(item => {
                item.style.display = (filter === "all" || item.classList.contains(filter)) ? "flex" : "none";
            });
        });
    });

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
    // SCROLL EVENTS
    // ==============================
    const scrollArrow = document.getElementById("scrollArrow");
    const scrollDownArrow = document.getElementById("scrollDownArrow");
    const downloadBtn = document.getElementById("downloadCVBtn");
    const footer = document.querySelector("footer");

    window.addEventListener("scroll", () => {

        const scrollTop = window.scrollY;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        const viewportBottom = scrollTop + window.innerHeight;
        const footerTop = footer ? footer.offsetTop : document.body.scrollHeight;

        // Scroll Up Arrow
        if (scrollArrow) {
            scrollArrow.style.display = (scrollTop > 300 && viewportBottom < footerTop) ? "block" : "none";
        }

        // Scroll Down Arrow
        if (scrollDownArrow) {
            scrollDownArrow.style.display = (scrollTop < scrollHeight - 300) ? "block" : "none";
        }

        // Download CV Button
        if (downloadBtn) {
            const btnRect = downloadBtn.getBoundingClientRect();
            const btnBottom = scrollTop + btnRect.bottom;

            if (scrollPercent >= 50 && btnBottom < footerTop) {
                downloadBtn.classList.add("show");
            } else {
                downloadBtn.classList.remove("show");
            }
        }
// ==============================
// SCROLL TO TOP BUTTON CLICK
// ==============================
const scrollArrowBtn = document.getElementById("scrollArrow");

if (scrollArrowBtn) {
    scrollArrowBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

        // Icon wrapper fade
       const arrowWrapper = document.querySelector(".iconWrapper1");
const header = document.querySelector(".HeaderContainer");

if (arrowWrapper && header) {
    // Hide arrow initially
    arrowWrapper.style.display = "none";
    arrowWrapper.style.opacity = "0";

    // Show arrow only if in header area
    window.addEventListener("scroll", () => {
        const scrollTop = window.scrollY;
        const headerBottom = header.offsetTop + header.offsetHeight;

        if (scrollTop < headerBottom) {
            arrowWrapper.style.display = "flex"; // show
            arrowWrapper.style.opacity = "1";
        } else {
            arrowWrapper.style.display = "none"; // hide when scroll out of header
            arrowWrapper.style.opacity = "0";
        }
    });
}


        // ==============================
        // WHATSAPP ICON LOGIC
        // ==============================
        if (header && whatsappIcon) {
            const headerBottom = header.offsetTop + header.offsetHeight;

            if (scrollTop < headerBottom) {
                whatsappIcon.style.display = "none";
                return;
            }

            if (scrollPercent > 50) {
                whatsappIcon.style.display = "none";
            } else {
                whatsappIcon.style.display = "flex";
                whatsappIcon.style.opacity = "1";
                whatsappIcon.style.pointerEvents = "auto";
            }
        }
    });


}); // END DOMContentLoaded


// ==============================
// GMAIL ICON LOGIC
// ==============================
const myEmail = "muaddhalsway@gmail.com";
const subject = " ";
const body = "How can I help you?";

const emailLink = document.getElementById("contactEmail");
const gmailIcon = document.getElementById("gmailIcon");

function openGmail() {
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(myEmail)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailURL, "_blank");
}

if (emailLink) emailLink.addEventListener("click", e => { e.preventDefault(); openGmail(); });
if (gmailIcon) gmailIcon.addEventListener("click", e => { e.preventDefault(); openGmail(); });


// Show Gmail icon only near footer
window.addEventListener("scroll", () => {

    if (!gmailIcon) return;

    const scrollTop = window.scrollY;
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
});
window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;

    const scrollBar = document.getElementById("scrollBar");
    if (scrollBar) {
        scrollBar.style.width = scrollPercent + "%";
    }

    // ... your existing scroll logic for Gmail/WhatsApp/icons etc.
});