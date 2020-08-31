import React, { Component } from 'react';
import Login from './Login'
import Signup from './Signup'
import loginContext, { CurrentScreen } from './loginContext'

class LoginSignup extends Component {
  render() {
    var body
    switch (this.props.loginContext.currentScreen) {
      case (CurrentScreen.SIGNUP):
        body = <Signup toLogin={() => this.props.loginContext.setCurrentScreen(CurrentScreen.LOGIN)}/>
        break;
      case (CurrentScreen.PROFILE):
        body = <p>Profile: Not implemented yet.</p>
        break;
      case (CurrentScreen.LOGIN):
        body = <Login toSignup={() => this.props.loginContext.setCurrentScreen(CurrentScreen.SIGNUP)}/>
        break;
      default:
        body = <p>Unknown screen</p>
        break;
    }
    return (
          <div>
            { body }
          </div>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <loginContext.Consumer>
    {loginContext => (<LoginSignup {...props} loginContext={loginContext} ref={ref} />)}
  </loginContext.Consumer>
))