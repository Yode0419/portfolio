//alert("test");
let myImage = document.querySelector('#pekoImage');

myImage.onclick = function () {
    let myScr = myImage.getAttribute('src');
    if (myScr === 'img/peko.gif') {
        myImage.setAttribute('src', 'img/peko2.png');
    } else {
        myImage.setAttribute('src', 'img/peko.gif');
    }
}




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
camera.position.set(2, 4, 5);

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

// 設定軌道控制器，讓相機可以環繞觀察場景
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

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
cube.position.set(0, 0, 5);
scene.add(cube);

// Load Modal
let loader = new GLTFLoader();
loader.load('./public/EmuJr.gltf',
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

    if (mixer) {
        mixer.update(clock.getDelta());
    }
    // 設定正方形轉動效果
    //
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

// 開始執行動畫
animate();

// 配合視窗大小自動更新
function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener('resize', onWindowResize);