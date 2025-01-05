import * as THREE from 'three';
import fragmentShader from './fragment.frag?raw'

const container = document.getElementById('container');
let renderer;
let scene;
let camera;
//let cube;
let clock;
let uniforms;

init()

function init() {
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1;

	clock = new THREE.Clock()

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	container.appendChild(renderer.domElement);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_mouse: { type: "v2", value: new THREE.Vector2() }
	};

	const geometry = new THREE.PlaneGeometry(renderer.domElement.width, renderer.domElement.height);
	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		fragmentShader: fragmentShader,
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
	renderer.setPixelRatio(window.devicePixelRatio);

	onWindowResize();
	window.addEventListener('resize', onWindowResize, false);

	document.onmousemove = function(e) {
		uniforms.u_mouse.value.x = e.pageX
		uniforms.u_mouse.value.y = e.pageY
	}
	renderer.setAnimationLoop(render);
}

function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function render() {
	uniforms.u_time.value += clock.getDelta();

	renderer.render(scene, camera);
}

