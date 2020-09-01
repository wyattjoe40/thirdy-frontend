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
    console.log("on any click")
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
      <nav className="text-left" onClick={this.onAnyClick}>
        {this.state.dropdownOpen ?
          <div className="sm:hidden" onClick={this.closeHamburger}><FontAwesomeIcon icon="times"/></div>
          : <div className="sm:hidden" onClick={this.openHamburger}><FontAwesomeIcon icon="bars"/></div>
        }
        <ul id="nav-menu-items" className={`${dropdownDisplayState} sm:flex sm:items-center`}>
          { this.props.children }
        </ul>
      </nav>
    );
  }
}

export default HamburgerMenu;