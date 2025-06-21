<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astroolean's Digital Canvas - 3D Experience</title>
    <!-- Tailwind CSS CDN (for overlay UI and loading screen) -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Google Fonts - Inter for a modern look (for overlay text) -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Base styles for the page, ensuring full screen and no scrollbars */
        body {
            margin: 0;
            overflow: hidden; /* Crucial to prevent scrollbars for the 3D canvas */
            height: 100vh; /* Make body take full viewport height */
            width: 100vw; /* Make body take full viewport width */
            display: flex;
            flex-direction: column;
            font-family: 'Inter', sans-serif; /* Apply Inter to HTML elements */
        }

        /* Styles for the Three.js canvas */
        canvas {
            display: block; /* Remove extra space below canvas */
            width: 100%;
            height: 100%;
        }

        /* Loading Screen styles */
        #loading-screen {
            position: fixed; /* Fixed position to cover the entire screen */
            inset: 0; /* Top, right, bottom, left to 0 */
            background-color: #0d1117; /* Dark background matching the scene */
            color: #e2e8f0; /* Light text */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            font-size: 2rem; /* Large text */
            z-index: 9999; /* On top of everything */
            transition: opacity 1s ease-out; /* Smooth fade out */
            opacity: 1; /* Start visible */
        }
        #loading-screen.hidden {
            opacity: 0;
            pointer-events: none; /* Allow clicks through once hidden */
        }
        .loading-spinner {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #5a67d8; /* Blue spinner */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin-top: 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Styles for the HTML overlay content on top of the 3D canvas */
        #overlay-content {
            position: absolute; /* Positioned relative to the viewport */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10; /* Above the canvas, below the loading screen */
            pointer-events: none; /* Allow mouse events to pass through to the canvas */
            color: #e2e8f0; /* Light text color */
        }

        /* Container for the actual text content within the overlay */
        .content-container {
            pointer-events: auto; /* Re-enable pointer events for interactive elements like links */
            background: rgba(17, 24, 39, 0.7); /* Semi-transparent dark background */
            backdrop-filter: blur(8px); /* Subtle blur effect */
            -webkit-backdrop-filter: blur(8px); /* Safari compatibility */
            border-radius: 2rem; /* Large rounded corners */
            padding: 2.5rem; /* Ample padding */
            max-width: 90%; /* Max width for responsiveness */
            width: 48rem; /* Fixed width for larger screens */
            text-align: center;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1); /* Deep shadow */
            
            /* UPDATED: Blue border for the content container */
            border: 2px solid #3b82f6; /* A distinct blue color (Tailwind's blue-500) */

            overflow-y: auto; /* Allow scrolling for project section if needed */
            max-height: 90vh; /* Limit height for content container on smaller screens */

            /* Animation for the content container */
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInSlideUp 1.5s ease-out forwards;
            animation-delay: 1.2s; /* Delayed to appear after loading screen fades */
        }

        /* Specific animations for content within the container (staggered) */
        @keyframes fadeInSlideUp {
            from { opacity: 0; transform: translateY(50px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .avatar-animate {
            opacity: 0;
            transform: scale(0.5);
            animation: fadeInScale 1s ease-out forwards;
            animation-delay: 1.5s;
        }

        .header-animate {
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeInDown 1s ease-out forwards;
            animation-delay: 1.8s;
        }

        .tagline-animate {
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 1s ease-out forwards;
            animation-delay: 2.1s;
        }

        /* Pop-in animation for projects */
        @keyframes popIn {
            0% { opacity: 0; transform: translateY(-50px) scale(0.8); }
            60% { opacity: 1; transform: translateY(10px) scale(1.05); } /* Slightly overshoot for bounce */
            100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        .project-animate {
            animation: popIn 0.8s ease-out forwards; /* Apply the popIn animation */
            opacity: 0; /* Ensure it starts hidden */
            /* Animation delays are applied directly to nth-child below */
        }
        /* Staggered animation delays for project items (adjusted for new animation timing) */
        .project-item:nth-child(1) { animation-delay: 2.4s; }
        .project-item:nth-child(2) { animation-delay: 2.5s; }
        .project-item:nth-child(3) { animation-delay: 2.6s; }
        .project-item:nth-child(4) { animation-delay: 2.7s; }
        .project-item:nth-child(5) { animation-delay: 2.8s; }
        .project-item:nth-child(6) { animation-delay: 2.9s; }


        @keyframes fadeIn { /* Kept for other elements if needed, but not directly used by projects now */
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInScale { /* Kept for other elements if needed */
            from { opacity: 0; transform: scale(0.5); }
            to { opacity: 1; transform: scale(1); }
        }
        /* Apply aqua color to all project titles */
        .project-item h3 {
            color: #4ee6eb; /* A distinct aqua color (Tailwind's cyan-400) */
        }
        /* UPDATED: Blue border for project items */
        .project-item {
            border: 1px solid #3b82f6; /* A distinct blue color (Tailwind's blue-500) */
        }
    </style>
</head>
<body>
    <!-- Loading Screen -->
    <div id="loading-screen" class="fixed inset-0 bg-gray-900 flex flex-col items-center justify-center text-white text-2xl z-50">
        <div class="loading-spinner"></div>
        <p class="mt-4">Igniting Astroolean's Digital Canvas...</p>
    </div>

    <!-- The Three.js canvas will be injected here by JavaScript -->

    <!-- HTML Overlay for Text and Social Links -->
    <div id="overlay-content">
        <div class="content-container">
            <!-- EDITABLE: Profile Picture/GIF -->
            <!-- To change your profile picture, update the 'src' attribute below. -->
            <!-- GIFs are supported! Simply link to your .gif file. -->
            <img src="https://cdn.discordapp.com/attachments/1353789013772730509/1354478903166767144/logo.gif?ex=685822c7&is=6856d147&hm=457c6260439088463ba3c3e8536df8d46dd6f9e849e1b958de4a33e827983238&" alt="Astroolean's Avatar"
                 class="rounded-full shadow-xl border-4 border-blue-500 w-40 h-40 object-cover mx-auto mb-1 transform hover:scale-110 transition duration-300 ease-in-out avatar-animate">

            <!-- Summary Text -->
            <div class="text-center mb-6">
                <p class="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                    I got a little high and decided to build a website with AI—just to show how easy it really is. I'm a casual gamer who lives in the world of scripting. Whether it’s modding games or blocking ads on Twitch, if I need something, I’ll build it myself. No paywalls, no BS—just clean, functional tools made for me, by me.
            </p>
        </div>

            <!-- Current Projects Section -->
            <!-- EDITABLE: Project Details -->
            <!-- You can edit the 'href' for the link, the '<h3>' for the project title, -->
            <!-- and the '<p>' for the project description for each project item below. -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <!-- Project 1 -->
                <a href="https://github.com/Astroolean/AstroCore" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">AstroCore</h3>
                    <p class="text-gray-400 text-sm">Minecraft server core designed for a servers specifically running paper 1.20.4</p>
                </a>
                <!-- Project 2 -->
                <a href="https://github.com/Astroolean/BO2-Zombies-Town-AI-Premade-Pack" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">BO2 Zombies</h3>
                    <p class="text-gray-400 text-sm">Heavily modified the map Town. Much more stuff compared to the original base game.</p>
                </a>
                <!-- Project 3 -->
                <a href="https://github.com/yourprofile/project3" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">Coming soon...</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </a>
                <!-- Project 4 -->
                <a href="https://github.com/yourprofile/project4" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">Coming soon...</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </a>
                <!-- Project 5 -->
                <a href="https://github.com/yourprofile/project5" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">Coming soon...</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </a>
                <!-- Project 6 -->
                <a href="https://github.com/yourprofile/project6" target="_blank" rel="noopener noreferrer"
                   class="bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition duration-300 ease-in-out project-animate project-item">
                    <h3 class="text-2xl font-bold mb-2">Coming soon...</h3>
                    <p class="text-gray-400 text-sm">Coming soon...</p>
                </a>
            </div>

        </div>
    </div>

    <!-- Three.js Library -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <!-- OrbitControls for interactive camera movement -->
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>

    <script>
        // --- Three.js Setup ---
        let scene, camera, renderer, controls;
        let particles, mainSphere, pointLight, ambientLight;
        const asteroids = []; // Array to hold our asteroid meshes
        const loadingScreen = document.getElementById('loading-screen');
        const overlayContent = document.getElementById('overlay-content');
        let mouseX = 0, mouseY = 0; // Global variables for mouse position

        // Function to initialize the 3D scene
        function init() {
            // Scene
            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a0c10); // Very dark blue/black background

            // Camera (Perspective Camera for 3D view)
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 5); // Initial camera position

            // Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio); // Handle high-DPI screens
            document.body.appendChild(renderer.domElement); // Add canvas to the body

            // OrbitControls for interactive camera movement
            controls = new THREE.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true; // Smooth camera movement
            controls.dampingFactor = 0.07; // Slightly increased damping for smoother feel
            controls.screenSpacePanning = false;
            controls.minDistance = 2; // Minimum zoom
            controls.maxDistance = 15; // Maximum zoom
            controls.autoRotate = true; // Automatically rotate the scene
            controls.autoRotateSpeed = 0.3; // Slower auto-rotation

            // --- Scene Elements ---

            // 1. Abstract Main Sphere (the "Digital Canvas")
            // EDITABLE: mainSphere Geometry
            // You can change the shape of the main sphere here.
            // Options include THREE.SphereGeometry, THREE.BoxGeometry, THREE.TorusGeometry,
            // THREE.DodecahedronGeometry, THREE.IcosahedronGeometry, THREE.OctahedronGeometry, etc.
            // Remember to adjust parameters as needed for the chosen geometry.
            const sphereGeometry = new THREE.TorusKnotGeometry(1.5, 0.5, 100, 16); // radius, tube, radialSegments, tubularSegments

            // Custom shader material for a unique glowing, ethereal look
            const sphereMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0.0 },
                    // EDITABLE: mainSphere Colors
                    // Adjust these hex values to change the sphere's primary and secondary colors.
                    color1: { value: new THREE.Color(0x00aaff) }, // A vibrant blue
                    color2: { value: new THREE.Color(0x4ee6eb) }, // A bright aqua
                    glowColor: { value: new THREE.Color(0x87ceeb) }, // Sky blue glow
                    glowIntensity: { value: 0.8 } // Control glow intensity
                },
                vertexShader: `
                    uniform float time;
                    varying vec3 vNormal;
                    varying vec3 vPosition;
                    void main() {
                        vNormal = normal;
                        vPosition = position;
                        // Displace vertices based on sine/cosine waves and noise for a fluid, organic look
                        // Added more complexity to displacement for a 'breathing' effect
                        float displacement = sin(position.x * 4.0 + time * 0.8) * 0.1 +
                                             cos(position.y * 3.0 + time * 0.6) * 0.1 +
                                             sin(position.z * 5.0 + time * 0.7) * 0.1;
                        vec3 displacedPosition = position + normal * displacement * 0.5; // Reduced displacement scale
                        gl_Position = projectionMatrix * modelViewMatrix * vec4(displacedPosition, 1.0);
                    }
                `,
                fragmentShader: `
                    uniform float time;
                    uniform vec3 color1;
                    uniform vec3 color2;
                    uniform vec3 glowColor;
                    uniform float glowIntensity;
                    varying vec3 vNormal;
                    varying vec3 vPosition;

                    void main() {
                        // Calculate a mix factor based on normal direction and time for color blending
                        float mixFactor = (sin(dot(normalize(vNormal), vec3(0.0, 1.0, 0.0)) * 2.0 + time * 0.5) + 1.0) / 2.0;
                        vec3 finalColor = mix(color1, color2, mixFactor);

                        // Add a glow effect based on view direction and normal
                        vec3 cameraToFragment = normalize(cameraPosition - vPosition);
                        float glow = dot(vNormal, cameraToFragment);
                        glow = pow(glow * 2.0, 3.0); // Sharpen the glow
                        finalColor += glowColor * glow * glowIntensity;

                        gl_FragColor = vec4(finalColor, 0.8); // Semi-transparent
                    }
                `,
                transparent: true,
                blending: THREE.AdditiveBlending, // For glowing effect
                side: THREE.DoubleSide, // Render both sides
                depthWrite: false // Crucial for better transparency with additive blending on self-intersecting/displaced geometries
            });
            mainSphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            scene.add(mainSphere);

            // 2. Particle System (subtle "star dust" or "energy")
            const particleCount = 7000; // Increased particle count for denser field
            const particleGeometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3); // x, y, z for each particle
            const colors = new Float32Array(particleCount * 3); // r, g, b for each particle
            const sizes = new Float32Array(particleCount); // Size for each particle

            for (let i = 0; i < particleCount; i++) {
                // Random position within a larger sphere (wider distribution)
                positions[i * 3] = (Math.random() - 0.5) * 60; // x, wider spread
                positions[i * 3 + 1] = (Math.random() - 0.5) * 60; // y, wider spread
                positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // z, wider spread

                // Random color (subtle variations of blue/purple/cyan)
                const color = new THREE.Color();
                color.setHSL(0.55 + Math.random() * 0.2, 0.7 + Math.random() * 0.3, 0.6 + Math.random() * 0.3); // HSL for blue-ish to purple-ish
                colors[i * 3] = color.r;
                colors[i * 3 + 1] = color.g;
                colors[i * 3 + 2] = color.b;

                // Random size
                sizes[i] = Math.random() * 0.2 + 0.08; // Slightly larger particles, more variation
            }

            particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            particleGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3)); // Changed 'color' to 'aColor'
            particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1)); // Custom attribute for size

            // Shader material for particles to control size and glow
            const particleMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    pointTexture: { value: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png') } // A soft circular texture
                },
                vertexShader: `
                    attribute float size;
                    attribute vec3 aColor; // Changed 'color' to 'aColor'
                    varying vec3 vColor;
                    void main() {
                        vColor = aColor; // Use 'aColor' here
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        gl_PointSize = size * (600.0 / -mvPosition.z); // Scale size based on distance, larger base
                        gl_Position = projectionMatrix * mvPosition;
                    }
                `,
                fragmentShader: `
                    uniform sampler2D pointTexture;
                    varying vec3 vColor;
                    void main() {
                        gl_FragColor = vec4(vColor, 1.0);
                        gl_FragColor = gl_FragColor * texture2D(pointTexture, gl_PointCoord); // Apply texture (soft disc)
                        if (gl_FragColor.a < 0.01) discard; // Don't render almost invisible pixels
                    }
                `,
                blending: THREE.AdditiveBlending, // For glowing effect
                depthTest: false, // Particles can render over each other
                transparent: true,
                // Removed vertexColors: true as we are explicitly handling the attribute
            });

            particles = new THREE.Points(particleGeometry, particleMaterial);
            scene.add(particles);

            // 3. Asteroid Field
            const numAsteroids = 200; // Increased number of asteroids
            const asteroidGeometries = [
                new THREE.DodecahedronGeometry(1, 0),
                new THREE.IcosahedronGeometry(1, 0),
                new THREE.OctahedronGeometry(1, 0)
            ];

            const asteroidBaseMaterial = new THREE.MeshStandardMaterial({
                color: 0x4a4a5a, // Dark grey/blue
                roughness: 0.7,
                metalness: 0.3
            });

            for (let i = 0; i < numAsteroids; i++) {
                // Randomly pick one of the defined geometries
                const randomGeometry = asteroidGeometries[Math.floor(Math.random() * asteroidGeometries.length)];
                const asteroidGeometry = randomGeometry.clone().scale(Math.random() * 0.4 + 0.15, Math.random() * 0.4 + 0.15, Math.random() * 0.4 + 0.15); // Vary scale

                const asteroidMaterial = asteroidBaseMaterial.clone(); // Clone material for potential future color variations
                // More varied and subtle blue/grey/purple tones
                asteroidMaterial.color.setHSL(0.55 + Math.random() * 0.15, 0.2 + Math.random() * 0.1, 0.2 + Math.random() * 0.2);

                const asteroid = new THREE.Mesh(asteroidGeometry, asteroidMaterial);

                // Random position within a larger, non-central volume
                const distance = 10 + Math.random() * 20; // Distance from center
                const angle = Math.random() * Math.PI * 2;
                const yOffset = (Math.random() - 0.5) * 15; // Vertical spread
                asteroid.position.set(
                    Math.cos(angle) * distance + (Math.random() - 0.5) * 5, // Add slight random offset
                    yOffset + (Math.random() - 0.5) * 5,
                    Math.sin(angle) * distance + (Math.random() - 0.5) * 5
                );

                // Random initial rotation
                asteroid.rotation.x = Math.random() * Math.PI;
                asteroid.rotation.y = Math.random() * Math.PI;
                asteroid.rotation.z = Math.random() * Math.PI;

                // Store rotation speeds for animation
                asteroid.userData.rotationSpeed = {
                    x: (Math.random() - 0.5) * 0.003, // Slower rotation
                    y: (Math.random() - 0.5) * 0.003,
                    z: (Math.random() - 0.5) * 0.003
                };
                // Store drift direction for animation
                asteroid.userData.driftSpeed = new THREE.Vector3(
                    (Math.random() - 0.5) * 0.005,
                    (Math.random() - 0.5) * 0.005,
                    (Math.random() - 0.5) * 0.005
                );

                asteroids.push(asteroid);
                scene.add(asteroid);
            }

            // 4. Lights
            ambientLight = new THREE.AmbientLight(0x404040, 1.8); // Soft ambient light, brighter
            scene.add(ambientLight);

            pointLight = new THREE.PointLight(0x00ffff, 2.0, 100); // Cyan light, brighter
            pointLight.position.set(0, 0, 0); // Initially at center, will move with mouse
            scene.add(pointLight);

            // Add a subtle directional light for more definition
            const directionalLight = new THREE.DirectionalLight(0xffccaa, 0.7); // Warm light for contrast
            directionalLight.position.set(5, 10, 5);
            scene.add(directionalLight);

            // Add a second point light with a different color for more dynamic lighting
            const secondaryPointLight = new THREE.PointLight(0xee00ff, 1.0, 80); // Magenta light
            secondaryPointLight.position.set(-5, -5, 5);
            scene.add(secondaryPointLight);


            // Initial animation of the main sphere and particles
            gsap.from(mainSphere.scale, { x: 0.1, y: 0.1, z: 0.1, duration: 2, ease: "elastic.out(1, 0.5)" });
            gsap.from(particles.material, { opacity: 0, duration: 2, delay: 0.5 });
            gsap.from(camera.position, { z: 20, duration: 2.5, ease: "power2.out" });

            // Event Listeners
            window.addEventListener('resize', onWindowResize);
            document.addEventListener('mousemove', onDocumentMouseMove);

            // Hide loading screen after everything is initialized
            loadingScreen.classList.add('hidden');
            // Ensure overlay content has pointer-events:auto after loading
            overlayContent.style.pointerEvents = 'auto';
        }

        // --- Animation Loop ---
        function animate() {
            requestAnimationFrame(animate); // Loop indefinitely

            // Update OrbitControls
            controls.update();

            // Animate main sphere
            if (mainSphere && mainSphere.material.uniforms) {
                mainSphere.rotation.y += 0.001;
                // Add subtle distortion to the sphere's material over time
                mainSphere.material.uniforms.time.value += 0.01;
                // Make the glow intensity pulse
                mainSphere.material.uniforms.glowIntensity.value = 0.8 + Math.sin(performance.now() * 0.001) * 0.2; // Pulse between 0.6 and 1.0
            }

            // Animate particles (simple floating or rotation)
            if (particles) {
                particles.rotation.x += 0.0001;
                particles.rotation.y += 0.0003;
            }

            // Animate asteroids
            const sceneRadius = 30; // Define a large radius for asteroid containment
            asteroids.forEach(asteroid => {
                asteroid.rotation.x += asteroid.userData.rotationSpeed.x;
                asteroid.rotation.y += asteroid.userData.rotationSpeed.y;
                asteroid.rotation.z += asteroid.userData.rotationSpeed.z;

                // Subtle drift
                asteroid.position.add(asteroid.userData.driftSpeed);

                // Wrap around logic for asteroids to create endless field
                // If asteroid goes beyond scene radius, reset it to a new random position closer to center
                if (asteroid.position.length() > sceneRadius) {
                    const newAngle = Math.random() * Math.PI * 2;
                    const newDistance = sceneRadius * 0.5 + Math.random() * sceneRadius * 0.2; // Reset closer
                    const newYOffset = (Math.random() - 0.5) * 15;

                    asteroid.position.set(
                        Math.cos(newAngle) * newDistance + (Math.random() - 0.5) * 2,
                        newYOffset + (Math.random() - 0.5) * 2,
                        Math.sin(newAngle) * newDistance + (Math.random() - 0.5) * 2
                    );
                    // Also randomize drift direction upon reset
                    asteroid.userData.driftSpeed.set(
                        (Math.random() - 0.5) * 0.005,
                        (Math.random() - 0.5) * 0.005,
                        (Math.random() - 0.5) * 0.005
                    );
                }
            });

            renderer.render(scene, camera); // Render the scene
        }

        // --- Event Handlers ---

        // Handle window resizing to keep the 3D scene responsive
        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        // Mouse move handler for light and subtle parallax effect on controls
        function onDocumentMouseMove(event) {
            // Normalize mouse coordinates to -1 to +1 range
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = - (event.clientY / window.innerHeight) * 2 + 1;

            // Move the primary point light based on mouse position
            if (pointLight) {
                pointLight.position.x = mouseX * 5; // Increased sensitivity
                pointLight.position.y = mouseY * 5; // Increased sensitivity
                pointLight.position.z = 2; // Keep it slightly in front
            }

            // Adjust controls target based on mouse for a subtle parallax feel
            // This makes the whole scene slightly shift as if you're looking around
            controls.target.x = mouseX * 0.8; // Increased sensitivity
            controls.target.y = mouseY * 0.8; // Increased sensitivity
            // No controls.update() here, OrbitControls will handle it in animate()
        }

        // --- Initialization on Window Load ---
        // Load GSAP (GreenSock Animation Platform) for advanced animations
        // GSAP is loaded dynamically to ensure it's available before init() is called
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.9.1/gsap.min.js';
        script.onload = () => {
            init(); // Initialize Three.js scene
            animate(); // Start the animation loop
        };
        document.head.appendChild(script);
    </script>
</body>
</html>
