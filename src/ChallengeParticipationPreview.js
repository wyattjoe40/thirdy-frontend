import React, { Component } from 'react';
import ProgressBar from './ProgressBar'
import agent from './agent'

class ChallengeParticipationPreview extends Component {
  constructor(props) {
    super(props)

    this.logChallengeToday = this.logChallengeToday.bind(this)
  }

  logChallengeToday(e) {
    // call back to the API to add a completion for today
    agent.ChallengeParticipation.Update(this.props.challengeParticipation.id, {dailyFeedback: [{day: this.props.challengeParticipation.dayOfChallenge, status: 'completed'}]}).then(response => {
      if (!response.body) {
        return console.log("No challenge participation returned on update")
      }

      this.props.updateChallenge(response.body)
    }).catch(err => {
      if (err) {
        console.log("Err while logging challenge: ")
        console.log(err)
        return
      }
    })
  }

  render() {
    return (
      <div className="generic-container">
        <h3>{this.props.challengeParticipation.challenge.title}</h3>
        <ProgressBar numerator={this.props.challengeParticipation.dayOfChallenge} denominator={30} />
        { this.props.challengeParticipation.newestTodayFeedback ? 
        <p>Logged today!</p>
        : 
        <button onClick={this.logChallengeToday}>Log today</button>
        }
      </div>
    );
  }
}

export default ChallengeParticipationPreview;