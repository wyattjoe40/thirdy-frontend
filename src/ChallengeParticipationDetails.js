import React, { Component } from 'react';
import LoadingState from './loadingState'
import agent from './agent'
import DailyFeedbackRow from './DailyFeedbackRow'
import NavRow from './NavRow'
import DailyFeedback from './DailyFeedback';
import Overview from './Overview'

function newestDailyFeedback(feedbackOne, feedbackTwo) {
  if (feedbackOne.createdAt > feedbackTwo.createdAt) {
    return feedbackOne
  } else {
    return feedbackTwo
  }
}

function createStatusDisplay(statusString) {
  var statusText
  var textColor
  switch(statusString) {
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

const SelectedType = Object.freeze({OVERVIEW: 1, DAY: 2})

class ChallengeParticipationDetails extends Component {
  constructor(props) {
    super(props)

    this.state = { selectedType: SelectedType.OVERVIEW, loadingState: LoadingState.NOT_STARTED, challengePart: undefined, feedbacks: undefined, selectedFeedback: undefined }

    this.getFilteredAllChallengeDays = this.getFilteredAllChallengeDays.bind(this)
    this.createNavigationView = this.createNavigationView.bind(this)
    this.dayRowIsClicked = this.dayRowIsClicked.bind(this)
    this.updateFeedback = this.updateFeedback.bind(this)
    this.saveFeedback = this.saveFeedback.bind(this)
    this.updateChallengeParticipation = this.updateChallengeParticipation.bind(this)
  }

  updateFeedback(feedback) {
    // find the feedback for the given day
    // update the values
    // TODO wydavis: Will this update the state enough...
  }

  saveFeedback(feedback) {
    agent.ChallengeParticipation.Update(this.state.challengePart.id, { dailyFeedback: [feedback]}).then((result) => {
      this.setState((state) => {
        const feedbacks = state.feedbacks
        feedbacks[feedback.day] = feedback
        return { feedbacks: feedbacks, selectedFeedback: feedback }
      })
    }).catch((err) => {
      console.log(err)
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
        latestFeedbacksOverAllDays[day] = {day: day, status: undefined, feedbackText: ''}
      }
    })
    return latestFeedbacksOverAllDays;
  }

  componentDidMount() {
    // api call to get the details of the challenge part
    this.setState({ loadingState: LoadingState.LOADING })
    agent.ChallengeParticipation.Get(this.props.participationId).then((result) => {
      this.setState({ challengePart: result.body, feedbacks: this.getFilteredAllChallengeDays(result.body) })
      this.setState({ loadingState: LoadingState.LOADED })
    }).catch((err) => {
      console.log(err)
      this.setState({ loadingState: LoadingState.FAILED })
    })
  }

  dayRowIsClicked(index, e) {
    this.setState((state) => ({ selectedType: SelectedType.DAY, selectedFeedback: state.feedbacks[index]}))
  }

  createNavigationView() {
    return [...Array(30).keys()].map((object, index) => {
      const dayNumber = index + 1;
      const feedbackForThisDay = this.state.feedbacks[dayNumber]
      const isToday = this.state.challengePart.dayOfChallenge === dayNumber
      const isSelected = (this.state.selectedFeedback && this.state.selectedType === SelectedType.DAY) ? this.state.selectedFeedback.day === dayNumber : false
      const isDisabled = dayNumber > this.state.challengePart.dayOfChallenge
      if (!feedbackForThisDay) {
        return <DailyFeedbackRow isDisabled={isDisabled} isSelected={isSelected} key={dayNumber} onClick={this.dayRowIsClicked} isToday={isToday} day={dayNumber} />
      } else {
        return <DailyFeedbackRow isDisabled={isDisabled} isSelected={isSelected} key={dayNumber} onClick={this.dayRowIsClicked} isToday={isToday} status={feedbackForThisDay.status} day={feedbackForThisDay.day} feedbackText={feedbackForThisDay.feedbackText} />
      }
    })
  }

  updateChallengeParticipation(challengePart) {
    console.log("challengePart")
    console.log(challengePart)
    agent.ChallengeParticipation.Update(this.state.challengePart.id, challengePart).then((result) => {
      this.setState({challengePart: result.body})
    }).catch(err => {
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
        body = <div className="flex flex-col full-without-header">
          <div className="generic-container">
            <h2>{this.state.challengePart.challenge.title}</h2>
            { createStatusDisplay(this.state.challengePart.status) }
          </div>
          <div className="flex flex-row w-full overflow-y-auto" >
            <div className="flex flex-col w-1/4" >
              <NavRow onClick={() => { this.setState({selectedType: SelectedType.OVERVIEW})}}>
                <p>Overview</p>
              </NavRow>
              <div className="generic-container flex flex-col overflow-y-auto ">
                {this.createNavigationView()}
              </div>
            </div>
            <div className="flex generic-container flex-1 w-3/4">
              { this.state.selectedType === SelectedType.OVERVIEW && 
              <Overview updateChallengeParticipation={this.updateChallengeParticipation} challengePart={this.state.challengePart} /> }
              { this.state.selectedType === SelectedType.DAY && 
              <DailyFeedback saveFeedback={this.saveFeedback} feedback={this.state.selectedFeedback}/> }
            </div>
          </div>
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
