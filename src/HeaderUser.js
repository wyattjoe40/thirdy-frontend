import React, { Component } from 'react';
import Link from './link'
import RoundImage from './RoundImage'

class HeaderUser extends Component {
  render() {
    return (
      <div className="flex flex-row items-center">
        { this.props.user.profilePictureUrl && 
        <RoundImage alt="profile" src={this.props.user.profilePictureUrl} /> }
        <Link to={`/profiles/${this.props.user.username}`}>
          <p className="ml-2">{this.props.user.username}</p>
        </Link>
      </div>
    );
  }
}

export default HeaderUser;