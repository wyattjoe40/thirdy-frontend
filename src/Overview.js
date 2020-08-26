import React, { Component } from 'react';
import LongTextForm from './LongTextForm'

class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      challengePart: {}
    }

    this.submitPreComment = this.submitPreComment.bind(this)
    this.submitPostComment = this.submitPostComment.bind(this)
  }

  submitPreComment(comment) {
    this.props.updateChallengeParticipation({ preChallengeComment: comment })
  }

  submitPostComment(comment) {
    this.props.updateChallengeParticipation({ postChallengeComment: comment })
  }

  render() {
    return (
      <div className="w-full">
        <p>Current day: {this.props.challengePart.dayOfChallenge}</p>
        <LongTextForm title="Pre-Challenge Comments" defaultText={this.props.challengePart.preChallengeComment} onSubmit={this.submitPreComment} />
        {this.state.challengePart.status === 'completed' &&
          <LongTextForm title="Post-Challenge Comments" defaultText={this.props.challengePart.postChallengeComment} onSubmit={this.submitPostComment} />}
      </div>
    );
  }
}

export default Overview;