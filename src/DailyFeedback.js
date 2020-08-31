import React, { Component } from 'react';
import LongTextForm from './LongTextForm'
import DailyFeedbackStatusButtons from './DailyFeedbackStatusButtons'
import Status from './Status'

class DailyFeedback extends Component {
  constructor(props) {
    super(props)

    this.onUpdateStatus = this.onUpdateStatus.bind(this)
    this.onSaveFeedback = this.onSaveFeedback.bind(this)
  }

  onUpdateStatus(status) {
    this.props.saveFeedback({day: this.props.feedback.day, status: status})
  }

  onSaveFeedback(text) {
    // TODO wydavis: There's a bug when we pass in 'none' as the props for status, it is not allowed on the backend
    this.props.saveFeedback({feedbackText: text, day: this.props.feedback.day, status: this.props.feedback.status})
  }

  render() {
    return (
      <div className="w-full">
        <h2>Day {this.props.feedback.day}</h2>
        <Status status={this.props.feedback.status} />
        { !this.props.feedback.status &&
        <DailyFeedbackStatusButtons onUpdateStatus={this.onUpdatedStatus} /> }
        <LongTextForm title="Feedback" disabled={!this.props.feedback.status} onSubmit={this.onSaveFeedback} defaultText={this.props.feedback.feedbackText} />
      </div>
    );
  }
}

export default DailyFeedback;