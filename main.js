import * as THREE from 'three';
import fragmentShader from './fragment.frag?raw'

const container = document.getElementById('container');
let framebuffer;
let clock;
let camera;
let renderer;
let uniforms;

// Default Scene
let scene;
// Ray Traced Scene
let rtScene;

init()

function init() {
	clock = new THREE.Clock();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1;

	scene = new THREE.Scene();
	rtScene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	// Framebuffer for the render texture
	framebuffer = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_mouse: { type: "v2", value: new THREE.Vector2() },
		u_default: { value: framebuffer.texture, },
	};

	const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	const cube = new THREE.Mesh(geometry, material);
	cube.position.z = -0.5;
	scene.add(cube);


	renderShaderPlane();

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

	// Render to buffer using the other scene
	renderer.setRenderTarget(framebuffer);
	renderer.render(scene, camera);
	renderer.setRenderTarget(null); // Restore to default render target

	renderer.render(rtScene, camera);
}


function renderShaderPlane() {
	const geometry = new THREE.PlaneGeometry(renderer.domElement.width, renderer.domElement.height);
	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		fragmentShader: fragmentShader,
	});
	const mesh = new THREE.Mesh(geometry, material);
	rtScene.add(mesh);
}
