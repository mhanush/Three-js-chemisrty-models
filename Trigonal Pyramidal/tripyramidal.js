//Trigonal Pyramidal
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import * as THREE from 'three';
// Create a scene
var scene = new THREE.Scene();

// Create a camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


// Create a renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();


// Create atoms
var atomGeometry = new THREE.SphereGeometry(0.2, 32, 32);
var atomMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var atomMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });

var centralAtom = new THREE.Mesh(atomGeometry, atomMaterial1);
var atom1 = new THREE.Mesh(atomGeometry, atomMaterial);
var atom2 = new THREE.Mesh(atomGeometry, atomMaterial);
var atom3 = new THREE.Mesh(atomGeometry, atomMaterial);

// Position atoms
centralAtom.position.set(0, 0, 0.5);
atom1.position.set(1, 0, 0);
atom2.position.set(-0.5, 0.87, 0);
atom3.position.set(-0.5, -0.87, 0);

// Create bonds
const bondMaterial = new THREE.LineBasicMaterial({ color: 0xffff00 , linewidth:5});
const bondGeometry1 = new THREE.BufferGeometry().setFromPoints([centralAtom.position, atom1.position]);
const bondGeometry2 = new THREE.BufferGeometry().setFromPoints([centralAtom.position, atom2.position]);
const bondGeometry3 = new THREE.BufferGeometry().setFromPoints([centralAtom.position, atom3.position]);

const bond1 = new THREE.LineSegments(bondGeometry1, bondMaterial);
const bond2 = new THREE.LineSegments(bondGeometry2, bondMaterial);
const bond3 = new THREE.LineSegments(bondGeometry3, bondMaterial);

var contentMap = new Map();
contentMap.set(atom1, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(atom2, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(atom3, 'HYDROGEN is the simplest element, abundant and reactive in chemical processes.');
contentMap.set(centralAtom, 'NITROGEN is a chemical element with the symbol N and atomic number 7.');
contentMap.set(bond1, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(bond2, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
contentMap.set(bond3, 'BONDING is atoms joining to form molecules by sharing or transferring electrons.');
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

document.addEventListener('click', onClick);

function onClick(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects([atom1, atom2,atom3,centralAtom, bond1,bond2,bond3]);

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


// Add atoms and bonds to the scene
scene.add(centralAtom);
scene.add(atom1);
scene.add(atom2);
scene.add(atom3);
scene.add(bond1);
scene.add(bond2);
scene.add(bond3);

// Animation loop
var animate = function () {
    requestAnimationFrame(animate);
    controls.update();

    renderer.render(scene, camera);
};

animate();

