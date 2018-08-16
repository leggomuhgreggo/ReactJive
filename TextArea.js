import React, { PureComponent } from "react";

class ControlledTextArea extends PureComponent {
  static defaultProps = {
    value: ""
  };

  state = {
    value: this.props.value
  };

  handleChange = ({ target: { value: newValue } }) => {
    this.props.onChange && this.props.onChange(newValue);
    this.setState(({ value }) => ({ value: newValue }));
  };

  render() {
    return (
      <textarea onChange={this.handleInputChange} value={this.state.value} />
    );
  }
}

export default ControlledTextArea;
