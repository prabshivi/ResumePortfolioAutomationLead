// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {

    // 1. Fluid Hero Reveal Stage Timeline
    const heroTl = gsap.timeline();
    heroTl.from('.hero-title', {
        opacity: 0,
        y: 30,
        scale: 0.98,
        duration: 1.2,
        ease: 'power4.out'
    })
    .from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.8')
    .from('.hero-badge', {
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: 'back.out(1.7)'
    }, '-=0.4');

    // 2. Scroll-Locked Keynote Timeline Automation Loop
    const slides = gsap.utils.toArray('.timeline-slide');
    
    // Create an orchestration timeline linked to active viewport scroll position
    const mainTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '#experience',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1, // Smoothly ties interactions directly to tracking distance
            pin: '.sticky-container', // Locks viewport while playing content
        }
    });

    // Cycle through slides and fade them sequentially in and out
    slides.forEach((slide, idx) => {
        // Fade in
        mainTimeline.to(slide, {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power2.inOut'
        });
        
        // Hold item and fade out (unless it's the last dashboard section)
        if (idx < slides.length - 1) {
            mainTimeline.to(slide, {
                opacity: 0,
                scale: 0.95,
                duration: 1,
                ease: 'power2.inOut'
            });
        }
    });
});

// 3. Scroll-Reactive Doodle Animation Engine
    gsap.to("#scrolling-doodle", {
        scrollTrigger: {
            trigger: "body",       // Tracks scroll distance across the whole page
            start: "top top",      // Animation starts at the very peak of the site
            end: "bottom bottom",  // Animation reaches 100% at the footer
            scrub: 0.5,            // Smooth catching up delay (0.5 seconds) for micro-fluidity
        },
        rotation: 360,             // Smoothly spins the doodle in a full circle as you go top-to-bottom
        scale: 1.2,                // Gradually expands the doodle size slightly by the time they reach the end
        transformOrigin: "center center"
    });

    // Optional: Make the doodle bounce playfully on every wheel tick
    window.addEventListener("wheel", (e) => {
        gsap.to("#scrolling-doodle", {
            y: e.deltaY > 0 ? 15 : -15, // Dips down scrolling down, pops up scrolling up
            duration: 0.2,
            yoyo: true,                 // Snaps back immediately
            repeat: 1,
            ease: "power1.out"
        });
    });