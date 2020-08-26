import React, { Component } from 'react';
import userContext from './userContext'
import loginContext from './loginContext'

class LoginRequiredAction extends Component {
  render() {
    return (
      <loginContext.Consumer>
        {loginContext => ( 
          <userContext.Consumer>
            {userContext => {
              return this.props.render((e) => {
                if (userContext.user) {
                  this.props.action(e)
                } else {
                  loginContext.startLogin()
                }
              })
            }}
          </userContext.Consumer>
        )}
      </loginContext.Consumer>
    );
  }
}

export default LoginRequiredAction;