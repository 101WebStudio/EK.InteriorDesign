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

        // Projects scroll functionality
        const scrollLeft = document.getElementById("scroll-left");
        const scrollRight = document.getElementById("scroll-right");
        const projectsScroll = document.querySelector(".projects-scroll");

        scrollLeft.addEventListener("click", () => {
            projectsScroll.scrollBy({ left: -350, behavior: 'smooth' });
        });

        scrollRight.addEventListener("click", () => {
            projectsScroll.scrollBy({ left: 350, behavior: 'smooth' });
        });