# Astroolean's Digital Canvas - A Three.js Portfolio Experience

![Demo GIF/Screenshot](https://i.imgur.com/your-screenshot-or-gif.gif)
*(Replace this with a link to a GIF or screenshot of your live project for a quick visual demo!)*

---

## 🚀 Overview

Welcome to **Astroolean's Digital Canvas**, a unique and interactive 3D web experience built with **Three.js**, **Tailwind CSS**, and **GSAP**. This project serves as a dynamic personal portfolio or landing page, featuring a mesmerizing abstract central sphere, a vast particle system, and an orbiting asteroid field. The overlay UI, powered by Tailwind CSS, provides a clean and modern space to showcase your profile, a brief summary, and your latest projects.

I built this project to demonstrate how easily a captivating web presence can be created, even with the help of AI! It's designed to be straightforward to customize, allowing you to quickly put your own spin on it without deep knowledge of Three.js.

---

## ✨ Features

* **Interactive 3D Scene:**
    * **Abstract Main Sphere:** A glowing, ethereal "digital canvas" with a unique shader material, featuring dynamic color blending and a "breathing" displacement effect.
    * **Dynamic Particle System:** A subtle, shimmering field of particles creating a "star dust" or "energy" aura.
    * **Asteroid Field:** Procedurally generated asteroids with varied shapes, sizes, and independent rotations, subtly drifting and wrapping around the scene for an endless feel.
    * **Responsive Camera & Lights:** Camera controls (OrbitControls) with auto-rotation, and interactive point lights that respond to mouse movement, illuminating the scene dynamically.
* **Modern UI Overlay:**
    * **Tailwind CSS:** Fully styled with utility-first CSS for a sleek, responsive design.
    * **Google Fonts (Inter):** Ensures a modern and readable typography.
    * **Loading Screen:** A smooth, custom loading animation for a polished user experience.
    * **Animated Content:** Subtle `fadeIn` and `popIn` animations for the profile image, text, and project cards, thanks to **GSAP**.
* **Easy Customization:** Designed with clearly marked "EDITABLE" sections in the code for quick personalization of:
    * Profile picture/GIF
    * Summary text
    * Project details (links, titles, descriptions)
    * Main sphere's geometry and colors
    * Various 3D scene parameters (e.g., particle count, asteroid density)

---

## 🛠️ Technologies Used

* **Three.js (r128):** The powerful 3D JavaScript library for rendering the interactive scene.
* **OrbitControls:** A Three.js example utility for intuitive camera interaction (rotate, pan, zoom).
* **Tailwind CSS (CDN):** For rapid UI development and styling the HTML overlay.
* **GSAP (GreenSock Animation Platform):** For high-performance, smooth JavaScript animations on the HTML content.
* **HTML5:** The core structure of the web page.
* **CSS3:** For custom styles and animations not covered by Tailwind.

---

## 🚀 Getting Started

This project is incredibly easy to get up and running!

1.  **Clone the repository (or copy the `index.html` file):**

    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

    (Replace `your-username/your-repo-name` with your actual GitHub repository URL if you fork it).

2.  **Open `index.html` in your web browser:**

    Simply double-click the `index.html` file, or open it with your preferred web server (e.g., Live Server extension in VS Code).

    That's it! The Three.js scene and the UI will load automatically.

---

## ⚙️ Customization

The `index.html` file is heavily commented with **"EDITABLE"** tags to guide you through personalization.

### HTML Content (`<div id="overlay-content">`)

* **Profile Picture/GIF:**
    Find the `<img>` tag with `alt="Astroolean's Avatar"` and change the `src` attribute to your desired image or GIF URL.
* **Summary Text:**
    Modify the text within the `<p>` tag inside the `text-center mb-6` div to write your own personal summary.
* **Projects Section:**
    Each project is represented by an `<a>` tag with the `project-item` class.
    * Update the `href` attribute to link to your project.
    * Change the `<h3>` content for the project title.
    * Modify the `<p>` content for the project description.
    * You can add or remove `<a class="project-item">...</a>` blocks to fit your number of projects.

### Three.js Scene (`<script>` tag)

Look for comments like `// EDITABLE: mainSphere Geometry` or `// EDITABLE: mainSphere Colors` within the `<script>` section.

* **Main Sphere (`mainSphere`):**
    * **Geometry:** Experiment with different `THREE.Geometry` types (e.g., `THREE.SphereGeometry`, `THREE.BoxGeometry`, `THREE.TorusGeometry`, `THREE.DodecahedronGeometry`) by changing `new THREE.TorusKnotGeometry(...)`. Adjust the parameters accordingly.
    * **Colors:** Modify `color1`, `color2`, and `glowColor` hex values in the `sphereMaterial`'s `uniforms` to match your aesthetic.
* **Particles (`particles`):**
    * **`particleCount`:** Increase or decrease this value to change the density of the particle field.
    * **Colors & Sizes:** Adjust the `HSL` values and `Math.random()` multipliers within the particle generation loop for different visual effects.
* **Asteroids (`asteroids` array):**
    * **`numAsteroids`:** Control the number of asteroids in the field.
    * **`asteroidGeometries`:** Add or remove different `THREE.Geometry` types to vary asteroid shapes.
    * **Colors:** Modify the `asteroidMaterial.color.setHSL(...)` line to change asteroid hues.
    * **Rotation and Drift Speeds:** Adjust `asteroid.userData.rotationSpeed` and `asteroid.userData.driftSpeed` values for faster/slower movement.
* **Lights:**
    * Experiment with `AmbientLight`, `PointLight`, and `DirectionalLight` parameters (color, intensity, distance, position) to change the overall lighting mood.

---

## 🙏 Credits

* **Three.js:** For the amazing 3D rendering capabilities.
* **Tailwind CSS:** For streamlined UI development.
* **GSAP:** For powerful and easy-to-use animations.
* **Google Fonts:** For the "Inter" typeface.
* **Discord CDN:** Used for hosting the profile GIF in the example.

---

## 🤝 Contributing

Feel free to fork this repository, customize it to your liking, and use it as your own personal portfolio! If you have suggestions for improvements or find any issues, please open an issue or submit a pull request.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

If you have any questions or just want to connect, feel free to reach out!

---
