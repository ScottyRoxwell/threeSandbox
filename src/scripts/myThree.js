import {THREE} from '../vendor';
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import noise from './utils/perlinNoise';
import babeCube from '../objects/babeCube.glb';
import theNest from '../objects/theNest46.glb';

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
let cube;
const loader = new THREE.GLTFLoader();
loader.load(babeCube, (gltf) => {
  cube = gltf.scene.children[0];
  cube.rotateX(-Math.PI/2)
  cube.scale.set(10,10,10)

  scene.add(gltf.scene);
})
let sphereGeo = new THREE.SphereBufferGeometry(10,8,6);
let sphereMat = new THREE.MeshPhongMaterial({color: 0xff0000});
let sphere = new THREE.Mesh(sphereGeo,sphereMat);
sphere.position.z = -10;
scene.add(sphere);

// let nest;
// const loader = new THREE.GLTFLoader();
// loader.load(theNest, (gltf) => {
//   nest = gltf.scene.children[1];

//   console.log(nest)
//   scene.add(gltf.scene);
//   console.log(scene)
// })

const ambient = new THREE.AmbientLight(0xffffff)
scene.add(ambient);

// const cubeGeo = new THREE.BoxBufferGeometry(1,1,1);
// const cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000});
// const cube = new THREE.Mesh(cubeGeo,cubeMat);
// cube.scale.set(20,20,20);
// scene.add(cube);
// console.log(cube)



//=================== ANIMATION =====================//
let delta = 0;
const animate = function () {
  requestAnimationFrame( animate );
  delta += .01;
    
  cube.rotation.z -= .01;
  cube.rotation.x -= .005;
  // nest.rotation.x += .1
  
  sphere.position.x = Math.cos(delta)*20;
  sphere.position.y = Math.sin(delta)*20;

  renderer.render( scene, camera );
}

animate();
