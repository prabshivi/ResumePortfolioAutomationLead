gsap.registerPlugin(ScrollTrigger);

// -------------------------------------------------------------
// 1. Initial Hero Fade Sequence (Preserving original tween logic)
// -------------------------------------------------------------
const heroTl = gsap.timeline();
heroTl.to("#hero-tag", { opacity: 1, y: 0, duration: 1, ease: "power3.out" })
      .fromTo("#hero-text", 
          { opacity: 0, scale: 1.5 }, 
          { opacity: 1, scale: 1, duration: 2, ease: "power4.out" }, 
          "-=0.7"
      )
      .to("#hero-subtext", { opacity: 1, duration: 1, ease: "power3.out" }, "-=1.4");

// -------------------------------------------------------------
// 2. Three.js Real-time 3D Realistic Scene Setup
// -------------------------------------------------------------
const container = document.getElementById("three-canvas-container");
let scene, camera, renderer;
let nodes = [];
let nodeGroup, connectionGeometry;
let torusMesh, icoMesh;
let ambientLight, dirLight, bluePoint, violetPoint;

// GSAP-controlled configuration object for scroll scrollytelling
const threeConfig = {
    camX: 0,
    camY: 0,
    camZ: 9,
    rotX: 0,
    rotY: 0,
    rotZ: 0,
    torusScale: 1,
    icoScale: 1,
    particleSpeed: 1
};

function initThree() {
    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(threeConfig.camX, threeConfig.camY, threeConfig.camZ);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // Lights
    ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Pulsing colored point lights to create a neon cyber glow
    bluePoint = new THREE.PointLight(0x00d2ff, 4, 15);
    scene.add(bluePoint);

    violetPoint = new THREE.PointLight(0x9d4edd, 4, 15);
    scene.add(violetPoint);

    // Floating Sculptures (Torus and Icosahedron)
    // 1. Torus (Glassmorphic QA Loop)
    const torusGeo = new THREE.TorusGeometry(2.2, 0.45, 32, 100);
    const torusMat = new THREE.MeshPhysicalMaterial({
        color: 0x007aff,
        metalness: 0.9,
        roughness: 0.05,
        transmission: 0.7,
        thickness: 1.5,
        transparent: true,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1
    });
    torusMesh = new THREE.Mesh(torusGeo, torusMat);
    torusMesh.position.set(4, 1.5, -1);
    scene.add(torusMesh);

    // 2. Icosahedron (Security Core Node)
    const icoGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const icoMat = new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        metalness: 0.95,
        roughness: 0.15
    });
    icoMesh = new THREE.Mesh(icoGeo, icoMat);
    icoMesh.position.set(-4.5, -2, -1.5);
    scene.add(icoMesh);

    // Dynamic QA Connecting Node Graph
    nodeGroup = new THREE.Group();
    scene.add(nodeGroup);

    const nodeCount = 35;
    const sphereGeo = new THREE.SphereGeometry(0.06, 16, 16);
    const sphereMat = new THREE.MeshStandardMaterial({
        color: 0x007aff,
        emissive: 0x007aff,
        emissiveIntensity: 0.6,
        metalness: 0.8,
        roughness: 0.2
    });

    for (let i = 0; i < nodeCount; i++) {
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.position.set(
            (Math.random() - 0.5) * 14,
            (Math.random() - 0.5) * 9,
            (Math.random() - 0.5) * 8 - 2
        );
        mesh.userData = {
            vx: (Math.random() - 0.5) * 0.003,
            vy: (Math.random() - 0.5) * 0.003,
            vz: (Math.random() - 0.5) * 0.003,
            ox: mesh.position.x,
            oy: mesh.position.y,
            oz: mesh.position.z
        };
        nodeGroup.add(mesh);
        nodes.push(mesh);
    }

    // Dynamic Connections Line Segment Mesh
    connectionGeometry = new THREE.BufferGeometry();
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x4f46e5,
        transparent: true,
        opacity: 0.15
    });
    const connectionLines = new THREE.LineSegments(connectionGeometry, lineMat);
    scene.add(connectionLines);

    // Event listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
}

// Mouse coordinates
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

