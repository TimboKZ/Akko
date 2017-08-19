/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');
const elementResizeEvent = require('element-resize-event');

const Visualisers = require('./visualisers');

class VisualisationCore {

    /**
     * @param {object} data
     * @param {Element} data.parentElement
     * @param {boolean} data.useDefaultVisualisers
     * @param {object} data.analyser
     */
    constructor(data) {
        this.parentElement = data.parentElement;

        this.frequencyDataArray = null;
        this.analyser = data.analyser;

        /**
         * @callback visualiserListener
         * @param {Track[]} visualisers
         * @param {int} currentVisualiserIndex
         */
        /** @type {visualiserListener[]} */
        this.listeners = [];

        this.visualisers = data.useDefaultVisualisers ? this.prepareDefaultVisualisers() : [];
        this.currentVisualiserIndex = -1;
    }

    prepareDefaultVisualisers() {
        let visualisers = [];
        for (let key in Visualisers) {
            if (!Visualisers.hasOwnProperty(key)) continue;
            let visualiserClass = Visualisers[key];
            visualisers.push(new visualiserClass());
        }
        return visualisers;
    }

    notifyListeners() {
        for(let i = 0; i < this.listeners.length; i++) {
            let listener = this.listeners[i];
            listener(this.visualisers, this.currentVisualiserIndex);
        }
    }

    /**
     * @param {visualiserListener} listener
     */
    addListener(listener) {
        this.listeners.push(listener);
    }

    /**
     * @param {Visualiser} visualiser
     */
    addVisualiser(visualiser) {
        this.visualisers.push(visualiser);
    }

    prepare() {
        let width = this.parentElement.offsetWidth;
        let height = this.parentElement.offsetHeight;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(width, height);
        this.canvas = this.renderer.domElement;
        this.parentElement.appendChild(this.canvas);
    }

    start() {
        this.setupListeners();
        this.renderLoop();
        this.notifyListeners();
    }

    /**
     * @param {int} index
     */
    useVisualiser(index) {
        let visualiser = this.visualisers[index];
        if (visualiser) this.prepareVisualiser(visualiser);
        if (this.visualiser) this.visualiser.pause();
        this.currentVisualiserIndex = index;
        this.visualiser = visualiser;
        this.notifyListeners();
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
            // TODO: Display warning about no visualiser
        }
        setTimeout(() => {
            requestAnimationFrame(this.renderLoop.bind(this));
        }, 1000 / 30 );
    }

    onParentResize() {
        let width = this.parentElement.offsetWidth;
        let height = this.parentElement.offsetHeight;
        this.renderer.setSize(width, height);
        if (this.visualiser) this.visualiser.resize({
            renderer: this.renderer,
            width,
            height,
        });
    }

}

module.exports = VisualisationCore;
