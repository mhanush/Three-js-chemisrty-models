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
sphere.position.set(16,0,0)

const sphere1=new THREE.Mesh(geometry.clone(),material.clone())
sphere1.position.set(-16,0,0);

const sphere2=new THREE.Mesh(geometry.clone(),material.clone())
sphere2.position.set(0,16,0);

const sphere3=new THREE.Mesh(geometry.clone(),material.clone())
sphere3.position.set(0,0,16)

const sphere4=new THREE.Mesh(geometry.clone(),material.clone())
sphere4.position.set(0,0,-16)

const c1geometry = new THREE.CylinderGeometry( 1, 1, 16, 21 ); 
const c1material = new THREE.MeshBasicMaterial( {color: 0xffff00} ); 
const cylinder1=new THREE.Mesh(c1geometry,c1material);
cylinder1.rotation.z=Math.PI/2
cylinder1.position.set(8,0,0);
 
const cylinder2=new THREE.Mesh(c1geometry.clone(),c1material.clone());
cylinder2.rotation.z=Math.PI/2;
cylinder2.position.set(-8,0,0);

const cylinder3=new THREE.Mesh(c1geometry.clone(),c1material.clone());
cylinder3.position.set(0,8,0);

const cylinder4=new THREE.Mesh(c1geometry.clone(),c1material.clone());
cylinder4.rotation.x=Math.PI/2
cylinder4.position.set(0,0,8);

const cylinder5=new THREE.Mesh(c1geometry.clone(),c1material.clone());
cylinder5.rotation.x=Math.PI/2
cylinder5.position.set(0,0,-8);

const smaterial2 = new THREE.MeshBasicMaterial( { color: 0xff0000 } ); 
const sphere5=new THREE.Mesh(geometry.clone(),smaterial2)

var contentMap = new Map();
contentMap.set(sphere1, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere2, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere3, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere4, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(sphere5, 'CARBON is a building block of life,forming diverse organic molecules.');
contentMap.set(cylinder1, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(cylinder2, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(cylinder3, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(cylinder4, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(cylinder5, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

document.addEventListener('click', onClick);

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects([sphere1, sphere2,sphere3,sphere4,sphere5,sphere, cylinder1,cylinder2,cylinder3,cylinder4,cylinder5]);

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
group.add(sphere);
group.add(sphere1);
group.add(sphere2);
group.add(sphere3);
group.add(sphere4);
group.add(sphere5);
group.add(cylinder1);
group.add(cylinder2);
group.add(cylinder3);
group.add(cylinder4);
group.add(cylinder5);
scene.add(group);
function animate(){
    //group.rotation.x+=0.01;
    //group.rotation.y+=0.01;
    renderer.render(scene,camera);
    controls.update();
}
renderer.setAnimationLoop(animate);
animate();