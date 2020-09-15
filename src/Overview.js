import React, { Component } from 'react';
import LongTextForm from './LongTextForm'
import { isFinished } from './ChallengeParticipationHelpers'

class Overview extends Component {
  constructor(props) {
    super(props)

    this.state = {
      challengePart: {}
    }

    this.submitPreComment = this.submitPreComment.bind(this)
    this.submitPostComment = this.submitPostComment.bind(this)
  }

  submitPreComment(comment, cb) {
    this.props.updateChallengeParticipation({ preChallengeComment: comment }, cb)
  }

  submitPostComment(comment, cb) {
    this.props.updateChallengeParticipation({ postChallengeComment: comment }, cb)
  }

  render() {
    return (
      <div className="w-full">
        <LongTextForm title="Pre-Challenge Comments" defaultText={this.props.challengePart.preChallengeComment} onSubmit={this.submitPreComment} />
        {isFinished(this.props.challengePart) &&
          <LongTextForm title="Post-Challenge Comments" defaultText={this.props.challengePart.postChallengeComment} onSubmit={this.submitPostComment} />}
      </div>
    );
  }
}

export default Overview;