function onMouseMove(event) {
    // Normalised coordinates (-0.5 to 0.5)
    targetMouseX = (event.clientX / window.innerWidth) - 0.5;
    targetMouseY = (event.clientY / window.innerHeight) - 0.5;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Smooth lerp for mouse coordinates to introduce fluid inertia
    mouseX += (targetMouseX - mouseX) * 0.08;
    mouseY += (targetMouseY - mouseY) * 0.08;

    // 1. Dynamic Studio Light Tracker
    dirLight.position.x = 5 + mouseX * 12;
    dirLight.position.y = 5 - mouseY * 12;

    // Orbiting cyber glow lights
    bluePoint.position.x = Math.sin(time * 0.6) * 5;
    bluePoint.position.y = Math.cos(time * 0.4) * 4;
    bluePoint.position.z = Math.sin(time * 0.3) * 3 + 1;

    violetPoint.position.x = Math.cos(time * 0.5) * 5;
    violetPoint.position.y = Math.sin(time * 0.7) * 4;
    violetPoint.position.z = Math.cos(time * 0.4) * 3 + 1;

    // 2. Slow asset auto-rotation & tilt
    if (torusMesh) {
        torusMesh.rotation.x = time * 0.15 + mouseY * 0.5;
        torusMesh.rotation.y = time * 0.2 + mouseX * 0.5;
        torusMesh.scale.setScalar(threeConfig.torusScale);
    }
    if (icoMesh) {
        icoMesh.rotation.x = -time * 0.1 - mouseY * 0.3;
        icoMesh.rotation.y = time * 0.15 - mouseX * 0.3;
        icoMesh.scale.setScalar(threeConfig.icoScale);
    }

    // 3. Float & Connecting Lines recalculation
    const linePositions = [];
    const maxDist = 2.8;

    for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        n1.position.x += n1.userData.vx * threeConfig.particleSpeed;
        n1.position.y += n1.userData.vy * threeConfig.particleSpeed;
        n1.position.z += n1.userData.vz * threeConfig.particleSpeed;

        // Soft elastic constraints to keep particles around origin
        if (Math.abs(n1.position.x - n1.userData.ox) > 2) n1.userData.vx *= -1;
        if (Math.abs(n1.position.y - n1.userData.oy) > 2) n1.userData.vy *= -1;
        if (Math.abs(n1.position.z - n1.userData.oz) > 2) n1.userData.vz *= -1;

        // Line links
        for (let j = i + 1; j < nodes.length; j++) {
            const n2 = nodes[j];
            const dist = n1.position.distanceTo(n2.position);
            if (dist < maxDist) {
                linePositions.push(n1.position.x, n1.position.y, n1.position.z);
                linePositions.push(n2.position.x, n2.position.y, n2.position.z);
            }
        }
    }

    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    connectionGeometry.attributes.position.needsUpdate = true;

    // 4. Sync camera targets (GSAP properties + mouse inertia offset)
    camera.position.x = threeConfig.camX + mouseX * 1.5;
    camera.position.y = threeConfig.camY - mouseY * 1.5;
    camera.position.z = threeConfig.camZ;
    camera.rotation.x = threeConfig.rotX + mouseY * 0.1;
    camera.rotation.y = threeConfig.rotY + mouseX * 0.1;

    renderer.render(scene, camera);
}

// Start Three.js
initThree();
animate();

// -------------------------------------------------------------
// 3. Experience Scrollytelling Setup (Linked camera animations)
// -------------------------------------------------------------
const slides = gsap.utils.toArray(".exp-slide");
const engineTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#experience",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
    }
});

