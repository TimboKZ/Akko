/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

// eslint-disable-next-line
const {render, h} = require('preact');
// eslint-disable-next-line
const UIComponent = require('./UIComponent.jsx');

class UI {

    /**
     * @param {object} data
     * @param {Element} data.container
     * @param {MusicPlayer} data.musicPlayer
     * @param {VisualisationCore} data.visCore
     */
    constructor(data) {
        this.container = data.container;
        this.musicPlayer = data.musicPlayer;
        this.visCore = data.visCore;
    }

    start() {
        render(<UIComponent musicPlayer={this.musicPlayer} visCore={this.visCore}/>, this.container);
    }

}

module.exports = UI;
