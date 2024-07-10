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

    function toggleWireframe(model, isWireframe, opacity) {
      model.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.wireframe = isWireframe;
          child.material.opacity = opacity;
          child.material.transparent = true;
        }
      });
    }

    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: "section.contact",
        start: "top 80%",
        end: "bottom center",
        scrub: true,
        onEnter: () => {
          toggleWireframe(ring, true, 0.1);
          contactRotation = true;
        },
        onEnterBack: () => {
          toggleWireframe(ring, true, 0.1);
          contactRotation = true;
        },
        onLeave: () => {
          toggleWireframe(ring, false, 1);
          contactRotation = true;
        },
        onLeaveBack: () => {
          toggleWireframe(ring, false, 1);
          contactRotation = true;
        },
      },
    });

    contactTl.to(ring.position, {
      z: 0.3,
      x: 0.4,
      y: -0.23,
    });

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
    y: -50,
  });
}

function sliderSection() {
  let mm = gsap.matchMedia();

  mm.add("(min-width: 768px)", () => {
    let slider = document.querySelector(".slider");
    let sliderSection = gsap.utils.toArray(".slide");

    let tl = gsap.timeline({
      defaults: {
        ease: "none",
      },
      scrollTrigger: {
        trigger: slider,
        pin: true,
        scrub: 1,
        end: () => "+=" + slider.offsetWidth,
      },
    });

    tl.to(
      slider,
      {
        xPercent: -66,
      },
      "<"
    ).to(
      ".progress",
      {
        width: "100%",
      },
      "<"
    );

    sliderSection.forEach((stop, index) => {
      const slideText = new SplitType(stop.querySelector(".slide-p"), {
        types: "chars",
      });

      tl.from(slideText.chars, {
        opacity: 0,
        y: 10,
        stagger: 0.03,
        scrollTrigger: {
          trigger: stop.querySelector(".slide-p"),
          start: "top bottom",
          end: "bottom center",
          containerAnimation: tl,
          scrub: true,
        },
      });
    });
  });
}

function contactSection() {
  gsap.set("h4, .inner-contact span", {
    yPercent: 100,
  });
  gsap.set(".inner-contact p", {
    opacity: 0,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".inner-contact",
      start: "-20% center",
      end: "10% 40%",
      scrub: true,
    },
  });

  tl.to(".line-top, .line-bottom", {
    width: "100%",
  })
    .to("h4, .inner-contact span", {
      yPercent: 0,
    })
    .to(".inner-contact p", {
      opacity: 1,
    });
}

// Preloading
function preloadFile(url) {
  return new Promise((resolve, reject) => {
    const fileType = url.split(".").pop().toLowerCase();
    if (fileType === "jpg" || fileType === "png" || fileType === "gif") {
      const img = new Image();
      img.src = url;
      img.onload = resolve;
      img.onerror = reject;
    } else if (fileType === "mp4" || fileType === "webm") {
      const video = document.createElement("video");
      video.src = url;
      video.onloadeddata = resolve;
      video.onerror = reject;
    } else {
      fetch(url)
        .then((response) => response.blob())
        .then(resolve)
        .catch(reject);
    }
  });
}

function preloadFiles(urls) {
  const promises = urls.map((url) => preloadFile(url));

  Promise.all(promises)
    .then(() => {
      console.log("All files preloaded");

      document.querySelector(".loading-screen").classList.add("hide-loader");
    })
    .catch((error) => console.error("Error preloading files:", error));
}

document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  preloadFiles([
    "ring.glb",
    "images/slide1.jpg",
    "images/slide2.jpg",
    "images/slide3.jpg",
    "video.mp4",
  ]);

  initThreeJS();
  initRenderLoop();

  animationWords();
  setupSmoothScroll();

  inspectionSection();
  sliderSection();
  contactSection();
});
