import * as THREE from 'three';

export default function renderSphere(radius, color) {
	const geometry = new THREE.SphereGeometry(radius, 32, 32);
	const material = new THREE.MeshBasicMaterial({ color: color });
	const mesh = new THREE.Mesh(geometry, material);
	return mesh;
}
