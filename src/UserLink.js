import React, { Component } from 'react';
import Link from './link'
import RoundImage from './RoundImage'

class UserLink extends Component {
  render() {
    return (
      <Link to={`/profiles/${this.props.username}`}>
        <div className="flex flex-row items-center">
          {this.props.profilePictureUrl &&
            <span className="mr-2"><RoundImage alt="profile" src={this.props.profilePictureUrl} /></span>}
          <span>{this.props.username}</span>
        </div>
      </Link>
    );
  }
}

export default UserLink;