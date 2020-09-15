import React, { Component } from 'react';
import LongTextForm from './LongTextForm'
import DailyFeedbackStatusButtons from './DailyFeedbackStatusButtons'
import DayStatus from './DayStatus'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class DailyFeedback extends Component {
  constructor(props) {
    super(props)

    this.onUpdateStatus = this.onUpdateStatus.bind(this)
    this.onSaveFeedback = this.onSaveFeedback.bind(this)
  }

  onUpdateStatus(status, cb) {
    this.props.saveFeedback({ day: this.props.feedback.day, status: status }, cb)
  }

  onSaveFeedback(text, cb) {
    // TODO wydavis: There's a bug when we pass in 'none' as the props for status, it is not allowed on the backend
    this.props.saveFeedback({ feedbackText: text, day: this.props.feedback.day, status: this.props.feedback.status }, cb)
  }

  render() {
    var body
    if (this.props.uneditable) {
      body =
        <>
          <DayStatus status={this.props.feedback.status} />
          <p>{this.props.feedback.feedbackText}</p>
        </>
    } else {
      body =
        <>
          {this.props.feedback.status ?
            <DayStatus status={this.props.feedback.status} />
            :
            <DailyFeedbackStatusButtons onUpdateStatus={this.onUpdateStatus} />}
          <LongTextForm title="Feedback" disabled={!this.props.feedback.status} onSubmit={this.onSaveFeedback} defaultText={this.props.feedback.feedbackText} />
        </>
    }
    return (
      <div className="w-full">
        <div className="flex w-full justify-between">
          <h2>Day {this.props.feedback.day}</h2>
          { this.props.onClose && <button onClick={this.props.onClose} className="self-start"><FontAwesomeIcon icon="times" /></button>}
        </div>
        {body}
      </div>
    );
  }
}

DailyFeedback.propTypes = {
  saveFeedback: PropTypes.func.isRequired
}

export default DailyFeedback;