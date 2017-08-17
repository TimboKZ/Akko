/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');

const MusicPlayer = require('./MusicPlayer');
const ThreeWrapper = require('./ThreeWrapper');
const UI = require('./UI.jsx');
const Visualisers = require('./visualisers');

/**
 * @type {{containerId: string, defaultVisualizers: boolean}}
 */
const defaultOptions = {
    containerId: 'akko',
    defaultVisualizers: true,
};

/**
 * @return {{containerId: string, defaultVisualizers: boolean}}
 */
const mergeOptions = (options = {}) => {
    let result = {};
    for (let key in defaultOptions) {
        if (!defaultOptions.hasOwnProperty(key)) continue;
        result[key] = options[key] !== undefined ? options[key] : defaultOptions[key];
    }
    return result;
};

class Akko {

    constructor(options) {
        if (!THREE) throw new Error('Akko could not find three.js (`THREE`)!');
        if (!window) throw new Error('Akko could not find `window` variable! Are you running Akko in browser?');
        if (!document) throw new Error('Akko could not find `document` variable! Are you running Akko in browser?');

        this.AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!this.AudioContext) throw new Error('Akko could not find `AudioContext`! Is it supported in your browser?');

        this.options = mergeOptions(options);
        this.musicPlayer = new MusicPlayer({
            AudioContext: this.AudioContext,
        });
        this.visualisers = this.options.defaultVisualizers ? [new Visualisers.BarVisualiser()] : [];
    }

    start() {
        this.container = document.getElementById(this.options.containerId);
        if (!this.container) throw new Error(`Could not find element with ID '${this.options.containerId}'!`);

        this.bootstrapUI();

        this.threeWrapper = new ThreeWrapper({
            parentElement: this.container,
            analyser: this.musicPlayer.getAnalyser(),
        });
        this.threeWrapper.setVisualiser(this.visualisers[0]);

        this.musicPlayer.start();
        this.threeWrapper.start();
        this.setupListeners();
    }

    bootstrapUI() {
        this.ui = new UI({
            container: this.container,
        });
        this.ui.start();
    }

    /**
     * @param {Visualiser} visualiser
     */
    addVisualiser(visualiser) {
        this.visualisers.push(visualiser);
    }

    /**
     * TODO: Extend JSDoc to Web Audio files
     * @param {string} item
     */
    addToQueue(item) {
        this.musicPlayer.addItem(item);
    }

    /**
     * @private
     */
    setupListeners() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.container.addEventListener('dragover', this.onDragOver.bind(this), false);
            this.container.addEventListener('drop', this.onDrop.bind(this), false);
        } else {
            console.warn('The File APIs are not fully supported your browser. Drag & drop disabled in Akko.');
        }
    }

    /**
     * @private
     */
    onDragOver(event) {
        event.stopPropagation();
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    /**
     * @private
     */
    onDrop(event) {
        event.stopPropagation();
        event.preventDefault();
        let files = event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (file.type.match(/image.*/)) {
                let reader = new FileReader();
                reader.onload = function (e2) {
                    // finished reading file data.
                    let img = document.createElement('img');
                    img.src = e2.target.result;
                    document.body.appendChild(img);
                };
                reader.readAsDataURL(file); // start reading the file data.
            }
        }
    }

}

module.exports = Akko;
