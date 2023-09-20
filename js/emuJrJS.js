//THREE.js
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';

let container = document.querySelector('.container3D');
//container.height = 3 * container.width;

let emu, mixer, emuRun, clock = new THREE.Clock();
// 產生一個場景
const scene = new THREE.Scene();

// 產生一個相機
const camera = new THREE.PerspectiveCamera(
    27,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

// 設定相機的位置
camera.position.set(4, 1, 8);
const lookAtTarget = new THREE.Vector3(0, 2, 0);
camera.lookAt(lookAtTarget);

// 選定渲染器
const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

// enabling shadows
renderer.shadowMap.enabled = true;
//renderer.shadowMap.type = THREE.BasicShadowMap;

//{antialias: true, alpha: true}
// 初始渲染畫面尺寸
renderer.setSize(container.clientWidth, container.clientHeight);

// 加入 canvas 元素供渲染畫面
container.appendChild(renderer.domElement);

//// 設定軌道控制器，讓相機可以環繞觀察場景
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;
controls.target.set(0,2,0);
controls.update();

controls.addEventListener('change', () => {
    camera.lookAt(lookAtTarget);
});

// 產生平面物體
const planeGeometry = new THREE.PlaneGeometry(10, 10);
planeGeometry.rotateX(-Math.PI / 2);
const planeMaterial = new THREE.ShadowMaterial();
planeMaterial.opacity = 0.2;

const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

// 設定平面物體在場景的位置
plane.position.set(0, 0, 0);
scene.add(plane);



// Load Modal
let loader = new GLTFLoader();
loader.load('../public/EmuJr.gltf',
    function (gltf) {
        //If the file is loaded, add it to the scene
        emu = gltf.scene;
        emu.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
            }
        })

        scene.add(emu);


        let fileAnimations = gltf.animations;
        mixer = new THREE.AnimationMixer(emu);
        let animationName = THREE.AnimationClip.findByName(fileAnimations, 'ArmatureAction')
        emuRun = mixer.clipAction(animationName);
        emuRun.play();

    },
    function (xhr) {
        //While it is loading, log the progress
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        //If there is an error, log it
        console.error(error);
    }
);

// 建立光源
let directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x333333, 3);
scene.add(ambientLight);


// 設定動畫
function animate() {
    // 循環觸發渲染以產生動畫
    requestAnimationFrame(animate);

    // 設定EMU跑步動畫
    if (mixer) {
        mixer.update(clock.getDelta());
    }

//    controls.update();
    renderer.render(scene, camera);
}

// 開始執行動畫
animate();
