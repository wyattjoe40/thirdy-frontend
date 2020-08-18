import React, { Component } from 'react';
import ChallengeParticipationPreview from './ChallengeParticipationPreview'
import agent from './agent'

function addComputedValues(challengePart) {
  const todaysFeedback = challengePart.dailyFeedback
    .filter(dailyFeedback => dailyFeedback.day === challengePart.dayOfChallenge)
    .sort((one, two) => (one.createdAt - two.createdAt)) // TODO 
  if (todaysFeedback.length > 0) {
    challengePart.newestTodayFeedback = todaysFeedback[0]
  }
}

class MyChallenges extends Component {
  constructor(props) {
    super(props)

    this.state = { challengeParts: [] }

    this.loadActiveChallenges = this.loadActiveChallenges.bind(this)
    this.updateChallenge = this.updateChallenge.bind(this)
  }

  loadActiveChallenges() {
    // call our API to get the challenges that the user is participating in
    agent.User.ActiveChallenges().then((result) => {
      console.log("Got back the active challenges")
      const challengeParts = result.body
      // dayOfChallenge, dailyFeedback.<latest>.day
      challengeParts.forEach((challengePart) => {
        addComputedValues(challengePart)
      })
      this.setState({ challengeParts: challengeParts ?? [] })
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
    console.log("updateChallenge")
    this.setState((currentState) => {
      currentState.challengeParts.forEach((value, index, array) => {
        if (value.id === challengePart.id) {
          addComputedValues(challengePart)
          array[index] = challengePart
        }
      })

      return currentState
    })
  }

  updateLoggedToday() {
  }

  render() {
    // list of challenge participation previews
    return (
      <div className="flex-1">
        <button onClick={this.loadActiveChallenges} >Load Challenges</button>
        {this.state.challengeParts.map((part) => (
          <div key={part.id}>
            <ChallengeParticipationPreview updateChallenge={this.updateChallenge} Challenges={this.refreshChallenges} challengeParticipation={part} />
          </div>
        ))}
      </div>
    );
  }
}

export default MyChallenges;