const speedElement = document.getElementById('speed');
const highestSpeedElement = document.getElementById('highestSpeed');
const resetButton = document.getElementById('resetButton');
const cube2 = document.getElementById('cube2');
let previousTimestamp = null;
let scrollSpeed = 0;
let highestSpeed = 0;

function calculateScrollSpeed(event) {
    if (event.type === 'touchmove') {
        const currentTouchTimestamp = performance.now();
        if (previousTimestamp !== null) {
            const deltaTime = currentTouchTimestamp - previousTimestamp;
            const touch = event.touches[0];
            const scrollDistance = Math.sqrt(touch.clientX ** 2 + touch.clientY ** 2); // You can adjust this to calculate the actual scroll distance based on touch position.
            scrollSpeed = Math.round(scrollDistance / deltaTime * 100) / 100;
            speedElement.innerText = scrollSpeed + ' pixels/ms';

            if (scrollSpeed > highestSpeed) {
                highestSpeed = scrollSpeed;
                highestSpeedElement.innerText = highestSpeed + ' pixels/ms';
            }

            updateAnimationDuration();
        }
        previousTimestamp = currentTouchTimestamp;
    } else if (event.type === 'wheel') {
        if (previousTimestamp !== null) {
            const currentTimestamp = performance.now();
            const deltaTime = currentTimestamp - previousTimestamp;

            // 檢查deltaTime是否太小，避免出現"infinity"
            if (deltaTime > 5) {
                const scrollDistance = Math.abs(event.deltaY);
                scrollSpeed = Math.round(scrollDistance / deltaTime * 100) / 100;
                speedElement.innerText = scrollSpeed + ' pixels/ms';

                if (scrollSpeed > highestSpeed) {
                    highestSpeed = scrollSpeed;
                    highestSpeedElement.innerText = highestSpeed + ' pixels/ms';
                }
            }
            updateAnimationDuration();
        }
        previousTimestamp = performance.now();
    }
}


/*
function calculateScrollSpeed(event) {
    if (previousTimestamp !== null) {
        const currentTimestamp = performance.now();
        const deltaTime = currentTimestamp - previousTimestamp;

        // 檢查deltaTime是否太小，避免出現"infinity"
        if (deltaTime > 5) {
            const scrollDistance = Math.abs(event.deltaY);
            scrollSpeed = Math.round(scrollDistance / deltaTime * 100) / 100;
            speedElement.innerText = scrollSpeed + ' pixels/ms';

            if (scrollSpeed > highestSpeed) {
                highestSpeed = scrollSpeed;
                highestSpeedElement.innerText = highestSpeed + ' pixels/ms';
            }
        }
        updateAnimationDuration();
    }
    previousTimestamp = performance.now();
}
*/


function resetHighestSpeed() {
    highestSpeed = 0;
    highestSpeedElement.innerText = highestSpeed + ' pixels/ms';
    scrollSpeed = 0;
}

function updateAnimationDuration() {
    const animationDuration = 10 * Math.abs((1 - scrollSpeed / 100) ** 4);
    cube2.style.animationDuration = `${animationDuration}s`;

    //    console.log(animationDuration);
    //    console.log(cube2.style.animationDuration);
}

window.addEventListener('wheel', calculateScrollSpeed);
resetButton.addEventListener('click', resetHighestSpeed);
window.addEventListener('touchstart', (event) => {
    event.preventDefault(); // Prevent default touch behavior (e.g., scrolling) to ensure smooth touch tracking.
    previousTimestamp = performance.now();
});

window.addEventListener('touchmove', calculateScrollSpeed);

cube2.onclick = function () {
    cube2.style.animationDuration = `0s`;
};






//THREE.js
import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {
    GLTFLoader
} from 'three/addons/loaders/GLTFLoader.js';

let container = document.querySelector('.container3D');
let emu, mixer, emuRun, clock = new THREE.Clock();
// 產生一個場景
const scene = new THREE.Scene();

// 產生一個相機
const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
);

// 設定相機的位置
camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

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
//const controls = new OrbitControls(camera, renderer.domElement);
//controls.update();

// 產生平面物體
const planeGeometry = new THREE.PlaneGeometry(6, 6);
const planeMaterial = new THREE.MeshPhongMaterial({
    color: '#6D6D6D',
    // 雙面著色
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 2;
plane.castShadow = false;
plane.receiveShadow = true;

// 設定平面物體在場景的位置
plane.position.set(0, 0, 0);
scene.add(plane);

// 產生一個藍色正方形物體
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({
    color: '#429ef5'
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// 設定正方形物體的位置
cube.position.set(0, 0.5, 0);
scene.add(cube);

// Load Modal
let loader = new GLTFLoader();
loader.load('../public/EmuJr.gltf',
    function (gltf) {
        //If the file is loaded, add it to the scene
        emu = gltf.scene;
        emu.traverse(function (node) {
            if (node.isMesh) {
                node.castShadow = true;
                //                node.receiveShadow = true;
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

    // 設定EMU轉動效果
    if (emu) {
        emu.position.set(2.5, 2, 0);
        emu.rotation.z = Math.PI / 2;
        emu.rotation.x += 0.01 + scrollSpeed / 10;
    }

    // 設定正方形轉動效果
    cube.rotation.x += 0.01 + scrollSpeed / 10;

    renderer.render(scene, camera);
}

// 開始執行動畫
animate();
