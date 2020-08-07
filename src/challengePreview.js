import React from 'react'
import Link from './link'

class ChallengePreview extends React.Component {
  render() {
    return (
      <div>
        <Link to={`/challenges/${this.props.slug}`} >
          <h3>{this.props.title}</h3>
        </Link>
        <p>{this.props.description}</p>
      </div>
    )
  }
}

export default ChallengePreview