// Navigation functionality
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector("header");
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
});
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    });
});
// Header scroll effect
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ============================
// Dark / Light Mode Toggle
// ============================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const body = document.body;

function applyTheme(theme) {
    if (theme === "dark") {
        body.classList.add("dark-mode");
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    } else {
        body.classList.remove("dark-mode");
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    }
}

// Load saved preference (defaults to light if none saved)
const savedTheme = localStorage.getItem("ek-theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const isDark = body.classList.contains("dark-mode");
    const newTheme = isDark ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("ek-theme", newTheme);
});

// ============================
// Projects scroll functionality (with infinite loop)
// ============================
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");
const projectsScroll = document.getElementById("projects-scroll");

// Clone all original project cards and append/prepend them so the
// carousel can loop seamlessly in both directions.
const originalCards = Array.from(projectsScroll.children);
const cardWidth = 350 + 30; // card width + gap, matches CSS

originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    projectsScroll.appendChild(clone);
});
originalCards.forEach(card => {
    const clone = card.cloneNode(true);
    projectsScroll.insertBefore(clone, projectsScroll.firstChild);
});

// Re-attach lightbox listeners to the newly cloned images
attachLightboxListeners();

const setWidth = originalCards.length * cardWidth;

// Start the view in the middle (original) set, without animating
projectsScroll.scrollLeft = setWidth;

function loopCheck() {
    // If we've scrolled into the cloned set on the right, jump back
    if (projectsScroll.scrollLeft >= setWidth * 2) {
        projectsScroll.scrollLeft -= setWidth;
    }
    // If we've scrolled into the cloned set on the left, jump forward
    if (projectsScroll.scrollLeft <= 0) {
        projectsScroll.scrollLeft += setWidth;
    }
}

let scrollTimeout;
projectsScroll.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(loopCheck, 120);
});

scrollLeftBtn.addEventListener("click", () => {
    projectsScroll.scrollBy({ left: -cardWidth, behavior: 'smooth' });
});
scrollRightBtn.addEventListener("click", () => {
    projectsScroll.scrollBy({ left: cardWidth, behavior: 'smooth' });
});

// ============================
// Lightbox for project images
// ============================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.getElementById("lightbox-close");

function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || "";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function attachLightboxListeners() {
    document.querySelectorAll(".project-image img").forEach(img => {
        // Avoid double-binding the same image
        if (img.dataset.lightboxBound) return;
        img.dataset.lightboxBound = "true";
        img.addEventListener("click", () => {
            openLightbox(img.src, img.alt);
        });
    });
}

attachLightboxListeners();

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
    }
});
