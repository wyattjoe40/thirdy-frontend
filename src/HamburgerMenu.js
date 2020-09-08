import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./HamburgerMenu.css"

class HamburgerMenu extends Component {
  constructor(props) {
    super(props)

    this.state = {dropdownOpen: false}

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
      this.setState({dropdownOpen: false})
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
      <nav className="relative text-left" onClick={this.onAnyClick}>
        {this.state.dropdownOpen ?
          <div className="sm:hidden" onClick={this.closeHamburger}><FontAwesomeIcon icon="times"/></div>
          : <div className="sm:hidden" onClick={this.openHamburger}><FontAwesomeIcon icon="bars"/></div>
        }
        <ul id="nav-menu-items" className={`${this.state.dropdownOpen ? "bg-green-600 generic-container" : ""} whitespace-no-wrap sm:flex sm:items-center absolute sm:relative right-0 ${dropdownDisplayState}`}>
          { this.props.children }
        </ul>
      </nav>
    );
  }
}

export default HamburgerMenu;