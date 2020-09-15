import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import withUserContext from './withUserContext'

class Signout extends Component {
  componentDidMount() {
    this.props.userContext.setUser(undefined)
  }

  render() {
    return (
      <Redirect to="/" />
    );
  }
}

export default withUserContext(Signout);