import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <div>
        {this.props.numerator} / {this.props.denominator}
      </div>
    );
  }
}

export default ProgressBar;