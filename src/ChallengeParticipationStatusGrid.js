import React, { Component } from 'react';
import PropTypes from 'prop-types'

function Circle({text, className, ...other}) {
  return <button onClick={(e) => {e.preventDefault(); console.log(e.target.value)}} {...other} className={`${className} box-content align-middle w-8 h-8 leading-8 sm:w-12 sm:h-12 sm:leading-12 text-center rounded-full focus:outline-none`}>{text}</button>
}

function FeedbackDayCircle(props) {
  return <Circle className={`feedback-circle ${props.status} ${props.today && "today"} ${ props.disabled && "disabled" }`} text={props.text} />
}

class ChallengeParticipationStatusGrid extends Component {
  render() {
    return (
      <div className="grid gap-4 grid-cols-6">
        { this.props.feedbacks.map((feedback, index) => {
          const day = index + 1
          return <FeedbackDayCircle today={this.props.dayOfChallenge === day} text={day} disabled={day > this.props.dayOfChallenge} status={feedback.status} />
        })}
      </div>
    );
  }
}

ChallengeParticipationStatusGrid.propTypes = {
  dayOfChallenge: PropTypes.number.isRequired,
  feedbacks: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default ChallengeParticipationStatusGrid;