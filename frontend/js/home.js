document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".hero-text h1", { opacity: 0, y: 50, duration: 1, delay: 0.3 });
    gsap.from(".hero-text p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
    gsap.to(".hero-image img", { opacity: 1, y: 0, duration: 1, delay: 0.7 });

    // Card Animation
    gsap.to(".card", {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".card",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    // Navbar Scroll Effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            document.querySelector("header").classList.add("scrolled");
        } else {
            document.querySelector("header").classList.remove("scrolled");
        }
    });
});
