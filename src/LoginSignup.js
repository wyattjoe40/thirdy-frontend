import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'
import loginContext, { CurrentScreen } from './loginContext'

class LoginSignup extends Component {
  render() {
    var body
    var bottomNav = null
    switch (this.props.loginContext.currentScreen) {
      case (CurrentScreen.SIGNUP):
        body = <Signup />
        bottomNav = <button onClick={() => this.props.loginContext.setCurrentScreen(CurrentScreen.LOGIN)}>Go to Login</button>
        break;
      case (CurrentScreen.PROFILE):
        body = <p>Profile: Not implemented yet.</p>
        break;
      case (CurrentScreen.LOGIN):
        body = <Login />
        bottomNav = <button onClick={() => this.props.loginContext.setCurrentScreen(CurrentScreen.SIGNUP)}>Go to Signup</button>
        break;
      default:
        body = <p>Unknown screen</p>
        break;
    }
    return (
          <div>
            { body }
            { bottomNav }
          </div>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <loginContext.Consumer>
    {loginContext => (<LoginSignup {...props} loginContext={loginContext} ref={ref} />)}
  </loginContext.Consumer>
))