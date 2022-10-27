import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { DRACOLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/DRACOLoader.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";
const sky = "./images/sky.png";
const nebula = "./images/nebula.jpg";
const stars = "./images/Star.png";
const map = "./images/normalMapp.png";
const map2 = "./images/normal-map-3.png";
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled = true;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit = new OrbitControls(camera, renderer.domElement);
const gui = new dat.GUI();
// const axisHelper = new THREE.AxesHelper(5);
// scene.add(axisHelper);
camera.position.set(0, 0, 30);
gui.add(camera.position, "x").min(-500).max(100);
gui.add(camera.position, "y").min(-500).max(100);
gui.add(camera.position, "z").min(-500).max(100);
orbit.update();
scene.fog = new THREE.FogExp2(0x000000, 0.005);

// GSAP declaration
let anim = gsap.timeline();
let repeatAnim = gsap.timeline();

// Loaders
const loadingManager = new THREE.LoadingManager();

// // loader
const progessBar = document.getElementById("file");
loadingManager.onProgress = function (url, loaded, total) {
    let a = (loaded / total) * 100;
    progessBar.innerHTML = Math.floor(a) + "%";
};
const flatEle = document.querySelector(".flat");
const enterBtn = document.querySelector(".enter");
const progessBarCon = document.querySelector(".progressBar");
loadingManager.onLoad = function () {
    progessBarCon.style.display = "none";
    // console.log(document.querySelector(".webglCanvas"));
    enterBtn.style.display = "block";
};
enterBtn.addEventListener("click", function () {
    flatEle.style.display = "none";
    enterBtn.style.display = "none";
});

const textureLoader = new THREE.TextureLoader();
const star = textureLoader.load(stars);
const cubeTexture = new THREE.CubeTextureLoader();
// scene.background = textureLoader.load(sky);
const mapLoader = textureLoader.load(map);
const mapLoader2 = textureLoader.load(map2);

// 3D loader
const loader = new GLTFLoader(loadingManager);
let planet;
loader.load(
    "./modals/lava_planet/scene.gltf",
    function (gltf) {
        planet = gltf.scene.children[0];
        planet.position.set(0, -80, 100);
        planet.castShadow = true;
        planet.recieveShadow = true;
        // planet.scale.set(0.05, 0.05, 0.05); planet
        planet.scale.set(4, 4, 4);
        document.addEventListener("scroll", function (event) {
            planet.position.y = window.scrollY * 0.02 + -38;
            planet.position.z = -window.scrollY * 0.03 + 60;
        });
        scene.add(planet);
        animat();
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.log("error");
    }
);

// space ship
loader.load(
    "./modals/spaceship_unitron/scene.gltf",
    function (gltf) {
        const spaceShip = gltf.scene.children[0];
        // spaceShip.position.set(3, -80, 100);
        spaceShip.position.set(20, 15, -10);
        spaceShip.rotation.set(0, 0, -4);
        // gui.add(spaceShip.rotation, "z").min(-10).max(10);
        // spaceShip.scale.set(0.05, 0.05, 0.05); planet
        spaceShip.scale.set(0.1, 0.1, 0.1);
        enterBtn.addEventListener("click", function () {
            anim.to(spaceShip.position, {
                x: 6,
                y: 4,
                z: 10,
                duration: 1.5,
            });
            anim.to(
                spaceShip.rotation,
                {
                    x: -1,
                    y: 0,
                    z: -4,
                    duration: 1.5,
                },
                "-=1.5"
            );
        });
        document.addEventListener("scroll", function (event) {
            spaceShip.rotation.x = -window.scrollY * 0.002 + -1;
            spaceShip.rotation.y = -window.scrollY * 0.002 + 0;
            spaceShip.position.x = -window.scrollY * 0.02 + 6;
            spaceShip.position.y = -window.scrollY * 0.01 + 4;
            spaceShip.position.z = window.scrollY * 0.03 + 10;
        });
        scene.add(spaceShip);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
        console.log("error");
    }
);

// mini space ship
// loader.load(
//   "./modals/xian_spaceship/scene.gltf",
//   function (gltf) {
//     const spaceShip = gltf.scene.children[0];
//     // spaceShip.position.set(3, -80, 100);
//     spaceShip.position.set(-15, -100, 0);
//     spaceShip.rotation.set(3, 0, 4.7);
//     gui.add(spaceShip.position, "x").min(-20).max(10);
//     gui.add(spaceShip.position, "y").min(-20).max(10);
//     gui.add(spaceShip.position, "z").min(-20).max(10);
//     gui.add(spaceShip.rotation, "x").min(-5).max(5);
//     gui.add(spaceShip.rotation, "y").min(-5).max(5);
//     gui.add(spaceShip.rotation, "z").min(-5).max(5);
//     spaceShip.scale.set(0.1, 0.1, 0.1);
//     // var repeat = repeatAnim.repeat(-1);
//     // repeat
//     //     .to(spaceShip.position, {
//     //         x: -15.05,
//     //         y: -10.05,
//     //         z: 0,
//     //         duration: 0.1,
//     //     })
//     //     .yoyo(true);
//     anim.to(spaceShip.position, {
//       x: -15,
//       y: -10,
//       z: 0,
//       duration: 2.5,
//     });
//     anim.to(
//       spaceShip.rotation,
//       {
//         y: 10,
//         duration: 2.5,
//       },
//       "-=2.5"
//     );
//     // document.addEventListener("scroll", function (event) {
//     //     spaceShip.rotation.x = -window.scrollY * 0.002 + -1;
//     //     spaceShip.rotation.y = -window.scrollY * 0.002 + 0;
//     //     spaceShip.position.x = -window.scrollY * 0.02 + 6;
//     //     spaceShip.position.y = -window.scrollY * 0.01 + 4;
//     //     spaceShip.position.z = window.scrollY * 0.03 + 10;
//     // });
//     scene.add(spaceShip);
//   },
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
//   },
//   function (error) {
//     console.log("error");
//   }
// );

// particles
const particulesGeometry = new THREE.BufferGeometry();
const particulesCount = 5000;
const particulesArray = new Float32Array(particulesCount * 3);
for (let i = 0; i < particulesCount * 3; i++) {
    particulesArray[i] = (Math.random() - 0.5) * 100;
}
particulesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(particulesArray, 4)
);
const pointMaterial = new THREE.PointsMaterial({
    size: 0.21,
    map: star,
    transparent: true,
    color: "#34b3f1",
});
const particulesMesh = new THREE.Points(particulesGeometry, pointMaterial);
scene.add(particulesMesh);

