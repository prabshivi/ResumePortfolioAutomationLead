// Ensure GSAP core plugin layer initializes safely
gsap.registerPlugin(ScrollTrigger);

// 1. Light Mode Display Boot Sequences (Phased Entry Animation)
gsap.timeline()
    .to("#hero-tag", { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
    })
    .to("#hero-text", { 
        opacity: 1, 
        scale: 1, 
        duration: 1.4, 
        ease: "power4.out" 
    }, "-=0.7")
    .to("#hero-subtext", { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power3.out" 
    }, "-=0.9");

// 2. Continuous Viewport Tracking Scrollytelling Mechanics
const slides = gsap.utils.toArray(".exp-slide");
const engineTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#experience",
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth interpolation linked straight to scroll position
    }
});

// Structural pass managing clean alpha fading timelines across scrolls
slides.forEach((slide, index) => {
    if (index === 0) {
        // Holds entry banner view stable briefly before dimming out
        engineTimeline.to(slide, { opacity: 0, scale: 0.95, duration: 1, delay: 1 });
    } else {
        // Moves item into crisp view perspective, locks it, then steps it out
        engineTimeline.to(slide, { opacity: 1, scale: 1, duration: 1 })
                      .to(slide, { opacity: 0, scale: 0.95, duration: 1 }, "+=1.2");
    }
});