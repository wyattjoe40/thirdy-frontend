import React, { Component } from 'react';
import Link from './link'

class HeaderUser extends Component {
  render() {
    return (
      <div>
        <Link to={`/profiles/${this.props.user.username}`}>
          {this.props.user.username}
        </Link>
      </div>
    );
  }
}

export default HeaderUser;