// Circle Particles
const distance = Math.min(100, 6);
const geometry = new THREE.Geometry();

for (var i = 0; i < 2500; i++) {
    const vertex = new THREE.Vector3();
    const theta = THREE.Math.randFloatSpread(360);
    const phi = THREE.Math.randFloatSpread(360);

    vertex.x = distance * Math.sin(theta) * Math.cos(phi);
    vertex.y = distance * Math.sin(theta) * Math.sin(phi);
    vertex.z = distance * Math.cos(theta);

    geometry.vertices.push(vertex);
}

const partclesCircle = new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
        color: 0x4832ec,
        size: 0.1,
    })
);
partclesCircle.castShadow = true;
partclesCircle.recieveShadow = true;
// partclesCircle.boundingSphere = 50;
const renderingParent = new THREE.Group();
renderingParent.add(partclesCircle);
const resizeContainer = new THREE.Group();
resizeContainer.add(renderingParent);
resizeContainer.position.set(0, -40, 50);
scene.add(resizeContainer);

// shapes
// BOX
// const boxShape = new THREE.TetrahedronGeometry(5, 1);
// const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
// const boxMultiMat = [
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
//     new THREE.MeshStandardMaterial({ map: textureLoader.load(nebula) }),
// ];
// const box = new THREE.Mesh(boxShape, boxMaterial);
// box.castShadow = true;
// box.receiveShadow = true;
// box.position.set(10, 2.5, 0);
// scene.add(box);
// PLANE
// const planSheet = new THREE.PlaneGeometry(30, 30);
// const planMat = new THREE.MeshStandardMaterial({
//     color: 0xffffff,
//     side: THREE.DoubleSide,
// });
// const plane = new THREE.Mesh(planSheet, planMat);
// plane.receiveShadow = true;
// scene.add(plane);
// plane.rotation.x = -0.5 * Math.PI;
// SPEARE
const sprareGeo = new THREE.SphereGeometry(5, 50, 50);
const spearMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(sky),
    // wireframe: true,
});
spearMat.metalness = 10;
spearMat.roughness = 0.45;
spearMat.normalMap = mapLoader;
const speare = new THREE.Mesh(sprareGeo, spearMat);
speare.position.set(0, 40, -50);
// speare.rotation.y = 18;
speare.castShadow = true;
scene.add(speare);
// speare 2
const spear2Mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(nebula),
    // wireframe: true,
});
// spear2Mat.metalness = 10;
// spear2Mat.roughness = 0.45;
spear2Mat.normalMap = mapLoader2;
const speare2 = new THREE.Mesh(sprareGeo, spear2Mat);
speare2.position.set(0, -40, 50);
// speare.rotation.y = 18;
speare2.castShadow = true;
scene.add(speare2);
// Particle Light
const particuleGeo = new THREE.SphereGeometry(0.5, 8, 8);
const partiMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
const particleLight = new THREE.Mesh(particuleGeo, partiMat);
scene.add(particleLight);
particleLight.position.y = 10;
particleLight.add(new THREE.PointLight(0xffffff, 1));

