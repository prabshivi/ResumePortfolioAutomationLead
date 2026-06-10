gsap.registerPlugin(ScrollTrigger);

// Initial Hero Trigger Sequence
gsap.timeline()
    .to("#hero-tag", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
    .to("#hero-text", { opacity: 1, scale: 1, duration: 1.2, ease: "power4.out" }, "-=0.7")
    .to("#hero-subtext", { opacity: 1, duration: 1, ease: "power3.out" }, "-=0.9");

// Experience Scrollytelling Setup
const slides = gsap.utils.toArray(".exp-slide");
const engineTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#experience",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});
// Ensure GSAP and ScrollTrigger are loaded in your HTML <head>
const tl = gsap.timeline();

// Step 1: Initial Reveal Animation
tl.fromTo("#hero-name", 
  { 
    opacity: 0, 
    scale: 1.5, 
    color: "#ffffff" // Crisp white
  }, 
  { 
    opacity: 1, 
    scale: 1, 
    color: "#86868b", // Anodized aluminum grey
    duration: 2, 
    ease: "power4.out" 
  }
);
slides.forEach((slide, index) => {
    if (index === 0) {
        engineTimeline.to(slide, { opacity: 0, scale: 0.95, duration: 1, delay: 1 });
    } else {
        engineTimeline.to(slide, { opacity: 1, scale: 1, duration: 1 })
                      .to(slide, { opacity: 0, scale: 0.95, duration: 1 }, "+=1.2");
    }
});