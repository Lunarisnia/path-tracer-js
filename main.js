import * as THREE from 'three';
import fragmentShader from './fragment.frag?raw'

const container = document.getElementById('container');
let renderer;
let scene;
let camera;
let cube;
let clock;
let uniforms;

let rtTexture;
let camera2;
let scene2;

init()

// TODO: Figure out how to render to texture to a shader
function init() {
	clock = new THREE.Clock();

	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.z = 1;


	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setPixelRatio(window.devicePixelRatio);
	container.appendChild(renderer.domElement);

	scene2 = new THREE.Scene();
	camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera2.position.z = -1;

	// Framebuffer for the render texture
	rtTexture = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_mouse: { type: "v2", value: new THREE.Vector2() },
	};

	const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	cube = new THREE.Mesh(geometry, material);
	cube.position.z = -2;
	scene2.add(cube);

	const planeGeometry = new THREE.PlaneGeometry(2, 2 / (16 / 9));
	const planeMaterial = new THREE.MeshBasicMaterial({ map: rtTexture.texture })
	const plane = new THREE.Mesh(planeGeometry, planeMaterial);
	scene.add(plane);

	//renderShaderPlane();

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
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	// Render to buffer using the other scene
	renderer.setRenderTarget(rtTexture);
	renderer.render(scene2, camera2);
	renderer.setRenderTarget(null); // Restore to default render target

	renderer.render(scene, camera);
}


function renderShaderPlane() {
	const geometry = new THREE.PlaneGeometry(renderer.domElement.width, renderer.domElement.height);
	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		fragmentShader: fragmentShader,
	});
	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);
}
