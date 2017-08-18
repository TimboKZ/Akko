/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');
const elementResizeEvent = require('element-resize-event');

class ThreeWrapper {

    /**
     * @param {object} data
     * @param {Element} data.parentElement
     * @param {Visualiser} data.visualiser
     * @param {object} data.analyser
     */
    constructor(data) {
        this.parentElement = data.parentElement;
        let width = this.parentElement.offsetWidth;
        let height = this.parentElement.offsetHeight;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.canvas = this.renderer.domElement;
        this.parentElement.appendChild(this.canvas);

        this.currentScene = null;
        this.currentCamera = null;
        this.frequencyDataArray = null;
        this.analyser = data.analyser;
        this.visualiser = data.visualiser;
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
        if (visualiser) this.prepareVisualiser(visualiser);
        if (this.visualiser) this.visualiser.pause();
        this.visualiser = visualiser;
    }

    /**
     * @param {Visualiser} visualiser
     */
    prepareVisualiser(visualiser) {
        this.analyser.fftSize = visualiser.fftSize;
        this.analyser.smoothingTimeConstant = visualiser.smoothingTimeConstant;
        this.frequencyDataArray = new Float32Array(this.analyser.frequencyBinCount);
        this.timeDomainDataArray = new Float32Array(this.analyser.frequencyBinCount);
        let data = {
            renderer: this.renderer,
            width: this.canvas.clientWidth,
            height: this.canvas.clientHeight,
        };
        if (!visualiser.isInitialised()) visualiser.init(data);
        else if (visualiser.isPaused()) visualiser.revive(data);
        visualiser.resize(data);
    }

    setupListeners() {
        elementResizeEvent(this.parentElement, this.onParentResize.bind(this));
    }

    renderLoop() {
        if (this.visualiser) {
            if (this.analyser) {
                this.analyser.getFloatFrequencyData(this.frequencyDataArray);
                this.analyser.getFloatTimeDomainData(this.timeDomainDataArray);
            }
            this.visualiser.update({
                renderer: this.renderer,
                frequencyData: this.frequencyDataArray,
                timeDomainData: this.timeDomainDataArray,
            });
        } else {
            this.renderer.render(this.currentScene, this.currentCamera);
        }
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

    onParentResize() {
        let width = this.parentElement.offsetWidth;
        let height = this.parentElement.offsetHeight;
        // this.canvas.width = width;
        // this.canvas.height = height;
        this.renderer.setSize(width, height);
        // this.canvas.style.width = `${width}px`;
        // this.canvas.style.height = `${height}px`;
        // this.renderer.setViewport(0, 0, width, height);
        if (this.visualiser) this.visualiser.resize({
            renderer: this.renderer,
            width,
            height,
        });
    }

}

module.exports = ThreeWrapper;
