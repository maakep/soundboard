import * as React from "react";
import * as CopyToClipboard from "react-copy-to-clipboard";

type PropType = {
  name: string,
  url: string,
  category: string,
  newCategory: boolean,
}

type StateType = {
  copied: boolean;
  isPlaying: boolean;
}

export class Clip extends React.Component<PropType, StateType> {
  audio: HTMLAudioElement = new Audio(this.props.url);
  
  constructor(props: PropType) {
    super(props);
    this.state = { copied: false, isPlaying: false };

    this.audio.onended = () => {
      this.setState({isPlaying: false});
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

    this.setState({ isPlaying: !isPlaying} );
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
          <CopyToClipboard text={ this.props.url } onCopy={ () => this.handleCopy() }>
            <button className={"copy-button"}>
              Copy
            </button>
          </CopyToClipboard>
        </div>
      </div>
    );
  }
}