slides.forEach((slide, index) => {
    // Base Slide Fades (Preserved)
    if (index === 0) {
        engineTimeline.to(slide, { opacity: 0, scale: 0.95, duration: 1, delay: 1 });
        // Scroll Camera into Slide 2 region
        engineTimeline.to(threeConfig, {
            camX: 2,
            camY: -0.5,
            camZ: 7,
            rotY: 0.25,
            torusScale: 1.15,
            icoScale: 0.8,
            duration: 1
        }, "<");
    } else {
        engineTimeline.to(slide, { opacity: 1, scale: 1, duration: 1 })
                      .to(slide, { opacity: 0, scale: 0.95, duration: 1 }, "+=1.2");

        // camera sweeps matching timeline steps
        if (index === 1) {
            // Sweep toward Empire Life (emerald theme - fly near torus)
            engineTimeline.to(threeConfig, {
                camX: -2.5,
                camY: 0.8,
                camZ: 6.5,
                rotY: -0.3,
                torusScale: 0.9,
                icoScale: 1.25,
                particleSpeed: 1.8,
                duration: 1
            }, `-=${1.8}`);
        } else if (index === 2) {
            // Sweep toward RBC (purple theme - fly near icosahedron)
            engineTimeline.to(threeConfig, {
                camX: 2.5,
                camY: -0.8,
                camZ: 6.5,
                rotY: 0.3,
                torusScale: 0.8,
                icoScale: 1.25,
                particleSpeed: 1.2,
                duration: 1
            }, `-=${1.8}`);
        } else if (index === 3) {
            // Sweep toward Empire Life 2019-2022 (sky theme - central balanced view)
            engineTimeline.to(threeConfig, {
                camX: 0,
                camY: 0.8,
                camZ: 7,
                rotY: -0.2,
                torusScale: 1.1,
                icoScale: 1.1,
                particleSpeed: 1.5,
                duration: 1
            }, `-=${1.8}`);
        } else if (index === 4) {
            // Deep zoom into chronology graph
            engineTimeline.to(threeConfig, {
                camX: 0,
                camY: 0,
                camZ: 5.2,
                rotY: 0.4,
                torusScale: 0.6,
                icoScale: 0.6,
                particleSpeed: 2.2,
                duration: 1
            }, `-=${1.8}`);
        }
    }
});

// Final reset camera as we scroll out to Bento grid
gsap.to(threeConfig, {
    scrollTrigger: {
        trigger: "#specs",
        start: "top bottom",
        end: "top top",
        scrub: 1
    },
    camX: 0,
    camY: 0,
    camZ: 9.5,
    rotY: 0,
    torusScale: 1.0,
    icoScale: 1.0,
    particleSpeed: 0.8
});

// -------------------------------------------------------------
// 4. Premium 3D Glare & Card Tilt Effect Setup
// -------------------------------------------------------------
const cards = document.querySelectorAll(".glass-card");

cards.forEach(card => {
    // 1. Create and inject glare shine element dynamically
    const glare = document.createElement("div");
    glare.className = "card-glare";
    card.appendChild(glare);

    // 2. Add Mousemove Tilt Logic
    card.addEventListener("mousemove", (e) => {
        // Accessibility / Performance bypass on small screens
        if (window.innerWidth < 768) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalise delta values from card center
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Max tilt range: 10 degrees
        const rotX = ((centerY - y) / centerY) * 10;
        const rotY = ((x - centerX) / centerX) * 10;

        // Apply 3D matrix transform
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.025, 1.025, 1.025)`;
        
        // Dynamic edge reflection light track
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 65%)`;
    });

    // 3. Reset transforms on mouse leave
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
        glare.style.background = "transparent";
    });
});

// -------------------------------------------------------------
// 5. Connect Section Email Clipboard Logic
// -------------------------------------------------------------
const emailCard = document.getElementById("email-card");
if (emailCard) {
    emailCard.addEventListener("click", () => {
        const emailAddress = "shivi2010vit@gmail.com";
        navigator.clipboard.writeText(emailAddress).then(() => {
            // Success Feedback Animation
            const actionText = document.getElementById("email-action-text");
            const iconContainer = document.getElementById("email-icon-container");
            const emailSvg = document.getElementById("email-svg");
            
            if (actionText && iconContainer && emailSvg) {
                // Change classes for Copied state
                actionText.innerHTML = "Copied! ✓";
                actionText.classList.remove("text-emerald-400");
                actionText.classList.add("text-emerald-300");
                
                iconContainer.classList.remove("bg-emerald-400/10");
                iconContainer.classList.add("bg-emerald-400/20");
                
                // SVG check icon replacement
                emailSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />`;
                
                // Reset after 2.5 seconds
                setTimeout(() => {
                    actionText.innerHTML = `Copy Email <span class="group-hover:translate-x-1 transition-transform duration-300 ml-1">→</span>`;
                    actionText.classList.remove("text-emerald-300");
                    actionText.classList.add("text-emerald-400");
                    
                    iconContainer.classList.remove("bg-emerald-400/20");
                    iconContainer.classList.add("bg-emerald-400/10");
                    
                    // Original mail icon
                    emailSvg.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>`;
                }, 2500);
            }
        }).catch(err => {
            console.error("Failed to copy text: ", err);
        });
    });
}