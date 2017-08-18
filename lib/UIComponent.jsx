/**
 * @author Timur Kuzhagaliyev <tim.kuzh@gmail.com>
 * @copyright 2017
 * @license GPL-3.0
 */

// eslint-disable-next-line
const {Component, h} = require('preact');
const PlayerStates = require('./MusicPlayer').States;

class UIComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            playerState: null,
            trackList: null,
            currentTrackIndex: null,
        };
        props.musicPlayer.addListener(this.playbackListener.bind(this));
    }

    playbackListener(playerState, trackList, currentTrackIndex) {
        this.setState({
            playerState,
            trackList,
            currentTrackIndex,
        });
    }

    playTrack(index, event) {
        event.preventDefault();
        this.props.musicPlayer.playTrack(index);
    }

    togglePlayback(event) {
        event.preventDefault();
        let state = this.state;
        state.playing = this.props.musicPlayer.togglePlayback();
        this.setState(state);
    }

    addTrackByUrl(event) {
        event.preventDefault();
        let audioUrl = prompt('Enter the URL of an audio file');
        if (audioUrl) {
            this.props.musicPlayer.addTrack(audioUrl);
        }
    }

    uploadAudioFile(event) {
        event.preventDefault();

    }

    getTrackList() {
        let trackList = this.state.trackList;
        if (trackList) {
            let tracks = [];
            for (let i = 0; i < trackList.length; i++) {
                let track = trackList[i];
                let isActive = this.state.currentTrackIndex === i;
                let activeClass = isActive ? 'active' : '';
                let symbol = isActive ? this.getPlaybackSymbol() : `#${i + 1}`;
                tracks.push(<a href="#" alt={`Play track #${i + 1}`} onClick={this.playTrack.bind(this, i)}
                               className={`akko-ui-track-list-item ${activeClass}`}>
                    <span>{symbol}</span> {track.title}</a>);
            }
            return <div className="akko-ui-track-list">{tracks}</div>;
        } else {
            return null;
        }
    }

    getPlaybackSymbol() {
        return !this.isPlaying() ? '❚❚' : '►';
    }

    getPlaybackButtonSymbol() {
        return this.isPlaying() ? '❚❚' : '►';
    }

    isPlaying() {
        return this.state.playerState === PlayerStates.PLAYING;
    }

    render() {
        return (
            <div className="akko-ui">
                <div className="akko-ui-info">
                    <div className="akko-ui-player-state">{this.state.playerState}</div>
                    {this.getTrackList()}
                    <div className="akko-ui-add-tracks">
                        <a href="#" alt="Add a track by URL" onClick={this.addTrackByUrl.bind(this)}>Add track by
                            URL</a> or <a href="#" alt="Upload an audio file" onClick={this.uploadAudioFile.bind(this)}>upload
                        audio file</a>
                        <br/>or drag & drop a file into the visualiser.
                    </div>
                </div>
                <div className="akko-ui-controls">
                    <a href="#" alt="Toggle playback" onClick={this.togglePlayback.bind(this)}
                       className={`akko-ui-controls-play ${this.isPlaying() ? 'active' : ''}`}>{this.getPlaybackButtonSymbol()}</a>
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
