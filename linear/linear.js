import * as THREE from'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

const renderer= new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(
    75,window.innerWidth / window.innerHeight,0.1,1000
);
camera.position.set(0,2,100);
const controls=new OrbitControls(camera,renderer.domElement);
controls.update();

const geometry = new THREE.SphereGeometry( 5, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { color: 0x00FF00 } ); 
const sphere = new THREE.Mesh(geometry,material);
sphere.position.set(0,0,15)

const cgeometry = new THREE.CylinderGeometry( 1, 1, 23, 21 ); 
const cmaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder=new THREE.Mesh(cgeometry,cmaterial);
cylinder.rotation.x=Math.PI/2

const sphere1=new THREE.Mesh(geometry.clone(),material.clone())
sphere1.position.set(0,0,-15);

const smaterial2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
const sphere2=new THREE.Mesh(geometry.clone(),smaterial2)

var contentMap = new Map();
contentMap.set(sphere1, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere2, 'CARBON is a building block of life,forming diverse organic molecules.');
contentMap.set(cylinder, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

document.addEventListener('click', onClick);

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects([sphere1, sphere2,sphere, cylinder]);

  if (intersects.length > 0) {
    var content = contentMap.get(intersects[0].object);
    if (content) {
      var position = intersects[0].point.clone();
      displayContent(content, position);
    }
  }
}

function createContent(contentText) {
  var content = document.createElement('div');
  content.textContent = contentText;
  content.style.position = 'absolute';
  content.style.color = 'white';
  content.style.background = 'rgba(0, 0, 0, 0.8)';
  content.style.padding = '10px';
  content.style.borderRadius='5px';
  content.style.width='150px';
  content.style.textAlign='center';
  return content;
}

function displayContent(contentText, position) {
  var content = createContent(contentText);

  var screenPosition = position.clone().project(camera);
  screenPosition.x = (screenPosition.x + 1) / 2 * window.innerWidth;
  screenPosition.y = -(screenPosition.y - 1) / 2 * window.innerHeight;

  content.style.left = screenPosition.x - 75 + 'px';
  content.style.top = screenPosition.y - 75 + 'px';

  document.body.appendChild(content);

  setTimeout(function() {
    document.body.removeChild(content);
  }, 2000);
}


const group=new THREE.Group();
group.add(cylinder)
group.add(sphere);
group.add(sphere1);
group.add(sphere2);

scene.add(group);
function animate(){
    //group.rotation.x+=0.01;
    //group.rotation.y+=0.01;
    renderer.render(scene,camera);
    controls.update();
}
renderer.setAnimationLoop(animate);
animate();