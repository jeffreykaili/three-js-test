import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';

var camera_info = { height: 1, run_speed: 0.03, y_velocity: 0 }
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
    if(camera.position.x < -10 || camera.position.x > 10 || camera.position.z > 10 || camera.position.z < -10 || camera.position.y < 1) camera.position.y -= 0.1;
    if(keyboard[83]) { // back 
        camera.position.x += Math.sin(camera.rotation.y) * camera_info.run_speed; 
        camera.position.z += Math.cos(camera.rotation.y) * camera_info.run_speed; 
    }
    if(keyboard[87]) { // forward 
        camera.position.x -= Math.sin(camera.rotation.y) * camera_info.run_speed; 
        camera.position.z -= Math.cos(camera.rotation.y) * camera_info.run_speed; 
    }
    if(keyboard[68]) { // right 
        camera.position.x += Math.sin(camera.rotation.y + Math.PI/2) * camera_info.run_speed; 
        camera.position.z -= Math.cos(camera.rotation.y - Math.PI/2) * camera_info.run_speed; 
    }
    if(keyboard[65]) { // left 
        camera.position.x -= Math.sin(camera.rotation.y + Math.PI/2) * camera_info.run_speed; 
        camera.position.z += Math.cos(camera.rotation.y - Math.PI/2) * camera_info.run_speed; 
    }
    if(keyboard[39]) { // turn right 
        camera.rotation.y -= Math.PI * 0.015; 
    }
    if(keyboard[37]) { // turn left 
        camera.rotation.y += Math.PI * 0.015; 
    }
    if(keyboard[32] && camera.position.y == camera_info.height) {
        camera_info["y_velocity"] = 0.15; 
    }
    console.log(camera_info.y_velocity); 
    if(camera_info.y_velocity != 0) {
        camera.position.y += camera_info.y_velocity;
       //  console.log(camera.position.y);  
        if(camera.position.y < 1) {
            camera.position.y = 1; 
            camera_info["y_velocity"] = 0; 
            console.log("CHANGED"); 
        } else {
           camera_info["y_velocity"] -= 0.01; 
        }
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
