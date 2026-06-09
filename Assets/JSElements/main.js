/**
 * Shivi Prabhakar Portfolio 3D WebGL & GSAP Animation Core
 * Integrating dynamic mouse tracking, custom geometry generation,
 * and seamless scroll-responsive physics for Zack3D Mascot.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Core Visual Intro Animations (GSAP) ---
    if (typeof gsap !== 'undefined') {
        gsap.from('#hero-title', {
            opacity: 0,
            y: 40,
            duration: 1.2,
            ease: 'power4.out'
        });

        gsap.from('#hero-subtitle', {
            opacity: 0,
            y: 30,
            duration: 1.2,
            delay: 0.3,
            ease: 'power4.out'
        });

        // Elegant fade-in for timeline entries on scroll
        gsap.utils.toArray('.timeline-slide').forEach(item => {
            gsap.from(item, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none none'
                }
            });
        });
    }

    // --- 2. Interactive Three.js 3D Mascot Engine ---
    const canvas = document.getElementById('canvas3d');
    const speechBubble = document.getElementById('doodle-speech');
    const container = document.getElementById('doodle-container');

    if (canvas && typeof THREE !== 'undefined') {
        const width = canvas.clientWidth || 150;
        const height = canvas.clientHeight || 150;

        // Create 3D Scene & Perspective Camera
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
        camera.position.set(0, 0, 5);

        // Alpha: true ensures transparent background so canvas sits perfectly over layout
        const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create a Group to hold all 3D components for easy animations
        const mascotGroup = new THREE.Group();
        scene.add(mascotGroup);

        // --- Premium Material & Dynamic Lighting Setup ---
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0x007aff, 1.2);
        dirLight.position.set(5, 5, 5);
        scene.add(dirLight);

        const pointLight = new THREE.PointLight(0xff2d55, 1.5, 10);
        pointLight.position.set(-2, -2, 2);
        scene.add(pointLight);

        // --- Build Zack3D Procedural Companion Mascot (Fallback/Default Mesh) ---
        // Head
        const headGeo = new THREE.SphereGeometry(1, 32, 32);
        const headMat = new THREE.MeshStandardMaterial({
            color: 0x007aff,       // Apple signature blue
            roughness: 0.15,
            metalness: 0.8,
            flatShading: false
        });
        const head = new THREE.Mesh(headGeo, headMat);
        mascotGroup.add(head);

        // Right Glowing Eye
        const eyeGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.2, 16);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x54f4ff });
        const rightEye = new THREE.Mesh(eyeGeo, eyeMat);
        rightEye.rotation.x = Math.PI / 2;
        rightEye.position.set(0.35, 0.15, 0.85);
        mascotGroup.add(rightEye);

        // Left Glowing Eye
        const leftEye = rightEye.clone();
        leftEye.position.x = -0.35;
        mascotGroup.add(leftEye);

        // Dynamic Glowing Visor / Antenna
        const visorGeo = new THREE.BoxGeometry(1.2, 0.15, 0.25);
        const visorMat = new THREE.MeshStandardMaterial({ color: 0x1d1d1f, roughness: 0.4 });
        const visor = new THREE.Mesh(visorGeo, visorMat);
        visor.position.set(0, 0.15, 0.8);
        mascotGroup.add(visor);

        const antennaGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.5, 8);
        const antenna = new THREE.Mesh(antennaGeo, visorMat);
        antenna.position.set(0, 1.2, 0);
        mascotGroup.add(antenna);

        const tipGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const tipMat = new THREE.MeshBasicMaterial({ color: 0xff2d55 }); // Glowing pink indicator tip
        const tip = new THREE.Mesh(tipGeo, tipMat);
        tip.position.set(0, 1.5, 0);
        mascotGroup.add(tip);

        // --- OPTIONAL: Custom GLTF (.glb) File Loader Template ---
        // Once you've designed your custom GLTF avatar, drop it inside Assets/CSSElements/my-avatar.glb and uncomment the block below:
        /*
        const loader = new THREE.GLTFLoader();
        loader.load('Assets/CSSElements/my-avatar.glb', (gltf) => {
            // Remove the default procedural geometries
            mascotGroup.clear();
            
            // Add your premium customized 3D avatar
            const avatar = gltf.scene;
            avatar.scale.set(1.5, 1.5, 1.5);
            avatar.position.y = -1; // Center model properly in viewport
            mascotGroup.add(avatar);
        }, undefined, (error) => {
            console.log('Using procedural glowing fallback mascot.');
        });
        */

        // --- 3. Interactive Physics & Input Listeners ---
        const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
        
        // Track cursor coordinates across entire viewport
        window.addEventListener('mousemove', (event) => {
            // Normalize cursor position between -1 and 1
            mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Interactive Speech Array triggered during scroll progression
        const phrases = [
            "Initializing automation metrics... ⚙️",
            "Synthesizing Selenium parameters... 📈",
            "Testing pipeline parameters... 📊",
            "Regression suite passed! 🟢",
            "Deploying custom WebGL elements... 🎨",
            "Zack 3D active & monitoring! 🐾"
        ];

        let lastScrollTop = 0;
        let scrollTimeout = null;

        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            const delta = currentScroll - lastScrollTop;
            lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;

            // Rotate mascot dynamically along both Z and Y dimensions on scroll
            mascotGroup.rotation.y += delta * 0.015;
            mascotGroup.rotation.x += Math.min(Math.max(delta * 0.005, -0.3), 0.3);
            mascotGroup.position.y = Math.sin(currentScroll * 0.05) * 0.12;

            // Present the speech bubble
            speechBubble.style.opacity = '1';
            speechBubble.style.transform = 'scale(1) translateY(0px)';

            // Select active speech indexes
            const phraseIndex = Math.floor((currentScroll / 220) % phrases.length);
            speechBubble.innerHTML = phrases[phraseIndex];

            // Reset transitions cleanly on scroll end
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                speechBubble.style.opacity = '0';
                speechBubble.style.transform = 'scale(0.9) translateY(12px)';
            }, 1200);
        });

        // Click Event: Trigger high-velocity jump animation via GSAP
        if (container) {
            container.addEventListener('click', () => {
                speechBubble.innerHTML = "Deploying production build! 🚀🎉";
                speechBubble.style.opacity = '1';
                speechBubble.style.transform = 'scale(1) translateY(0px)';

                if (typeof gsap !== 'undefined') {
                    // Full 360 spin and upward bounce jump!
                    gsap.to(mascotGroup.position, {
                        y: 1.5,
                        duration: 0.4,
                        yoyo: true,
                        repeat: 1,
                        ease: 'power2.out'
                    });
                    gsap.to(mascotGroup.rotation, {
                        y: mascotGroup.rotation.y + Math.PI * 2,
                        duration: 0.8,
                        ease: 'power1.inOut'
                    });
                }

                setTimeout(() => {
                    speechBubble.style.opacity = '0';
                    speechBubble.style.transform = 'scale(0.9) translateY(12px)';
                }, 2200);
            });
        }

        // --- Render Loop (Smooth requestAnimationFrame loop) ---
        const clock = new THREE.Clock();

        function animate() {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Continuous idle float (simulating physical anti-gravity engine)
            mascotGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
            tip.material.color.setHSL((elapsedTime * 0.1) % 1.0, 0.8, 0.5); // Color shifting indicator

            // Clean, progressive mouse tracking look-at constraints
            mouse.x += (mouse.targetX - mouse.x) * 0.08;
            mouse.y += (mouse.targetY - mouse.y) * 0.08;

            // Make mascot turn towards cursor
            mascotGroup.rotation.y = mouse.x * 0.6;
            mascotGroup.rotation.x = -mouse.y * 0.4;

            renderer.render(scene, camera);
        }

        animate();

        // Canvas Window Resizing Listener
        window.addEventListener('resize', () => {
            const newWidth = canvas.clientWidth || 150;
            const newHeight = canvas.clientHeight || 150;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        });
    }
});