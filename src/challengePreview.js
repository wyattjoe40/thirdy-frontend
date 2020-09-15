import React from 'react'
import Link from './link'
import UserLink from './UserLink'

class ChallengePreview extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-start generic-container pl-4">
        <Link to={`/challenges/${this.props.slug}`} >
          <h3>{this.props.title}</h3>
        </Link>
        <p className="text-gray-700 pb-2">{this.props.description}</p>
        <div className="flex flex-row items-center">
          <p className="text-gray-700 mr-2">By</p>
          <UserLink username={this.props.author.username} profilePictureUrl={this.props.author.profilePictureUrl} />
        </div>
      </div>
    )
  }
}

export default ChallengePreview