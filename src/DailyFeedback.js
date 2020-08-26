import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LongTextForm from './LongTextForm'

class Status extends Component {
  render() {
    var statusDisplayText
    var statusDisplayIcon
    switch (this.props.status) {
      case 'completed':
        statusDisplayText = "Completed"
        statusDisplayIcon = "check-circle"
        break;
      case 'skipped':
        statusDisplayText = "Skipped"
        statusDisplayIcon = "times-circle"
        break;
      case 'none':
        statusDisplayText = "Missed"
        statusDisplayIcon = "question"
        break;
      default:
        statusDisplayText = "N/A"
        statusDisplayIcon = "question"
        break;
    }
    return (
      <p>Status: <FontAwesomeIcon icon={statusDisplayIcon}/> {statusDisplayText}</p>
    )
  }
}

class DailyFeedback extends Component {
  constructor(props) {
    super(props)

    this.onSaveFeedback = this.onSaveFeedback.bind(this)
  }

  onSaveFeedback(text) {
    this.props.saveFeedback({feedbackText: text, day: this.props.feedback.day, status: this.props.feedback.status})
  }

  render() {
    return (
      <div className="w-full">
        <h2>Day {this.props.feedback.day}</h2>
        <Status status={this.props.feedback.status} />
        <LongTextForm onSubmit={this.onSaveFeedback} defaultText={this.props.feedback.feedbackText} />
      </div>
    );
  }
}

export default DailyFeedback;