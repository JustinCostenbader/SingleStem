document.addEventListener('DOMContentLoaded', function() {
  // Check if config was loaded
  if (!window.CONFIG?.GAS_URL) {
    const errorMsg = "Configuration error - please check config.js";
    console.error(errorMsg);
    const formMessage = document.getElementById('formMessage');
    if (formMessage) {
      formMessage.textContent = errorMsg;
      formMessage.style.color = 'red';
    }
    return;
  }

  const form = document.forms['contact-form'];
  const scriptURL = window.CONFIG.GAS_URL;

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = document.getElementById('submit');
      const formMessage = document.getElementById('formMessage');
      
      // Client-side validation
      if (!form.name.value || !form.service.value || (!form.email.value && !form.phone.value)) {
        formMessage.textContent = 'Please fill all required fields';
        formMessage.style.color = 'red';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.value = 'Sending...';

      fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
      })
      .then(response => {
        formMessage.textContent = 'Submitted successfully! We\'ll contact you soon.';
        formMessage.style.color = 'white';
        form.reset();
      })
      .catch(error => {
        console.error('Error!', error);
        formMessage.textContent = 'Error submitting form. Please try again.';
        formMessage.style.color = 'red';
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.value = 'Submit Request';
      });
    });
  }
});