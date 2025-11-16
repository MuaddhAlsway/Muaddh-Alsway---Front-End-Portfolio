 const contactForm = document.getElementById('contactForm');
  const emailInput = document.getElementById('email');
  const responseMsg = document.querySelector('.form-response');

  contactForm.addEventListener('submit', function(e) {
    const email = emailInput.value.trim();
    const gmailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    // Check if email is Gmail
    if (!gmailPattern.test(email)) {
      e.preventDefault(); // Stop form submission
      responseMsg.textContent = "❌ Please enter a valid Gmail address!";
      responseMsg.className = "form-response error";
      return;
    }

    // Optional: show message while submitting
    responseMsg.textContent = "Sending your message...";
    responseMsg.className = "form-response success";
  });