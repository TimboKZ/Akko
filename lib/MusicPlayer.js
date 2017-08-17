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
        this.context = new data.AudioContext();
        this.audioElement = data.audioElement;
        this.analyser = this.context.createAnalyser();
        this.source = this.context.createBufferSource();
        this.queue = [];
    }

    start() {
        this.prepareNextItem()
            .then(audioBuffer => {
                this.source.buffer = audioBuffer;
                this.source.connect(this.context.destination);
                this.source.connect(this.analyser);
                this.analyser.connect(this.context.destination);
                this.source.start();
            })
            .catch(error => {
                console.error('Whoops, could load the next queue item:', error);
            });
    }

    addItem(item) {
        this.queue.unshift(item);
    }

    /**
     * @return {Promise.<null|Buffer>}
     */
    prepareNextItem() {
        let nextItem = this.queue.pop();
        if (!nextItem) return Promise.resolve(null);

        // TODO: Add support for other types.

        if (typeof nextItem === 'string') {
            return window.fetch(nextItem)
                .then(response => response.arrayBuffer())
                .then(arrayBuffer => this.context.decodeAudioData(arrayBuffer));
        } else {
            console.warn('Unsupported queue item type: ', nextItem, ' Skipping!');
            return this.prepareNextItem();
        }
    }

    getAnalyser() {
        return this.analyser;
    }

}

module.exports = MusicPlayer;