// gui.add(speare.position, "x").min(-50).max(100);
// gui.add(speare.position, "y").min(-50).max(100);
// gui.add(speare.position, "z").min(-50).max(100);
// LIGHTS
// Directional Light
const dLight = new THREE.DirectionalLight(0xffffff, 5.9);
scene.add(dLight);
dLight.position.set(30, 50, 10);
dLight.castShadow = true;
dLight.shadow.camera.top = 20;
dLight.shadow.camera.bottom = -15;
dLight.shadow.camera.right = 15;
dLight.shadow.camera.left = -15;
// Ambient Light
const ambiLight = new THREE.AmbientLight(0x999999, 0.5);
scene.add(ambiLight);

// Helpers

// Shapes Helper
// PLANE helper
// const gridHelper = new THREE.GridHelper(30);
// scene.add(gridHelper);

// Light Helper
// Directional Light helper
// const dlightHelper = new THREE.DirectionalLightHelper(dLight, 5);
// scene.add(dlightHelper);
// // shadow helper
// const dLightShadowHelper = new THREE.CameraHelper(dLight.shadow.camera);
// scene.add(dLightShadowHelper);

// Listeners
let emouseX = 0;
let emouseY = 0;

let mouseX = 0;
let mouseY = 0;

let newMouseX = 0;
let newMouseY = 0;

let targetX = 0;
let targetY = 0;
const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;
document.addEventListener("mousemove", function (event) {
    emouseX = event.clientX;
    emouseY = event.clientY;
    mouseX = event.clientX - windowX;
    mouseY = event.clientY - windowY;
    particulesMesh.rotation.x += 0.05 * (targetY - particulesMesh.rotation.x);
    particulesMesh.rotation.y += 0.05 * (targetX - particulesMesh.rotation.y);
});
window.addEventListener("scroll", function (event) {
    speare.position.y = window.scrollY * 0.02;
    speare.position.z = -window.scrollY * 0.03;
    speare2.position.y = window.scrollY * 0.02 + -20;
    speare2.position.z = -window.scrollY * 0.03 + 25;
    resizeContainer.position.y = window.scrollY * 0.02 + -20;
    resizeContainer.position.z = -window.scrollY * 0.03 + 25;
    particulesMesh.position.y = window.scrollY * 0.01;
    const scrollerIcon = document.querySelector(".scroller");
    if (window.scrollY < 400) {
        scrollerIcon.style.transform = `translate(-50%,-${window.scrollY}px)`;
    }
    if (window.scrollY > 50) {
        scrollerIcon.classList.add("hide");
    } else {
        scrollerIcon.classList.remove("hide");
    }
});
// document.addEventListener("wheel", function (event) {
//     console.log(event.deltaY);
// });
window.addEventListener("load", function (event) {
    window.scrollTo(0, 0);
});

