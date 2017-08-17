/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

/**
 * @abstract
 */
class Visualiser {

    constructor(code = 'UV', name = 'Untitled Visualiser', fftSize = 128) {
        this.code = code;
        this.name = name;
        this.fftSize = fftSize;
        this.initialised = false;
        this.paused = false;
    }

    /**
     * @param {object} data
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {number} data.height
     * @param {number} data.width
     */
    init(data) {
        this.onInit(data);
        this.initialised = true;
    }

    /**
     * @abstract
     * @param {object} data
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {number} data.height
     * @param {number} data.width
     */
    // eslint-disable-next-line
    onInit(data) {
        throw new Error(`The 'onInit' method was not defined on ${this.name}!`);
    }

    revive() {
        this.onRevive();
        this.paused = false;
    }

    /**
     * @abstract
     */
    onRevive() {
    }

    /**
     * @param {object} data
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {Uint8Array} data.frequencyData
     */
    update(data) {
        this.onUpdate(data);
    }

    /**
     * @abstract
     * @param {object} data
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {Uint8Array} data.frequencyData
     */
    // eslint-disable-next-line
    onUpdate(data) {
        throw new Error(`The 'onUpdate' method was not defined on ${this.name}!`);
    }

    /**
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {number} data.height
     * @param {number} data.width
     */
    resize(data) {
        this.onResize(data);
    }

    /**
     * @abstract
     * @param {THREE.WebGLRenderer} data.renderer
     * @param {number} data.height
     * @param {number} data.width
     */
    // eslint-disable-next-line
    onResize(data) {
    }

    pause() {
        this.onPause();
        this.paused = true;
    }

    /**
     * @abstract
     */
    onPause() {
    }

    destroy() {
        this.onDestroy();
    }

    /**
     * @abstract
     */
    onDestroy() {
        throw new Error(`The 'onDestroy' method was not defined on ${this.name}!`);
    }

    error(message) {
        // TODO: Draw error message on canvas
        throw new Error(message);
    }

    isInitialised() {
        return this.initialised;
    }

    isPaused() {
        return this.paused;
    }

}

module.exports = Visualiser;
