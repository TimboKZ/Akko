/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const Promise = require('bluebird');
const Track = require('./Track');

const PlayerStates = {
    LOADING: 'Loading...',
    READY: 'Ready!',
    PLAYING: 'Playing...',
    PAUSED: 'Paused.',
    FINISHED: 'Finished!',
};

class MusicPlayer {

    /**
     * @param data
     * @param {AudioContext} data.audioContext
     * @param {boolean} data.autoPlay
     */
    constructor(data) {
        this.context = data.audioContext;
        this.autoPlay = data.autoPlay;
        this.gain = this.context.createGain();
        this.gain.connect(this.context.destination);
        this.analyser = this.context.createAnalyser();
        this.analyser.connect(this.context.destination);

        this.buffer = null;
        this.sourceNode = this.context.createBufferSource();
        this.startedAt = 0;
        this.pausedAt = 0;
        this.playing = false;

        /**
         * @callback playbackListener
         * @param {string} playerState
         * @param {Track[]} trackList
         * @param {int} currentTrackIndex
         */
        /** @type {playbackListener[]} */
        this.listeners = [];

        /** @type {Track[]} */
        this.trackList = [];
        this.currentTrackIndex = -1;

        this.setState(PlayerStates.READY);
    }

    setState(newState) {
        this.state = newState;
        this.notifyListeners();
    }

    notifyListeners() {
        for (let i = 0; i < this.listeners.length; i++) {
            let listener = this.listeners[i];
            listener(this.state, this.trackList, this.currentTrackIndex);
        }
    }

    /**
     * @param {playbackListener} listener
     */
    addListener(listener) {
        this.listeners.push(listener);
    }

    start() {
        this.setState(PlayerStates.READY);
        if (this.autoPlay) this.playNextTrack();
    }

    playNextTrack() {
        let nextTrackIndex = this.currentTrackIndex + 1;
        if (nextTrackIndex >= this.trackList.length) {
            this.setState(PlayerStates.FINISHED);
        }
        this.playTrack(nextTrackIndex);
    }

    playTrack(index) {
        this.setState(PlayerStates.LOADING);
        let track = this.trackList[index];
        Promise.resolve()
            .then(() => track.prepareArrayBuffer())
            .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer))
            .then(audioBuffer => {
                this.buffer = audioBuffer;
                this.stop();
                this.play();
                this.currentTrackIndex = index;
                this.setState(PlayerStates.PLAYING);
            })
            .catch(error => {
                console.error('Error preparing track:', error);
                console.warn(`Skipping '${track.title}'!`);
                return this.playNextTrack();
            });
    }

    togglePlayback() {
        if (this.playing) {
            this.pause();
        } else {
            if (this.buffer === null) this.playNextTrack();
            else this.play();
        }
        return this.playing;
    }

    play() {
        let offset = this.pausedAt;
        this.sourceNode = this.context.createBufferSource();
        this.sourceNode.connect(this.gain);
        this.sourceNode.connect(this.analyser);
        this.sourceNode.buffer = this.buffer;
        this.sourceNode.onended = this.ended.bind(this);
        this.sourceNode.start(0, offset);
        this.startedAt = this.context.currentTime - offset;
        this.pausedAt = 0;
        this.playing = true;
        this.setState(PlayerStates.PLAYING);
    }

    pause() {
        if (!this.playing) return;
        let elapsed = this.context.currentTime - this.startedAt;
        this.stop();
        this.pausedAt = elapsed;
        this.setState(PlayerStates.PAUSED);
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

    ended() {
        this.playNextTrack();
    }

    addTrack(source, title) {
        let track = new Track({
            source,
            title,
        });
        let length = this.trackList.push(track);
        this.notifyListeners();
        if (this.playing) this.playTrack(length - 1);
    }

    getAnalyser() {
        return this.analyser;
    }

}

module.exports = MusicPlayer;
module.exports.States = PlayerStates;
