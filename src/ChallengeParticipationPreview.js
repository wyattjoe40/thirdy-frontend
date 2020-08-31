import React, { Component } from 'react';
import ProgressBar from './ProgressBar'
import agent from './agent'
import Link from './link'
import DailyFeedbackStatusButtons from './DailyFeedbackStatusButtons'
import LongTextForm from './LongTextForm'
import Status from "./Status";

class ChallengeParticipationPreview extends Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onUpdatedStatus = this.onUpdatedStatus.bind(this)
    this.onUpdatedFeedback = this.onUpdatedFeedback.bind(this)
    this.saveNewFeedback = this.saveNewFeedback.bind(this)
  }

  saveNewFeedback(feedback, cb) {
    agent.ChallengeParticipation.Update(this.props.challengeParticipation.id, { dailyFeedback: [feedback] }).then(response => {
      if (!response.body) {
        return console.log("No challenge participation returned on update")
      }

      this.props.updateChallenge(response.body)

      cb(undefined)
    }).catch(err => {
      if (err) {
        console.log("Err while logging challenge: ")
        console.log(err)
        return cb(err)
      }

      cb("unknown err")
    })
  }

  onUpdatedStatus(status) {
    // set the saving state to true
    this.setState({ savingStatus: true })
    this.saveNewFeedback({ day: this.props.challengeParticipation.dayOfChallenge, status: status }, (err) => {
      this.setState({ savingStatus: false })
    })
    // in callback set the saving state to false
  }

  onUpdatedFeedback(feedbackText) {
    this.setState({ savingFeedback: true })
    this.saveNewFeedback({
      day: this.props.challengeParticipation.dayOfChallenge,
      status: this.props.challengeParticipation.newestTodayFeedback.status,
      feedbackText: feedbackText
    }, (err) => {
      this.setState({ savingFeedback: false })
    })
  }

  render() {
    return (
      <div className="generic-container">
        <Link to={`/user/challenges/${this.props.challengeParticipation.id}`}><h3>{this.props.challengeParticipation.challenge.title}</h3></Link>
        <ProgressBar numerator={this.props.challengeParticipation.dayOfChallenge} denominator={30} />
        {this.props.challengeParticipation.newestTodayFeedback ?
          <div>
            <Status status={this.props.challengeParticipation.newestTodayFeedback.status} />
            <LongTextForm saving={this.state.savingFeedback} title="Feedback" onSubmit={this.onUpdatedFeedback} defaultText={this.props.challengeParticipation.newestTodayFeedback.feedbackText ?? ''} />
          </div>
          : <DailyFeedbackStatusButtons saving={this.state.savingStatus} onUpdateStatus={this.onUpdatedStatus} />
        }
      </div>
    );
  }
}

export default ChallengeParticipationPreview;