document.addEventListener("DOMContentLoaded", () => {
  const scrollElements = document.querySelectorAll(".pricing-section, .contact-section, .site-footer");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active"); // element visible -> animate in
        } else {
          entry.target.classList.remove("active"); // element not visible -> animate out
        }
      });
    },
    {
      threshold: 0.1, // trigger when 10% visible
    }
  );

  scrollElements.forEach(el => {
    el.classList.add("scroll-animate"); // initial hidden state
    observer.observe(el);
  });
});
