/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

/**
 * @abstract
 */
class Visualiser {

    constructor(code, name = 'Untitled Visualiser') {
        this.code = code;
        this.name = name;
        this.initialised = false;
        this.paused = false;
    }

    init(renderer, width, height) {
        this.onInit(renderer, width, height);
        this.initialised = true;
    }

    /**
     * @abstract
     */
    onInit(renderer, width, height) {
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

    update(renderer) {
        this.onUpdate(renderer);
    }

    /**
     * @abstract
     * @param renderer
     */
    onUpdate(renderer) {
        throw new Error(`The 'onUpdate' method was not defined on ${this.name}!`);
    }

    resize(renderer, width, height) {
        this.onResize(renderer, width, height);
    }

    /**
     * @abstract
     * @param renderer
     */
    onResize(renderer, width, height) {
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
