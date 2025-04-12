// public/js/main.js

document.addEventListener("DOMContentLoaded", () => {
    const forms = document.querySelectorAll("form");
  
    forms.forEach((form) => {
      form.addEventListener("submit", (e) => {
        const confirmed = confirm("Are you sure you want to submit?");
        if (!confirmed) {
          e.preventDefault();
        }
      });
    });
  
    // Example toast logic (you can enhance this later)
    const flash = document.querySelector(".flash-message");
    if (flash) {
      setTimeout(() => {
        flash.style.display = "none";
      }, 3000);
    }
  });
  