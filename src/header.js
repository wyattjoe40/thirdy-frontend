import React from 'react'
import './header.css'
import LoginSignupHeader from './loginSignupHeader'
import HeaderUser from './HeaderUser'
import agent from './agent'
import userContext from './userContext'
import BrandLogo from './brandLogo'
import Link from './link'

class Header extends React.Component {
  constructor(props) {
    console.log("Header constructor is called")
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
    }).catch((err) => {
      console.log("Could not logout user. Err: " + err)
    })
  }

  render() {
    return (
    <div id="top-bar" className="bg-red">
      <nav>
        <BrandLogo title={this.props.title} />
        {this.props.userContext.user ?
          <div>
            <HeaderUser user={this.props.userContext.user} onLogout={() => this.props.userContext.setUser(undefined)} />
            <Link to="/user/challenges">
              <div>My Challenges</div>
            </Link>
            <button onClick={this.onLogout}>Signout</button>
          </div>
          : <LoginSignupHeader onLoginClick={this.onLoginClick} onSignupClick={this.onSignupClick} />}
      </nav>
    </div>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <userContext.Consumer>
    {userContext => (<Header {...props} userContext={userContext} ref={ref} />)}
  </userContext.Consumer>
))