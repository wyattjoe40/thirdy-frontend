import React, { Component } from 'react';
import ChallengeParticipationPreview from './ChallengeParticipationPreview'
import agent from './agent'
import LoadingState from './loadingState'
import NoChallengesUpsell from './NoChallengesUpsell';

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

class MyCurrentChallenges extends Component {
  constructor(props) {
    super(props)

    this.state = { challengeParts: [], loadingState: LoadingState.NOT_STARTED }

    this.updateChallenge = this.updateChallenge.bind(this)
  }

  loadActiveChallenges() {
    // call our API to get the challenges that the user is participating in
    this.setState({ loadingState: LoadingState.LOADING })
    agent.User.ActiveChallenges().then((result) => {
      console.log("Got back the active challenges")
      const challengeParts = result.body
      // dayOfChallenge, dailyFeedback.<latest>.day
      challengeParts.forEach((challengePart) => {
        addComputedValues(challengePart)
      })
      this.setState({ challengeParts: challengeParts ?? [], loadingState: LoadingState.LOADED })
    }).catch((err) => {
      if (err) {
        console.log(err)
      }
      this.setState({ loadingState: LoadingState.FAILED })
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

  render() {
    // list of challenge participation previews
    var body
    switch (this.state.loadingState) {
      case LoadingState.NOT_STARTED:
      case LoadingState.LOADING:
        body = <p>Loading...</p>
        break;
      case LoadingState.LOADED:
        if (this.state.challengeParts.length === 0) {
          body = <div className="flex flex-col items-center">
              <p className="mb-4">You have no challenges right now.</p>
              <NoChallengesUpsell />
            </div>
        } else {
          body = <ul className="challenge-list">
            {this.state.challengeParts.map((part) => (
              <li key={part.id}>
                <ChallengeParticipationPreview updateChallenge={this.updateChallenge} challengeParticipation={part} />
              </li>
            ))}
          </ul>
        }
        break;
      case LoadingState.FAILED:
        body = <p>Something went wrong. Refreshing may fix the problem.</p>
        break;
      default:
        break;
    }
    return (
      <div className="flex-1">
        { body }
      </div>
    );
  }
}

export default MyCurrentChallenges;