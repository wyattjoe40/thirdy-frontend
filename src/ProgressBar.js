import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <div className="m-2">
        {this.props.numerator} / {this.props.denominator}
      </div>
    );
  }
}

export default ProgressBar;