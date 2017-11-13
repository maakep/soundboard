import * as React from "react";

type PropType = {
  progress: number,
  length: number,
}

type StateType = {
  progress: string,
  shouldTeleport: boolean,
}

export class Progress extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);

    this.state = {
      progress: "0%",
      shouldTeleport: false
    }
  }

  componentWillReceiveProps(props: PropType) {
    const newProgress = props.progress * 100;
    this.setState({ progress: newProgress + "%", shouldTeleport: newProgress == 0 });
  }

  render() {
    
    const trans = "linear " + (this.state.shouldTeleport ? 0 : this.props.length) + "s";
    const barStyle = { width: this.state.progress, transition: trans};
    const progressBar: JSX.Element = <div className={"progress-bar"} style={barStyle}></div>

    return (
    <div className={"progress"}>
      {progressBar}
    </div>);
  }
}