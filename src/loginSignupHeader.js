import React from 'react'
import loginContext from './loginContext'

class LoginSignupHeader extends React.Component {
  render() {
    return (
      <loginContext.Consumer>
        {(loginContext) => (
      <div id="top-bar-menu">
        <ul>
          <li className="top-bar-menu-item">
            <button onClick={loginContext.startLogin}>
              Login
            </button>
          </li>
          <li className="top-bar-menu-item">
            <button onClick={this.props.onSignupClick}>
              Signup
            </button>
          </li>
        </ul>
      </div>)}
      </loginContext.Consumer>
    )
  }
}

export default LoginSignupHeader