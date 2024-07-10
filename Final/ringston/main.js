import "./style.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import SplitType from "split-type";
import * as dat from "dat.gui";
import * as THREE from "three";
import Lenis from "lenis";
import gsap from "gsap";

gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

const loader = new GLTFLoader();
let ring = null;
let contactRotation = false;
let scene, camera, renderer;

function initThreeJS() {
  // Debug
  const gui = new dat.GUI();
  dat.GUI.toggleHide();

  // Canvas
  const canvas = document.querySelector("canvas.webgl");

  // Scene
  scene = new THREE.Scene();

  // Loader
  loader.load("ring.glb", (gltf) => {
    ring = gltf.scene;
    ring.position.set(0, 0, 0);
    ring.scale.set(0.5, 0.5, 0.5);
    scene.add(ring);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "section.details",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
      defaults: {
        ease: "power3.out",
        duration: 3,
      },
    });

    tl.to(ring.position, {
      z: 2.5,
      y: -0.34,
    });

    tl.to(
      ring.rotation,
      {
        z: 1,
      },
      "<"
    );

    const directionalLight = new THREE.DirectionalLight("lightblue", 10);
    directionalLight.position.z = 8;
    scene.add(directionalLight);

    if (gui) {
      const ringFolder = gui.addFolder("Ring");
      ringFolder
        .add(gltf.scene.position, "x")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("position x");
      ringFolder
        .add(gltf.scene.position, "y")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("position y");
      ringFolder
        .add(gltf.scene.position, "z")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("position z");

      ringFolder
        .add(gltf.scene.rotation, "x")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("rotation x");
      ringFolder
        .add(gltf.scene.rotation, "y")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("rotation y");
      ringFolder
        .add(gltf.scene.rotation, "z")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("rotation z");

      ringFolder
        .add(gltf.scene.scale, "x")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("scale x");
      ringFolder
        .add(gltf.scene.scale, "y")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("scale y");
      ringFolder
        .add(gltf.scene.scale, "z")
        .min(-3)
        .max(3)
        .step(0.01)
        .name("scale z");
    }
  });

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  // Camera
  camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 2;
  scene.add(camera);

  // Renderer
  renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
}

const initRenderLoop = () => {
  const clock = new THREE.Clock();

  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    if (ring) {
      if (!contactRotation) {
        ring.rotation.y = 0.5 * elapsedTime;
        ring.rotation.x = 0;
        ring.rotation.z = 0;
      } else {
        ring.rotation.y = 0;
        ring.rotation.x = 0.2 * elapsedTime;
        ring.rotation.z = 0.2 * elapsedTime;
      }
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
};

const animationWords = () => {
  const words = ["Romance", "Rings", "Relationships"];

  let currentIndex = 0;
  let split = null;
  const textElement = document.querySelector(".primary-h1 span");

  const updateText = () => {
    textElement.textContent = words[currentIndex];
    split = new SplitType(textElement, { type: "chars" });

    animationChars(split.chars);
    currentIndex = (currentIndex + 1) % words.length;
  };

  const animationChars = (chars) => {
    gsap.from(chars, {
      yPercent: 100,
      stagger: 0.03,
      duration: 1.5,
      ease: "power4.out",
      onComplete: () => {
        if (split) {
          split.revert();
        }
      },
    });
  };

  setInterval(updateText, 3000);
};

function setupSmoothScroll() {
  const lenis = new Lenis();

  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
}

function inspectionSection() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".inspection",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  tl.to(".inspection h2", {
    y: -100,
  }).to(
    ".ring-bg",
    {
      y: -50,
      height: 300,
    },
    "<"
  );

  gsap.to(".marquee h3", {
    scrollTrigger: {
      trigger: ".marquee h3",
      start: "top 80%",
      end: "bottom top",
      scrub: true,
    },
    x: 200,
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initThreeJS();
  initRenderLoop();

  animationWords();
  setupSmoothScroll();

  inspectionSection();
});
