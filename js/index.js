import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

var camera_info = {height: 1}
const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, camera_info.height, 5); 

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x49ef4, emissive: 0x0, roughness: 1, metalness: 0, fog: true });
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, 0); 
const color = 0xFFFFFF;
const intensity = 0.8;
const light = new THREE.DirectionalLight(color, intensity);
const ambient_light = new THREE.AmbientLight(color, intensity); 
light.position.set(0, 10, 0);
light.target.position.set(2.53, 3.5, -10);

const meshFloor = new THREE.Mesh(
    new THREE.PlaneGeometry(20,20,15,15), 
    new THREE.MeshBasicMaterial({color: 0x0, wireframe: true}), 
);
meshFloor.rotation.x -= Math.PI / 2; 

scene.add(meshFloor); 
scene.add(light);
scene.add(ambient_light); 
scene.add(light.target);
scene.add(cube);

var keyboard = {}; 

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // camera.fov = Math.max(camera.fov - 0.125, 30);
    // camera.updateProjectionMatrix();
    if(keyboard[39]) { // right
        camera.rotation.y -= Math.PI * 0.015; 
    }
    if(keyboard[37]) {
        camera.rotation.y += Math.PI * 0.015; 
    }
    if(keyboard[40]) { // back 
        camera.position.x += Math.sin(camera.rotation.y) * 0.03; 
        camera.position.z += Math.cos(camera.rotation.y) * 0.03; 
    }
    if(keyboard[38]) { // forward 
        camera.position.x -= Math.sin(camera.rotation.y) * 0.03; 
        camera.position.z -= Math.cos(camera.rotation.y) * 0.03; 
    }
    renderer.render(scene, camera);
}

function keyDown(event) {
    keyboard[event.keyCode] = true; 
}

function keyUp(event) {
    keyboard[event.keyCode] = false; 
}

animate();

window.addEventListener('keydown', keyDown); 
window.addEventListener('keyup', keyUp); 
