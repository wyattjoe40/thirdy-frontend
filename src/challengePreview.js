import React from 'react'
import Link from './link'

class ChallengePreview extends React.Component {
  render() {
    var author
    if (this.props.author) {
      author = <p>{this.props.author.username}</p>
    } else {
      author = <p>No author</p>
    }
    return (
      <div>
        <Link to={`/challenges/${this.props.slug}`} >
          <h3>{this.props.title}</h3>
        </Link>
        <p>{this.props.description}</p>
        {author}
      </div>
    )
  }
}

export default ChallengePreview