import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Link from './link'
import CompletedStatus from './CompletedStatus';

class CompletedChallengePreview extends Component {
  render() {
    return (
      <div className="generic-container">
        <Link to={`/user/challenges/${this.props.challengePart.id}`}><h3>{this.props.challengePart.challenge.title}</h3></Link>
        <CompletedStatus status={this.props.challengePart.status} />
        {/* this.props.challengePart.newestTodayFeedback ?
          <div>
            <Status status={this.props.challengePart.newestTodayFeedback.status} />
            <LongTextForm title="Feedback" onSubmit={this.onUpdatedFeedback} defaultText={this.props.challengePart.newestTodayFeedback.feedbackText ?? ''} />
          </div>
          : <DailyFeedbackStatusButtons onUpdateStatus={this.onUpdatedStatus} />
        */}
      </div>
    );
  }
}

CompletedChallengePreview.propTypes = {
  challengePart: PropTypes.object.isRequired
}

export default CompletedChallengePreview;