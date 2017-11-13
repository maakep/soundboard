import * as React from "react";

import * as CopyToClipboard from "react-copy-to-clipboard";
import { Progress } from "../Progress-Bar";

type PropType = {
  name: string,
  url: string,
  category: string,
  newCategory: boolean,
}

type StateType = {
  copied: boolean,
  isPlaying: boolean,
  progress: number,
}

export class Clip extends React.Component<PropType, StateType> {
  audio: HTMLAudioElement = new Audio(this.props.url);

  constructor(props: PropType) {
    super(props);

    this.state = { 
      copied: false, 
      isPlaying: false,
      progress: 0,
    };

    this.audio.onended = () => {
      this.setState({isPlaying: false, progress: 0});
    }
  }

  audioOnClick() {
    const isPlaying: boolean = !this.audio.paused && !this.audio.ended && 0 < this.audio.currentTime;
    
    if (isPlaying) {
      this.audio.pause();
      this.audio.currentTime = 0;
    } else {
      this.audio.play();
    }
    this.setState({ isPlaying: !isPlaying, progress: +!isPlaying } );
  }

  timeoutId: number;
  handleCopy() {
    clearTimeout(this.timeoutId);
    this.setState({copied: true});
    this.timeoutId = window.setTimeout(() => {this.setState({copied: false})}, 1000);
  }
  
  render() {
    return (
      <div className={"clip-outer-wrapper"}>
        {this.props.newCategory &&
          <h1 className={"category-header"}>{ this.props.category }</h1>
        }
        <div className={ "clip-inner-wrapper" + (this.state.isPlaying ? " clip-playing" : "") }>
          <button className={"clip-button"} onClick={ () => this.audioOnClick() }>
            <span>
              { this.props.name }
            </span>
          </button>
          <CopyToClipboard text={ this.props.url.replace(new RegExp(" ", "g"), "%20") } onCopy={ () => this.handleCopy() }>
            <button className={"copy-button"}><Progress progress={ this.state.progress } length={ this.audio.duration } /></button>
          </CopyToClipboard>
          {this.state.copied && <span className={"copy-label"}>Copied</span>}
        </div>
      </div>
    );
  }
}