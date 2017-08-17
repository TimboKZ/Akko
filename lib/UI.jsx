/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const {render, Component, h} = require('preact');

class UI {

    /**
     * @param {object} data
     * @param {Element} data.container
     */
    constructor(data) {
        this.container = data.container;
    }

    start() {
        render((
            <div className="akko-ui">
                <div className="akko-ui-queue">
                    <div className="akko-ui-queue-current">Currently playing: <strong>Bensound Dubstep</strong></div>
                </div>
                {this.audioElement}
            </div>
        ), this.container);
    }

}

module.exports = UI;
