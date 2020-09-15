import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DailyFeedback from './DailyFeedback';

function Circle({ text, className, ...other }) {
  return <button {...other} className={`${className} box-content align-middle w-8 h-8 leading-8 sm:w-12 sm:h-12 sm:leading-12 text-center rounded-full focus:outline-none`}>{text}</button>
}

function FeedbackDayCircle(props) {
  return <Circle {...props} className={`feedback-circle ${props.selected ? "selected" : ""} ${props.status} ${props.today && "today"} ${props.disabled && "disabled"}`} text={props.text} />
}

class ChallengeParticipationStatusGrid extends Component {
  state = { selectedFeedback: undefined }

  componentDidUpdate(prevProps) {
    if (prevProps.feedbacks !== this.props.feedbacks) {
      if (this.state.selectedFeedback) {
        const newSelectedFeedback = this.props.feedbacks.find(feedback => feedback.day === this.state.selectedFeedback.day)
        this.setState({ selectedFeedback: newSelectedFeedback })
      }
    }
  }

  render() {
    return (
      <div>
        {this.state.selectedFeedback &&
          <div className="generic-container">
            <DailyFeedback uneditable={this.props.uneditable} onClose={() => this.setState({ selectedFeedback: undefined })} saveFeedback={this.props.saveFeedback} feedback={this.state.selectedFeedback} />
          </div>
        }
        <div className="grid gap-4 grid-cols-6">
          {this.props.feedbacks.map((feedback, index) => {
            const day = index + 1
            return <FeedbackDayCircle selected={feedback === this.state.selectedFeedback} onClick={() => { console.log("selectedFeedback"); this.setState({ selectedFeedback: feedback }) }} today={!this.props.complete && this.props.dayOfChallenge === day} text={day} disabled={day > this.props.dayOfChallenge} status={feedback.status} />
          })}
        </div>
      </div>
    );
  }
}

ChallengeParticipationStatusGrid.propTypes = {
  dayOfChallenge: PropTypes.number.isRequired,
  feedbacks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChallengeParticipationStatusGrid;