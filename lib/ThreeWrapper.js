/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');

class ThreeWrapper {

    constructor(parentElement) {
        this.parentElement = parentElement;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.parentElement.appendChild(this.renderer.domElement);

        this.currentScene = null;
        this.currentCamera = null;
    }

    start() {
        this.setupListeners();
        this.currentScene = this.getDefaultScene();
        this.currentCamera = this.getDefaultCamera();
        this.renderLoop();
    }

    setupListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this), false);
    }

    renderLoop() {
        requestAnimationFrame(this.renderLoop.bind(this));
        this.renderer.render(this.currentScene, this.currentCamera);
    }

    getDefaultScene() {
        let scene = new THREE.Scene();
        let geometry = new THREE.BoxGeometry(1, 1, 1);
        let material = new THREE.MeshBasicMaterial({color: 0x00ff00});
        let cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        return scene;
    }

    getDefaultCamera() {
        let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;
        return camera;
    }

    onWindowResize() {
        this.currentCamera.aspect = window.innerWidth / window.innerHeight;
        this.currentCamera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}

module.exports = ThreeWrapper;
