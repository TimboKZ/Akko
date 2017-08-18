/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const Promise = require('bluebird');

class MusicPlayer {

    /**
     * @param data
     * @param data.AudioContext
     */
    constructor(data) {
        /** @type {AudioContext} */
        this.context = new data.AudioContext();
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(this.context.destination);

        this.buffer = null;
        this.sourceNode = this.context.createBufferSource();
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;

        this.playbackListeners = [];

        this.queue = [];
    }

    start() {
        this.playNextTrack();
    }

    playNextTrack() {
        let nextItem = this.queue.pop();
        if (!nextItem) return Promise.resolve(null);

        // TODO: Add support for other types.

        if (typeof nextItem === 'string') {
            return window.fetch(nextItem)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
                .then(audioBuffer => {
                    this.buffer = audioBuffer;
                    this.stop();
                    this.play();
                    let parts = nextItem.split('/');
                    let title = parts.pop().replace(/\.[a-zA-Z0-9]+/, '');
                    for (let i = 0; i < this.playbackListeners.length; i++) {
                        this.playbackListeners[i](title, this.queue, this.playing);
                    }
                })
                .catch(error => {
                    console.error('Whoops, could load the next queue item:', error);
                });
        } else {
            console.warn('Unsupported queue item type: ', nextItem, ' Skipping!');
            return this.playNextTrack();
        }
    }

    /**
     * @callback playbackListener
     * @param {string} currentTrackTitle
     * @param {string[]} trackQueue
     * @param {boolean} playing
     */
    /**
     * @param {playbackListener} listener
     */
    addPlaybackListener(listener) {
        this.playbackListeners.push(listener);
    }

    togglePlayback() {
        if (this.playing) {
            this.pause();
        } else {
            this.play();
        }
        return this.playing;
    }

    play() {
        let offset = this.pausedAt;
        this.sourceNode = this.context.createBufferSource();
        this.sourceNode.connect(this.gain);
        this.sourceNode.connect(this.analyser);
        this.sourceNode.buffer = this.buffer;
        this.sourceNode.start(0, offset);
        this.startedAt = this.context.currentTime - offset;
        this.pausedAt = 0;
        this.playing = true;
    }

    pause() {
        if (!this.playing) return;
        let elapsed = this.context.currentTime - this.startedAt;
        this.stop();
        this.pausedAt = elapsed;
    }

    stop() {
        if (!this.playing) return;
        if (this.sourceNode) {
            this.sourceNode.disconnect();
            this.sourceNode.stop(0);
            this.sourceNode = null;
        }
        this.pausedAt = 0;
        this.startedAt = 0;
        this.playing = false;
    }

    addItem(item) {
        this.queue.unshift(item);
    }

    getAnalyser() {
        return this.analyser;
    }

}

module.exports = MusicPlayer;
