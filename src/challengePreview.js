import React from 'react'
import Link from './link'

class ChallengePreview extends React.Component {
  render() {
    return (
      <div className="flex flex-col items-start generic-container">
        <Link to={`/challenges/${this.props.slug}`} >
          <h3>{this.props.title}</h3>
        </Link>
        <p className="text-gray-700">{this.props.description}</p>
        <p className="text-gray-700">
          { "By " }
          <Link to={`/profiles/${this.props.author.username}`}>
            <span className="text-black">{this.props.author.username}</span>
          </Link>
        </p>
      </div>
    )
  }
}

export default ChallengePreview