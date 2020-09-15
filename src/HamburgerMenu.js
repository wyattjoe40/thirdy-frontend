import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./HamburgerMenu.css"
import OutsideClickHandler from 'react-outside-click-handler';

class HamburgerMenu extends Component {
  constructor(props) {
    super(props)

    this.state = { dropdownOpen: false }

    this.openHamburger = this.openHamburger.bind(this)
    this.closeHamburger = this.closeHamburger.bind(this)
    this.onAnyClick = this.onAnyClick.bind(this)
  }

  openHamburger() {
    this.setState({ dropdownOpen: true })
  }

  closeHamburger() {
    this.setState({ dropdownOpen: false })
  }

  onAnyClick(e) {
    if (this.state.dropdownOpen) {
      this.setState({ dropdownOpen: false })
    }
  }

  render() {
    var dropdownDisplayState
    if (this.state.dropdownOpen) {
      dropdownDisplayState = "block"
    } else {
      dropdownDisplayState = "hidden"
    }

    return (
      <OutsideClickHandler onOutsideClick={() => {
        if (this.state.dropdownOpen) { this.closeHamburger() }
      }} >
        <nav className="relative text-left mr-2" onClick={this.onAnyClick}>
          {this.state.dropdownOpen ?
            <div className="sm:hidden" onClick={this.closeHamburger}><FontAwesomeIcon icon="times" size="2x" /></div>
            : <div className="sm:hidden" onClick={this.openHamburger}><FontAwesomeIcon icon="bars" size="2x" /></div>
          }
          <ul id="nav-menu-items" className={`${this.state.dropdownOpen ? "bg-green-600 generic-container" : ""} whitespace-no-wrap sm:flex sm:items-center absolute sm:relative right-0 ${dropdownDisplayState}`}>
            {this.props.children}
          </ul>
        </nav>
      </OutsideClickHandler>
    );
  }
}

export default HamburgerMenu;