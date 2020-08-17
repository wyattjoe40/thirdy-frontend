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
    agent.ChallengeParticipation.Update(this.props.challengeParticipation.id, {dayNumber: 1, completed: true}).then((err, response) => {
      if (err) {
        console.log("Err while logging challenge: ")
        console.log(err)
        return
      }

      if (!response.body) {
        return console.log("No challenge participation returned on update")
      }

      this.props.updateChallenge(response.body)
    })
  }

  render() {
    return (
      <div style={{padding: "5px", margin: "10px", borderStyle: "solid", borderWidth: "1px", borderColor: "grey"}}>
        <h3>{this.props.challengeParticipation.challenge.title}</h3>
        <ProgressBar numerator={3} denominator={30} />
        <button onClick={this.logChallengeToday}>Log today</button>
      </div>
    );
  }
}

export default ChallengeParticipationPreview;