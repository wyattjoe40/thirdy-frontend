import React from 'react'
//import './header.css'
import LoginSignupHeader from './loginSignupHeader'
import HeaderUser from './HeaderUser'
import agent from './agent'
import userContext from './userContext'
import BrandLogo from './brandLogo'
import Link from './link'
import { withRouter } from 'react-router-dom'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = { showSignupModal: false, showLoginModal: props.openLogin }

    this.onSignupClick = this.onSignupClick.bind(this)
    this.onCloseSignup = this.onCloseSignup.bind(this)
    this.onLogout = this.onLogout.bind(this)
  }

  componentDidMount() {
    agent.User.GetCurrent().then((result) => {
      this.props.userContext.setUser(result.body)
    }).catch((err) => {
      if (err.status === 401) {
        console.log("No current valid cookie")
        // we don't have access to ourselves, so we are not logged in, which is fine
        return
      }

      // unknown issue
      console.log(err)
    })
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
      // update the local state
      this.props.userContext.setUser(undefined)
      this.props.history.push('/')
    }).catch((err) => {
      console.log("Could not logout user. Err: " + err)
    })
  }

  render() {
    return (
      <div id="top-bar" className="flex flex-row bg-green-600 text-gray-100 items-center justify-around h-18">
        <div className="max-w-screen-lg flex align-stretch flex-row items-center flex-1 justify-between">
          <BrandLogo title={this.props.title} />
          {this.props.userContext.user ?
            <div className="flex flex-row items-center">
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
        </div>
      </div>
    )
  }
}

export default withRouter(React.forwardRef((props, ref) => (
  <userContext.Consumer>
    {userContext => (<Header {...props} userContext={userContext} ref={ref} />)}
  </userContext.Consumer>
)))