// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 1. Initial Hero Intro Animations
gsap.to("#hero-text", { 
    opacity: 1, 
    scale: 1, 
    duration: 1.4, 
    ease: "power4.out" 
});

gsap.to("#hero-subtext", { 
    opacity: 1, 
    duration: 1.2, 
    delay: 0.5, 
    ease: "power3.out" 
});

// 2. Timeline Dynamic Scrollytelling Setup
const slides = gsap.utils.toArray(".exp-slide");
const timeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#experience",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smoothly ties scrolling mechanics directly to page scrollbars
    }
});

// Programmatic calculation loop to fade slides seamlessly during scrolling
slides.forEach((slide, index) => {
    if (index === 0) {
        // Keeps the initial placeholder header stable before transitioning out
        timeline.to(slide, { opacity: 0, duration: 1, delay: 1 });
    } else {
        // Transitions new slides up, pauses for reading view, then steps out cleanly
        timeline.to(slide, { opacity: 1, duration: 1 })
                .to(slide, { opacity: 0, duration: 1 }, "+=1");
    }
});