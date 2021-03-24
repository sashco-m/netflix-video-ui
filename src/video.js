import React, { useState } from 'react';
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import Duration from './Duration';

import './App.css';
import fullscreen from './fullscreen2.png'
import arrow from './arrow.png'
import play from './play.png'
import pause from './pause.png'

class Video extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      playing : false,
      controls: false,
      light: false,
      volume: 0.5,
      muted: false,
      played: 0,
      loaded: 0,
      duration: 0,
      playbackRate: 1.0,
      loop: false
    };

  }

  handleVolumeChange = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }

  handlePlayPause = () => {
    this.setState({ playing: !this.state.playing })
  }

  handleSeekMouseDown = e => {
    this.setState({ seeking: true })
  }

  handleSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
    document.getElementById("slider").style.background = 'linear-gradient(to right, red 0%, red ' + this.state.played*100 + '%, #fff ' + this.state.played*100 + '%, white 100%)';
  }

  handleSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  handleProgress = state => {
    console.log('onProgress', state)
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
    document.getElementById("slider").style.background = 'linear-gradient(to right, red 0%, red ' + this.state.played*100 + '%, #fff ' + this.state.played*100 + '%, white 100%)';
  }
  handleSkip10 = () => {
    let curr = this.player.getCurrentTime();
    this.player.seekTo(curr + 10, 'seconds');
  }
  handleBack10 = () => {
    let curr = this.player.getCurrentTime();
    this.player.seekTo(curr - 10, 'seconds');
  }

  ref = player => {
    this.player = player
  }

  handleClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  handleDuration = (duration) => {
    console.log('onDuration', duration)
    this.setState({ duration })
  }
  handleSetPlaybackRate = (rate) => {
    this.setState({ playbackRate: rate })
  }


  render(){
    return (
      <div className="app">
        <div className="section">
          <div className="player-wrapper">
          <div style={{position:'relative'}}>
            <img className='clickable arrow' width='30px' height='30px' src={arrow} />
            <p className='inline' style={{color:'white',marginLeft:'40px'}}>Back to Browse</p>
          </div>
            <ReactPlayer 
              ref={this.ref}
              width='100%'
              height='100%'
              playing={this.state.playing}
              volume={this.state.volume}
              playbackRate={this.state.playbackRate}
              onSeek={e => console.log('onSeek', e)}
              onProgress={this.handleProgress}
              onDuration={this.handleDuration}
              url='https://www.youtube.com/watch?v=SMKPKGW083c&ab_channel=RelaxationFilmChonoLight'
            />
            <div>
              <div className='search-container inline'>
                <input
                  type='range' min={0} max={0.999999} step='any'
                  id="slider"
                  value={this.state.played}
                  onMouseDown={this.handleSeekMouseDown}
                  onChange={this.handleSeekChange}
                  onMouseUp={this.handleSeekMouseUp}
                />
              </div>
              <Duration seconds={this.state.duration - this.state.duration * this.state.played} className='inline' />
            </div>
            <div style={{position:'relative'}}>
              {this.state.playing ? <img class='clickable play' onClick={this.handlePlayPause} width='25px' height='25px' src={pause} /> : <img class='clickable play' onClick={this.handlePlayPause} width='25px' height='25px' src={play} />}
              <a style={{marginLeft:'50px'}} className="inline button1" onClick={this.handleBack10}>-10</a>
              <a className="inline button1" onClick={this.handleSkip10}>+10</a>
              <input className="inline" type='range' min={0} max={1} step='any' value={this.state.volume} onChange={this.handleVolumeChange} />
              <p className="inline" style={{color:'white',marginRight:"120px",marginLeft:"120px"}}>Norway Beautiful Nature</p>
              <a className="inline button1" onClick={()=>this.handleSetPlaybackRate(1)}>1x</a>
              <a className="inline button1" onClick={()=>this.handleSetPlaybackRate(1.5)}>1.5x</a>
              <a className="inline button1" onClick={()=>this.handleSetPlaybackRate(2)}>2x</a>

              <img class='clickable fullscreen' onClick={this.handleClickFullscreen} width='30px' height='30px' src={fullscreen} />
            </div>   
        </div>
      </div>
      </div>
    );
  
}
}

export default Video;
