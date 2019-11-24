import {THREE} from '../vendor';
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import noise from './utils/perlinNoise';

const GLTFLoader = require('./gltfloader');

const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
// const camera = new THREE.OrthographicCamera(width/-2,width/2,height/-2,height/2,1,1000);
const camera = new THREE.PerspectiveCamera(50,width/height,1,1000);

camera.position.z = 50;
camera.lookAt(0,0,0);

// Moves camera along X axis according to screen width
// function cameraControls(w,h){
//   if(w <= 476){
//     camera.position.x = 160;
//     camera.lookAt(160,0,0);
//   } else if(w <= 568){
//     camera.position.x = 125;
//     camera.lookAt(125,0,0);
//   } else if(w <= 800){
//     camera.position.x = 135;
//     camera.lookAt(135,0,0);
//   } else {
//     camera.position.x = 0;
//     camera.lookAt(0,0,0);
//   }
// }
// cameraControls(width);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width,height);
const canvas = document.getElementById('canvas');
canvas.appendChild(renderer.domElement);

// ADD EVENT LISTENERS
let mouseX, mouseY, clientX, clientY;

document.body.addEventListener('mousemove', moveNest);

function moveNest(e){
  mouseX = THREE.Math.mapLinear(e.clientX,0,width,-width/2,width/2);
  mouseY = THREE.Math.mapLinear(e.clientY,0,height,height/2,-height/2);
  clientX = e.clientX;
  clientY = e.clientY;
  return mouseX, mouseY, clientX, clientY;
}

// On Window Resize
window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );
  // cameraControls(window.innerWidth,window.innerHeight);
}
// ====================== END SCENE SETUP ========================== //

const ambient = new THREE.HemisphereLight(0xffffff, 0x000000)
scene.add(ambient);

const cubeGeo = new THREE.BoxBufferGeometry(1,1,1);
const cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
const cube = new THREE.Mesh(cubeGeo,cubeMat);
cube.scale.set(20,20,20);
scene.add(cube);
console.log(cube)



//=================== ANIMATION =====================//

const animate = function () {
  requestAnimationFrame( animate );
    
  cube.rotation.x += .01;
  cube.rotation.y += .01;
  cube.rotation.z += .0001;

  renderer.render( scene, camera );
}

animate();
