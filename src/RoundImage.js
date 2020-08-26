import React, { Component } from 'react';

class RoundImage extends Component {
  render() {
    return (
      <img className="rounded-full w-10 h-10" alt={this.props.alt} src={this.props.src} />
    );
  }
}

export default RoundImage;