/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

const {Component, h} = require('preact');

class UIComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTrackTitle: null,
            trackQueue: null,
            playing: false,
        };
        props.musicPlayer.addPlaybackListener(this.playbackListener.bind(this));
    }

    playbackListener(currentTrackTitle, trackQueue, playing) {
        let state = this.state;
        state.currentTrackTitle = currentTrackTitle;
        state.trackQueue = trackQueue;
        state.playing = playing;
        this.setState(state);
    }

    togglePlayback(event) {
        event.preventDefault();
        let state = this.state;
        state.playing = this.props.musicPlayer.togglePlayback();
        this.setState(state);
    }

    render() {
        return (
            <div className="akko-ui">
                <div className="akko-ui-queue">
                    <div className="akko-ui-queue-current">Playing: <strong>{this.state.currentTrackTitle}</strong></div>

                </div>
                <div className="akko-ui-controls">
                    <a href="#" alt="Toggle playback" onClick={this.togglePlayback.bind(this)}
                       className={`akko-ui-controls-play ${this.state.playing ? 'active' : ''}`}>{this.state.playing ? '❚❚' : '►'}</a>
                    <div className="akko-ui-controls-progress">
                        <div className="akko-ui-controls-progress-indicator"/>
                    </div>
                    <div className="akko-ui-controls-volume"/>
                </div>
            </div>
        );
    }
}

module.exports = UIComponent;
