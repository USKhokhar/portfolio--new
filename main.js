import * as THREE from 'three';


let scene, camera, renderer, planet

function init(){
  // Init scene
	scene = new THREE.Scene();

	// Init camera (PerspectiveCamera)
	camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	);

	// Init renderer
	renderer = new THREE.WebGLRenderer({ alpha: true, });

	// Set size (whole window)
	renderer.setSize(window.innerWidth, window.innerHeight);

	// Render to canvas element
	document.body.appendChild(renderer.domElement);

	// Init BoxGeometry object (rectangular cuboid)
	const geometry = new THREE.SphereGeometry(2);

	// Create material with color
	// const material = new THREE.MeshBasicMaterial({ color: 0x17131a });

	// Add texture - 
	const texture = new THREE.TextureLoader().load('/assets/earth-8k.jpg');

	// Create material with texture
	const material = new THREE.MeshBasicMaterial({ map: texture });

	// Create mesh with geo and material
	planet = new THREE.Mesh(geometry, material);
	// Add to scene
	scene.add(planet);

	// Position camera
	camera.position.z = 5;
}

function animate() {
  requestAnimationFrame(animate)
  planet.rotation.y += 0.002

  renderer.render(scene, camera)
}

function onResize() {
  camera.aspect = window.innerWidth/window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener('resize', onResize, false)

init()
animate()