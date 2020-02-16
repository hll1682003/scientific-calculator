import React from "react";

export default class Display extends React.Component {
  render() {
    const { val } = this.props;
    return (
      <input className="calc-display" type="text" disabled={true} value={val} />
    );
  }
}
Display.defaultProps = {
  val: ""
};
