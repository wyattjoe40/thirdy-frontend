import React, { Component } from 'react';
import agent from './agent';
import withAuthenticationRedirector, { AuthenticationError } from './withAuthenticationRedirector'


class Testing extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.catchUnauthenticated(agent.User.GetCurrent()).then((result) => {
      console.log("Testing, then")
      console.log(result)
    }).catch((err) => {
      if (!(err instanceof AuthenticationError)) {
        console.log("Testing, catch was called without an auth err")
        console.log(err)
      }
    })
  }

  render() {
    return (
      <div>
      </div>
    );
  }
}

export default withAuthenticationRedirector(Testing)