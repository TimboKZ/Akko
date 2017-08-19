/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const THREE = require('three');

const MusicPlayer = require('./MusicPlayer');
const VisualisationCore = require('./VisualisationCore');
const UI = require('./UI.jsx');

/**
 * @type {{containerId: string, useDefaultVisualisers: boolean}}
 */
const defaultOptions = {
    containerId: 'akko',
    useDefaultVisualisers: true,
};

/**
 * @return {{containerId: string, useDefaultVisualisers: boolean}}
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

        this.container = document.getElementById(this.options.containerId);
        if (!this.container) throw new Error(`Could not find element with ID '${this.options.containerId}'!`);

        this.musicPlayer = new MusicPlayer({
            AudioContext: this.AudioContext,
        });
        this.visCore = new VisualisationCore({
            parentElement: this.container,
            useDefaultVisualisers: this.options.useDefaultVisualisers,
            analyser: this.musicPlayer.getAnalyser(),
        });
    }

    start() {
        this.bootstrapUI();
        this.visCore.prepare();
        this.visCore.useVisualiser(0);
        this.musicPlayer.start();
        this.visCore.start();
        this.setupListeners();
    }

    bootstrapUI() {
        this.ui = new UI({
            container: this.container,
            musicPlayer: this.musicPlayer,
            visCore: this.visCore,
        });
        this.ui.start();
    }

    /**
     * @param {Visualiser} visualiser
     */
    addVisualiser(visualiser) {
        this.visCore.addVisualiser(visualiser);
    }

    /**
     * @param {string|File|ArrayBuffer} source
     * @param {string} [title]
     */
    addTrack(source, title) {
        this.musicPlayer.addTrack(source, title);
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
            if (file.type.match(/audio.*/)) {
                this.musicPlayer.addTrack(file);
            }
        }
    }

}

module.exports = Akko;
