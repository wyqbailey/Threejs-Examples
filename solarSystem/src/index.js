import './base.css';
import './main.css';

import Earth from './earth';
import Moon from './moon';
import Star from './star';
// import Orbit from './orbit';
// import test from 'three/build/three.min.js';

// console.log(test);
function App() {
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.conW = window.innerWidth;
	this.conH = window.innerHeight;
	this.group = new THREE.Object3D();
	this.camera = new THREE.PerspectiveCamera(70, this.conW/this.conH, 1, 1000);
	this.scene = new THREE.Scene();
	this.light = new THREE.PointLight('#fff', 2, 100);

	this.earth = new Earth();
	this.moon = new Moon();
	this.star = new Star();
	// this.orbit = new Orbit();
}

App.prototype.init = function() {
	this.camera.position.set(0, 1, 6);
	this.camera.rotation.x = - Math.PI / 12;

	this.light.position.set(-10, 0, 20);
	this.scene.add(this.light);

	this.earth.init();
	this.group.add(this.earth.group);
	this.moon.init();
	this.group.add(this.moon.group);
	this.star.init(10);
	this.group.add(this.star.group);

	this.scene.add(this.group);

	window.addEventListener( 'resize', this.onWindowResize.bind(this), false );

	this.renderer.setSize(this.conW, this.conH);
	document.body.appendChild(this.renderer.domElement);
};

App.prototype.run = function() {
	requestAnimationFrame(() => {
		this.run();
	});
	this.moon.run();
	this.earth.run();
	this.renderer.render(this.scene, this.camera);
};

App.prototype.onWindowResize = function() {
	this.camera.aspect = window.innerWidth / window.innerHeight;
	this.camera.updateProjectionMatrix();
	this.renderer.setSize(window.innerWidth, window.innerHeight);
};

var app = new App();

app.init();

app.run();


