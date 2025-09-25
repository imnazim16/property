// Mobile menu toggle
document
  .querySelector(".mobile-menu-btn")
  .addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.toggle("active");
  });

const counters = document.querySelectorAll(".counter");
let started = false; // to prevent re-triggering

function animateCounters() {
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200; // adjust speed

    let count = 0;
    const updateCounter = () => {
      count += increment;
      if (count < target) {
        counter.textContent = Math.ceil(count);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+"; // add plus sign
      }
    };
    updateCounter();
  });
}

// Trigger when section is visible
window.addEventListener("scroll", () => {
  const section = document.querySelector(".stats-section");
  const sectionTop = section.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (!started && sectionTop < windowHeight - 100) {
    animateCounters();
    started = true;
  }
});

document.getElementById("year").textContent = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".filter-tabs a");
  const cards = document.querySelectorAll(".property-card");
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const itemsPerPage = 6;
  let currentCategory = "all";
  let currentCount = itemsPerPage;

  // Function to filter cards
  function filterCards(category) {
    currentCategory = category;
    currentCount = itemsPerPage;

    let matchedCards = Array.from(cards).filter(
      (card) => category === "all" || card.classList.contains(category)
    );

    // Hide all first
    cards.forEach((c) => (c.style.display = "none"));

    // Show only first N
    matchedCards
      .slice(0, currentCount)
      .forEach((c) => (c.style.display = "block"));

    // Toggle Load More
    loadMoreBtn.style.display =
      matchedCards.length > itemsPerPage ? "inline-block" : "none";
  }

  // Function for load more
  function loadMore() {
    let matchedCards = Array.from(cards).filter(
      (card) =>
        currentCategory === "all" || card.classList.contains(currentCategory)
    );

    matchedCards
      .slice(0, currentCount + itemsPerPage)
      .forEach((c) => (c.style.display = "block"));
    currentCount += itemsPerPage;

    if (currentCount >= matchedCards.length) {
      loadMoreBtn.style.display = "none";
    }
  }

  // Tab click
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.getAttribute("href").substring(1);
      filterCards(target);
    });
  });

  // Load More click
  loadMoreBtn.addEventListener("click", loadMore);

  // Init with "all"
  filterCards("all");
});

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop default form submission

  let isValid = true;

  // Name
  const name = document.getElementById("name");
  if (name.value.trim().length < 3) {
    setError(name, "Name must be at least 3 characters");
    isValid = false;
  } else {
    clearError(name);
  }

  // Email
  const email = document.getElementById("email");
  const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!emailPattern.test(email.value.trim())) {
    setError(email, "Enter a valid email address");
    isValid = false;
  } else {
    clearError(email);
  }

  // Phone
  const phone = document.getElementById("phone");
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone.value.trim())) {
    setError(phone, "Phone must be 10 digits");
    isValid = false;
  } else {
    clearError(phone);
  }
  phone.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  // Message
  const message = document.getElementById("message");
  if (message.value.trim().length < 80) {
    setError(message, "Message must be at least 80 characters");
    isValid = false;
  } else {
    clearError(message);
  }

  // If valid
  if (isValid) {
    document.getElementById("success").textContent =
      "Form submitted successfully!";
    //alert("Form submitted successfully!");
    this.reset();
  }
});

// Helper functions
function setError(input, message) {
  const parent = input.parentElement;
  parent.querySelector(".error").innerText = message;
  input.style.borderColor = "red";
}
function clearError(input) {
  const parent = input.parentElement;
  parent.querySelector(".error").innerText = "";
  input.style.borderColor = "#ccc";
}
