import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ThreeButtonMenu extends Component {
  state = {}

  render() {
    return (
      <div className="relative">
        {this.state.open ?
          /* TODO wydavis: we don't want this specific of aligning here, that should be passed down from parent*/
          <div className="generic-container absolute flex flex-col items-end z-10 right-0">
            <FontAwesomeIcon onClick={() => this.setState({ open: false })} icon="times" />
            {this.props.children}
          </div>
          :
          <FontAwesomeIcon onClick={() => this.setState({ open: true })} icon="ellipsis-v" />
        }
      </div>
    );
  }
}

export default ThreeButtonMenu;