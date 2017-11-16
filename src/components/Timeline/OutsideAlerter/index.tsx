import * as React from "react";

type PropType = {
  clickedOutside: ()=>void;
}

export class OutsideAlerter extends React.Component<PropType, null> {
  wrapperRef: any;

  constructor(props: PropType) {
      super(props);

      this.setWrapperRef = this.setWrapperRef.bind(this);           
      this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside);
  }

  /**
   * Set the wrapper ref
   */
  setWrapperRef(node: any) {
      this.wrapperRef = node;
  }

  /**
   * Alert if clicked on outside of element
   */
  handleClickOutside(event: any) {
      if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        this.props.clickedOutside();
      }
  }

  render() {
      return (
          <div ref={this.setWrapperRef}>
              {this.props.children}
          </div>
      );
  }
}
