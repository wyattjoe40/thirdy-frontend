import React, { Component } from 'react';
import userContext from './userContext'
import { Route } from 'react-router-dom'

class AuthenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = "AuthenticationError"
  }
}

function withAuthenticationRedirector(WrappedComponent) {
  class ApiCaller extends Component {
    constructor(props) {
      super(props)

      this.redirectOnUnauthenticated = this.redirectOnUnauthenticated.bind(this)
    }

    redirectOnUnauthenticated(err) {
      console.log("redirectOnUnauthenticated is called.")
      console.log(err);
      // if 401, delete user from userContext and go home
      // if not, pass the error through
      if (err.status === 401) {
        this.props.userContext.setUser(undefined)
        this.props.history.push("/", { error: "You are not logged in. Please login."})
        return Promise.reject(new AuthenticationError())
      } else {
        return Promise.reject(err)
      }
    }

    render() {
      return <WrappedComponent redirectOnUnauthenticated={this.redirectOnUnauthenticated} {...this.props} />
    }
  }

  return React.forwardRef((props, ref) => (
    <Route render={({ history }) => 
      <userContext.Consumer>
        {userContext => (<ApiCaller {...props} history={history} userContext={userContext} ref={ref} />)}
      </userContext.Consumer>
    }/>
  ))
}

export { withAuthenticationRedirector as default, AuthenticationError }