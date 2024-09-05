// Select all sections and menu links
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("ul li a");

// Function to remove 'active' class from all links
const removeActiveClasses = () => {
  navLinks.forEach((link) => link.classList.remove("active"));
};

// Function to add 'active' class to the current link and update the hash
const addActiveClassAndUpdateHash = (link, sectionId) => {
  link.classList.add("active");
  window.history.pushState(null, null, `#${sectionId}`); // Update the URL hash
};

// Create an Intersection Observer to track sections
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove 'active' class from all links
        removeActiveClasses();

        // Add 'active' class to the current section's link and update the hash
        const currentLink = document.querySelector(
          `ul li a[href="#${entry.target.id}"]`
        );
        addActiveClassAndUpdateHash(currentLink, entry.target.id);
      }
    });
  },
  {
    threshold: 0.3, // Adjusted threshold to 0.3 for better detection
  }
);

// Observe each section
sections.forEach((section) => observer.observe(section));

// Update the hash when clicking on a link directly
document.querySelectorAll("ul li a").forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    removeActiveClasses();
    addActiveClassAndUpdateHash(this, this.getAttribute("href").substring(1));

    // Scroll to the selected section smoothly
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.querySelector(".nav-toggler").addEventListener("click", function () {
  document.querySelector(".aside").classList.toggle("active");
});
