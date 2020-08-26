import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import LongTextForm from './LongTextForm'

class Status extends Component {
  render() {
    var statusDisplayText
    var statusDisplayIcon
    var statusDisplayColor = ""
    switch (this.props.status) {
      case 'completed':
        statusDisplayText = "Completed"
        statusDisplayIcon = "check-circle"
        statusDisplayColor = "text-green-600"
        break;
      case 'skipped':
        statusDisplayText = "Skipped"
        statusDisplayIcon = "times-circle"
        statusDisplayColor = "text-orange-600"
        break;
      default:
        statusDisplayText = "Not Completed"
        statusDisplayIcon = "question"
        break;
    }
    return (
      <p>Status: <FontAwesomeIcon className={`${statusDisplayColor}`} icon={statusDisplayIcon}/> {statusDisplayText}</p>
    )
  }
}

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
        <div className="flex">
          <button onClick={() => this.onUpdateStatus('completed')} className="btn btn-green">Complete</button>
          <button onClick={() => this.onUpdateStatus('skipped')} className="btn btn-orange">Skip</button>
        </div>}
        <LongTextForm title="Feedback" disabled={!this.props.feedback.status} onSubmit={this.onSaveFeedback} defaultText={this.props.feedback.feedbackText} />
      </div>
    );
  }
}

export default DailyFeedback;