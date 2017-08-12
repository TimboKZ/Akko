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
        this.canvas = this.renderer.domElement;
        this.parentElement.appendChild(this.canvas);

        this.visualiser = null;
        this.currentScene = null;
        this.currentCamera = null;
    }

    start() {
        this.setupListeners();
        this.currentScene = this.getDefaultScene();
        this.currentCamera = this.getDefaultCamera();
        this.renderLoop();
    }

    /**
     * @param {Visualiser} visualiser
     */
    setVisualiser(visualiser) {
        if (visualiser) {
            let width = this.canvas.clientWidth;
            let height = this.canvas.clientHeight;
            if (!visualiser.isInitialised()) visualiser.init(this.renderer, width, height);
            else if (visualiser.isPaused()) visualiser.revive();
            visualiser.resize(this.renderer, width, height);
        }
        if (this.visualiser) this.visualiser.pause();
        this.visualiser = visualiser;
    }

    setupListeners() {
        this.renderer.domElement.addEventListener('resize', this.onCanvasResize.bind(this), false);
    }

    renderLoop() {
        if (this.visualiser) this.visualiser.update(this.renderer);
        else this.renderer.render(this.currentScene, this.currentCamera);
        requestAnimationFrame(this.renderLoop.bind(this));
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
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;
        let camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.z = 5;
        return camera;
    }

    onCanvasResize() {
        let width = this.canvas.clientWidth;
        let height = this.canvas.clientHeight;
        this.canvas.width = width;
        this.canvas.height = height;
        this.renderer.setViewport(0, 0, width, height);
        if (this.visualiser) this.visualiser.resize(this.renderer, width, height);
    }

}

module.exports = ThreeWrapper;
