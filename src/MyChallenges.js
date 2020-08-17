import React, { Component } from 'react';
import ChallengeParticipationPreview from './ChallengeParticipationPreview'
import agent from './agent'

class MyChallenges extends Component {
  constructor(props) {
    super(props)

    this.state = { challengeParts: []}

    this.loadActiveChallenges = this.loadActiveChallenges.bind(this)
  }

  loadActiveChallenges() {
    // call our API to get the challenges that the user is participating in
    agent.User.ActiveChallenges().then((result) => {
      console.log("Got back the active challenges")
      this.setState({challengeParts: result.body ?? []})
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
    })
  }

  componentDidMount() {
    this.loadActiveChallenges()
  }

  updateChallenge(challengePart) {
    // find the challenge in our array
    // update it
    this.state.challengeParts.forEach((value, index, array) => {
      if (value.id === challengePart.id) {
        array[index] = challengePart
      }
    })
  }

  render() {
    // list of challenge participation previews
    return (
      <div>
        <button onClick={this.loadActiveChallenges} >Load Challenges</button>
        { this.state.challengeParts.map((part) => (
          <div key={part.id}>
            <ChallengeParticipationPreview updateChallenge={this.updateChallenge} Challenges={this.refreshChallenges} challengeParticipation={part} />
          </div>
        ))}
      </div>
    );
  }
}

export default MyChallenges;