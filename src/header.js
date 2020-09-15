import React from 'react'
//import './header.css'
import HeaderUser from './HeaderUser'
import agent from './agent'
import userContext from './userContext'
import loginContext from './loginContext'
import BrandLogo from './brandLogo'
import Link from './link'
import { withRouter } from 'react-router-dom'
import HamburgerMenu from './HamburgerMenu'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showSignupModal: false, showLoginModal: props.openLogin }

    this.onSignupClick = this.onSignupClick.bind(this)
    this.onCloseSignup = this.onCloseSignup.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  onSignupClick(event) {
    this.setState({ showSignupModal: true })
  }

  onCloseSignup(event) {
    this.setState({ showSignupModal: false })
  }

  onLogout() {
    // call the backend
    agent.User.Logout().then((response) => {
      // BUG BUG: if the cookie is expired I think this errors and we don't
      // set the user to undefined
      // update the local state
      this.props.userContext.setUser(undefined)
      this.props.history.push('/')
    }).catch((err) => {
      console.log("Could not logout user. Err: " + err)
    })
  }

  render() {
    // TODO wydavis: Look at cleaning up the header bar's HamburgerMenu, specifically the way we close when an item is clicked. We could pass close function to children. We could wrap children in item that extends the child to "full" width. Another solution is to modify every clickable thing under my menu to expand.
    // TODO wydavis: UI - change the background of the items to show clickable area
    return (
      <div id="top-bar" className="flex w-full bg-green-600 text-gray-100 items-center justify-around h-18">
        <div className="max-w-screen-lg flex align-stretch flex-row items-center flex-1 justify-between">
          <BrandLogo title={this.props.title} />
          <HamburgerMenu>
            <li><Link className="text-left" to="/search"><FontAwesomeIcon icon="search" /></Link></li>
            <li><Link className="text-left" to="/explore">Explore</Link></li>
            {!this.props.userContext.user ?
              <>
                <li><button className="text-left w-full" onClick={this.props.loginContext.startLogin}>Login</button></li>
                <li><button className="text-left w-full" onClick={this.props.loginContext.startSignup}>Signup</button></li>
              </>
              :
              <>
                <li><Link className="text-left w-full" to="/user/challenges">My Challenges</Link></li>
                <li><Link className="text-left w-full" to="/user/settings">Settings</Link></li>
                <li><HeaderUser className="text-left w-full" user={this.props.userContext.user} /></li>
                <li><button className="text-left w-full" onClick={this.onLogout}>Signout</button></li>
              </>
            }
          </HamburgerMenu>
        </div>
      </div>
    )
  }
}

/*
          {this.props.userContext.user ?
            <div className="flex flex-row items-center">
              <Link to="/explore">
                <p className="m-4">Explore</p>
              </Link>
              <Link to="/user/challenges">
                <p className="m-4">My Challenges</p>
              </Link>
              <div className="m-4">
                <HeaderUser user={this.props.userContext.user} />
              </div>
              <Link to="/user/settings">
                <div className="m-4">Settings</div>
              </Link>
              <button className="m-4" onClick={this.onLogout}>Signout</button>
            </div>
            : <LoginSignupHeader onLoginClick={this.onLoginClick} onSignupClick={this.onSignupClick} />}
            */

export default withRouter(React.forwardRef((props, ref) => (
  <loginContext.Consumer>
    { loginContext => 
    <userContext.Consumer>
      {userContext => (<Header {...props} userContext={userContext} loginContext={loginContext} ref={ref} />)}
    </userContext.Consumer> }
  </loginContext.Consumer>
)))