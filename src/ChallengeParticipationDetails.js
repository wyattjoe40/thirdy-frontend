import React, { Component } from 'react';
import LoadingState from './loadingState'
import agent from './agent'
import { isFinished } from './ChallengeParticipationHelpers'
import DailyFeedback from './DailyFeedback';
import Overview from './Overview'
import Link from './link'
import ChallengeParticipationStatusGrid from './ChallengeParticipationStatusGrid';
import TabMenu from './TabMenu'
import TabMenuItem from './TabMenuItem'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ThreeButtonMenu from './ThreeButtonMenu';

function newestDailyFeedback(feedbackOne, feedbackTwo) {
  if (feedbackOne.createdAt > feedbackTwo.createdAt) {
    return feedbackOne
  } else {
    return feedbackTwo
  }
}

function StatusDisplay(props) {
  var statusText
  var textColor
  switch (props.status) {
    case "completed":
      statusText = "Complete"
      textColor = "text-green-400"
      break;
    case "active":
      statusText = "In Progress"
      textColor = "text-yellow-500"
      break;
    case "abandoned":
      statusText = "Abandoned"
      textColor = "text-grey-400"
      break;
    default:
      break;
  }
  return <p className={textColor}>{statusText}</p>
}

const SelectedType = Object.freeze({ OVERVIEW: 1, DAY: 2 })

class ChallengeParticipationDetails extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedType: SelectedType.OVERVIEW, loadingState: LoadingState.NOT_STARTED, challengePart: undefined, feedbacks: {} }

    this.getFilteredAllChallengeDays = this.getFilteredAllChallengeDays.bind(this)
    this.dayRowIsClicked = this.dayRowIsClicked.bind(this)
    this.saveFeedback = this.saveFeedback.bind(this)
    this.updateChallengeParticipation = this.updateChallengeParticipation.bind(this)
    this.onAbandonChallenge = this.onAbandonChallenge.bind(this)
  }

  saveFeedback(feedback, cb) {
    agent.ChallengeParticipation.Update(this.state.challengePart.id, { dailyFeedback: [feedback] }).then((result) => {
      this.setState((state) => {
        const feedbacks = state.feedbacks
        feedbacks[feedback.day] = feedback
        return { feedbacks: feedbacks }
      })
      if (cb) cb()
    }).catch((err) => {
      console.log(err)
      if (cb) cb(err)
    })
  }

  // create a mapping from 1-30
  // bucket the challenge feedbacks by day
  // get the latest for each day
  // put the bucketed challenges in the mapping
  getFilteredAllChallengeDays(challengePart) {
    var latestFeedbacksOverAllDays = {}
    challengePart.dailyFeedback.forEach((feedback) => {
      var feedbackForCurrentDay = latestFeedbacksOverAllDays[feedback.day]
      if (!feedbackForCurrentDay) {
        latestFeedbacksOverAllDays[feedback.day] = feedback
      } else {
        latestFeedbacksOverAllDays[feedback.day] = newestDailyFeedback(feedbackForCurrentDay, feedback)
      }
    })
    var arr = [...Array(30).keys()]
    arr.forEach((index) => {
      var day = index + 1
      if (!latestFeedbacksOverAllDays[day]) {
        latestFeedbacksOverAllDays[day] = { day: day, status: undefined, feedbackText: '' }
      }
    })
    return latestFeedbacksOverAllDays;
  }

  componentDidMount() {
    // api call to get the details of the challenge part
    this.setState({ loadingState: LoadingState.LOADING })
    agent.ChallengeParticipation.Get(this.props.participationId).then((result) => {
      const part = result.body
      const feedbacks = this.getFilteredAllChallengeDays(part)
      this.setState({ challengePart: part, feedbacks: feedbacks })
      this.setState({ loadingState: LoadingState.LOADED })
    }).catch((err) => {
      console.log(err)
      this.setState({ loadingState: LoadingState.FAILED })
    })
  }

  dayRowIsClicked(index, e) {
    this.setState((state) => ({ selectedType: SelectedType.DAY, selectedFeedback: state.feedbacks[index] }))
  }

  updateChallengeParticipation(challengePart, cb) {
    console.log("challengePart")
    console.log(challengePart)
    agent.ChallengeParticipation.Update(this.state.challengePart.id, challengePart).then((result) => {
      this.setState({ challengePart: result.body })
      cb()
    }).catch(err => {
      console.log(err)
      cb(err)
    })
  }

  onAbandonChallenge(e) {
    agent.ChallengeParticipation.Abandon(this.state.challengePart.id).then((result) => {
      this.setState({challengePart: result.body})
    }).catch((err) => {
      console.log("onAbandonChallenge: ")
      console.log(err)
    })
  }

  render() {
    var body
    switch (this.state.loadingState) {
      case LoadingState.NOT_STARTED:
      case LoadingState.LOADING:
        body = <div>Loading...</div>
        break;
      case LoadingState.LOADED:
        const finished = isFinished(this.state.challengePart)
        body = <div className="flex flex-col full-without-header">
          <a className="mb-2" href="/user/challenges"><FontAwesomeIcon icon="chevron-left" className="mr-2" />Back to My Challenges</a>
          <div className="generic-container">
            <div className="flex justify-between">
              <h2>{this.state.challengePart.challenge.title}</h2>
              { !finished && 
              <ThreeButtonMenu>
                { onClose => 
                (<button className="btn btn-orange" onClick={(e) => {onClose(); this.onAbandonChallenge(e);}}>Abandon Challenge</button>)}
              </ThreeButtonMenu> }
            </div>
            <p>Go to <Link className="underline hover:text-blue-600" to={`/challenges/${this.state.challengePart.challenge.slug}`}>challenge page</Link></p>
            <StatusDisplay status={this.state.challengePart.status} />
          </div>
          <TabMenu className="mt-2">
            { !finished && 
            <TabMenuItem title="Today">
              <DailyFeedback saveFeedback={this.saveFeedback} feedback={this.state.feedbacks[this.state.challengePart.dayOfChallenge]} />
            </TabMenuItem> }
            <TabMenuItem title="Overview">
              <ChallengeParticipationStatusGrid uneditable={finished} saveFeedback={this.saveFeedback} complete={finished} dayOfChallenge={this.state.challengePart.dayOfChallenge} feedbacks={Object.values(this.state.feedbacks)} />
            </TabMenuItem>
            <TabMenuItem title="Extras">
              <Overview updateChallengeParticipation={this.updateChallengeParticipation} challengePart={this.state.challengePart} />
            </TabMenuItem>
          </TabMenu>
        </div>
        break;
      case LoadingState.FAILED:
        body = <div>Could not load this challenge. Please refresh.</div>
        break;
      default:
        break;
    }
    return (
      body
    );
  }
}

export default ChallengeParticipationDetails;
