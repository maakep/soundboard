import * as React from "react";
import * as classNames from "classnames";
import { OutsideAlerter } from "./OutsideAlerter";

type PropType = {

}

type StateType = {
  hasFocus: boolean;
}

export class Timeline extends React.Component<PropType, StateType> {
  constructor(props: PropType) {
    super(props);
    this.state = {
      hasFocus: false,
    }
  }

  render() {
    return (
      <OutsideAlerter clickedOutside={ () => {this.setState({ hasFocus: false})} }>
        <div className={classNames("timeline-root", {"timeline-active": this.state.hasFocus})} onClick={() => this.setState({hasFocus: true})}>
          ?
          { this.props.children }
        </div>
      </OutsideAlerter>
    );
  }
}