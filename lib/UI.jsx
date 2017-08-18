/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const {render, h} = require('preact');
const UIComponent = require('./UIComponent.jsx');

class UI {

    /**
     * @param {object} data
     * @param {Element} data.container
     * @param {MusicPlayer} data.musicPlayer
     */
    constructor(data) {
        this.container = data.container;
        this.musicPlayer = data.musicPlayer;
        this.playing = false;
    }

    start() {
        render(<UIComponent musicPlayer={this.musicPlayer} />, this.container);
    }

}

module.exports = UI;
