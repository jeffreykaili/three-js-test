import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';


const scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x49ef4, emissive: 0x0, roughness: 1, metalness: 0, fog: true });
const cube = new THREE.Mesh(geometry, material);
const color = 0xFFFFFF;
const intensity = 0.8;
const light = new THREE.DirectionalLight(color, intensity);
const ambient_light = new THREE.AmbientLight(color, intensity); 
light.position.set(0, 10, 0);
light.target.position.set(2.53, 3.5, -10);

scene.add(light);
scene.add(ambient_light); 
scene.add(light.target);
scene.add(cube);

// const gui = new GUI();
// gui.add(light, 'intensity', 0, 2, 0.01);
// gui.add(light.target.position, 'x', -10, 10, .01);
// gui.add(light.target.position, 'z', -10, 10, .01);
// gui.add(light.target.position, 'y', 0, 10, .01);


var i = 1;
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    camera.fov = Math.max(camera.fov - 0.125, 30);
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
}
animate();