anim.to(speare.position, { y: 0, z: 0, duration: 1.5 });
const clock = new THREE.Clock();
function animat(event) {
    // box.rotation.x += 0.01;
    // box.rotation.y += 0.01;
    speare.rotation.x += 0.001;
    speare.rotation.y += 0.001;
    speare2.rotation.x += 0.005;
    speare2.rotation.y += 0.005;
    if (planet) {
        planet.rotation.x += 0.0009;
        planet.rotation.y += 0.0009;
        planet.rotation.y += 0.03 * (targetX - planet.rotation.y);
        planet.rotation.x += 0.03 * (targetY - planet.rotation.x);
        planet.rotation.z += -0.03 * (targetY - planet.rotation.x);
    }

    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    particulesMesh.rotation.y = -0.1 * elapsedTime;
    if (emouseX > 0) {
    }
    speare.rotation.y += 0.05 * (targetX - speare.rotation.y);
    speare.rotation.x += 0.05 * (targetY - speare.rotation.x);
    speare.rotation.z += -0.05 * (targetY - speare.rotation.x);
    speare2.rotation.y += 0.05 * (targetX - speare2.rotation.y);
    speare2.rotation.x += 0.05 * (targetY - speare2.rotation.x);
    speare2.rotation.z += -0.05 * (targetY - speare2.rotation.x);
    // planet.rotation.y += 0.05 * (targetX - planet.rotation.y);
    // planet.rotation.x += 0.05 * (targetY - planet.rotation.x);
    // planet.rotation.z += -0.05 * (targetY - planet.rotation.x);

    const timer = Date.now() * 0.00025;

    particleLight.position.x = Math.sin(timer * 7) * 100;
    particleLight.position.y = Math.cos(timer * 5) * 200;
    particleLight.position.z = Math.cos(timer * 3) * 100;

    newMouseX = (event.clientX / window.innerWidth) * 2 - 1;
    newMouseY = (event.clientY / window.innerHeight) * 2 + 1;

    // var performance = Date.now() * 0.003;
    // //---
    // //_primitive.shape.visible = !options.perlin.points;
    // _primitive.point.visible = options.perlin.points;
    // //---
    // mat.uniforms["time"].value =
    //     (options.perlin.speed / 1000) * (Date.now() - start);

    // mat.uniforms["pointscale"].value = options.perlin.perlins;
    // mat.uniforms["decay"].value = options.perlin.decay;
    // mat.uniforms["size"].value = options.perlin.size;
    // mat.uniforms["displace"].value = options.perlin.displace;
    // mat.uniforms["complex"].value = options.perlin.complex;
    // mat.uniforms["waves"].value = options.perlin.waves;
    // mat.uniforms["fragment"].value = options.perlin.fragment;

    // mat.uniforms["redhell"].value = options.perlin.redhell;
    // mat.uniforms["eqcolor"].value = options.perlin.eqcolor;
    // mat.uniforms["rcolor"].value = options.perlin.rcolor;
    // mat.uniforms["gcolor"].value = options.perlin.gcolor;
    // mat.uniforms["bcolor"].value = options.perlin.bcolor;

    renderer.render(scene, camera);
    // speare.position.set(0, 0, 0);
}
renderer.setAnimationLoop(animat);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

var animProps = { scale: 1, xRot: 0, yRot: 0 };
gsap.to(animProps, {
    duration: 10,
    scale: 1.05,
    repeat: -1,
    yoyo: true,
    ease: "sine",
    onUpdate: function () {
        renderingParent.scale.set(
            animProps.scale,
            animProps.scale,
            animProps.scale
        );
    },
});
gsap.to(animProps, {
    duration: 120,
    xRot: Math.PI * 2,
    yRot: Math.PI * 4,
    repeat: -1,
    yoyo: true,
    ease: "none",
    onUpdate: function () {
        renderingParent.rotation.set(animProps.xRot, animProps.yRot, 0);
    },
});

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
