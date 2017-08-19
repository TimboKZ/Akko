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
            trackList: [],
            currentTrackIndex: null,
            visualisers: [],
            currentVisualiserIndex: null,
        };
        props.musicPlayer.addListener(this.playbackListener.bind(this));
        props.visCore.addListener(this.visualiserListener.bind(this));
    }

    playbackListener(playerState, trackList, currentTrackIndex) {
        this.setState({
            playerState,
            trackList,
            currentTrackIndex,
        });
    }

    visualiserListener(visualisers, currentVisualiserIndex) {
        this.setState({
            visualisers,
            currentVisualiserIndex,
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
            let trackComponents = [];
            for (let i = 0; i < trackList.length; i++) {
                let track = trackList[i];
                let isActive = this.state.currentTrackIndex === i;
                let activeClass = isActive ? 'active' : '';
                let symbol = isActive ? this.getPlaybackSymbol() : `#${i + 1}`;
                trackComponents.push(<a href="#" alt={`Play track #${i + 1}`} onClick={this.playTrack.bind(this, i)}
                               className={`akko-ui-container-list-item ${activeClass}`}>
                    <span>{symbol}</span> {track.title}</a>);
            }
            return <div className="akko-ui-container-list">{trackComponents}</div>;
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

    useVisualiser(index, event) {
        event.preventDefault();
        this.props.visCore.useVisualiser(index);
    }

    getVisualiserList() {
        let visualisers = this.state.visualisers;
        if (visualisers) {
            let visualiserComponents = [];
            for (let i = 0; i < visualisers.length; i++) {
                let visualiser = visualisers[i];
                let isActive = this.state.currentVisualiserIndex === i;
                let activeClass = isActive ? 'active' : '';
                let symbol = visualiser.code;
                visualiserComponents.push(<a href="#" alt={`Use visualiser #${i + 1}`} onClick={this.useVisualiser.bind(this, i)}
                               className={`akko-ui-container-list-item ${activeClass}`}>
                    <span>{symbol}</span> {visualiser.name}</a>);
            }
            return <div className="akko-ui-container-list">{visualiserComponents}</div>;
        } else {
            return null;
        }
    }

    render() {
        return (
            <div className="akko-ui">
                <div className="akko-ui-container akko-ui-tracks">
                    <div className="akko-ui-container-title">Player: {this.state.playerState}</div>
                    {this.getTrackList()}
                    <div className="akko-ui-add-tracks">
                        <a href="#" alt="Add a track by URL" onClick={this.addTrackByUrl.bind(this)}>Add track by
                            URL</a> or <a href="#" alt="Upload an audio file" onClick={this.uploadAudioFile.bind(this)}>upload
                        audio file</a>
                        <br/>or drag & drop a file into the visualiser.
                    </div>
                </div>
                <div className="akko-ui-container akko-ui-visualisers">
                    <div className="akko-ui-container-title">Visualisers</div>
                    {this.getVisualiserList()}
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
