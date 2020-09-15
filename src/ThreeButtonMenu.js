import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import OutsideClickHandler from 'react-outside-click-handler';

class ThreeButtonMenu extends Component {
  state = {}

  render() {
    return (
      <div className="relative">
        {this.state.open ?
          /* TODO wydavis: we don't want this specific of aligning here, that should be passed down from parent*/
          <OutsideClickHandler onOutsideClick={() => this.setState({ open: false })}>
            <div className="generic-container absolute flex flex-col items-end z-10 right-0 bg-white">
              <FontAwesomeIcon className="fa-2x mb-4" onClick={() => this.setState({ open: false })} icon="times" />
              {this.props.children(() => this.setState({ open: false }))}
            </div>
          </OutsideClickHandler>
          :
          <FontAwesomeIcon className="fa-2x m-2" onClick={() => this.setState({ open: true })} icon="ellipsis-v" />
        }
      </div>
    );
  }
}

export default ThreeButtonMenu;