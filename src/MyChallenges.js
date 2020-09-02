import React, { Component } from 'react';
import ChallengeParticipationPreview from './ChallengeParticipationPreview'
import agent from './agent'

function compare(one, two) {
  return new Date(two.createdAt) - new Date(one.createdAt)
}

function addComputedValues(challengePart) {
  const todaysFeedback = challengePart.dailyFeedback
    .filter(dailyFeedback => dailyFeedback.day === challengePart.dayOfChallenge)
    .sort(compare)
  if (todaysFeedback.length > 0) {
    challengePart.newestTodayFeedback = todaysFeedback[0]
  }
}

class MyChallenges extends Component {
  constructor(props) {
    super(props)

    this.state = { challengeParts: [] }

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
        {this.state.challengeParts.map((part) => (
          <div key={part.id}>
            <ChallengeParticipationPreview updateChallenge={this.updateChallenge} challengeParticipation={part} />
          </div>
        ))}
      </div>
    );
  }
}

export default MyChallenges;