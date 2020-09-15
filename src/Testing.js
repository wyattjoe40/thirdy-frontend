import React, { Component } from 'react';
import agent from './agent';
import { AuthenticationError } from './withAuthenticationRedirector'


class Testing extends Component {
  componentDidMount() {
    agent.User.GetCurrent().catch(this.props.redirectOnUnauthenticated).then((result) => {
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

export default Testing