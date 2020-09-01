import React from 'react'
import loginContext from './loginContext'
import Link from './link'

class LoginSignupHeader extends React.Component {
  render() {
    return (
      <loginContext.Consumer>
        {(loginContext) => (
      <div id="top-bar-menu">
        <ul className="flex">
          <li className="top-bar-menu-item">
            <Link to="/explore">
              <span>Explore</span>
            </Link>
          </li>
          <li className="top-bar-menu-item">
            <button onClick={loginContext.startLogin}>
              Login
            </button>
          </li>
          <li className="top-bar-menu-item">
            <button onClick={loginContext.startSignup}>
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