import React, { Component } from 'react';
import LoadingState from './loadingState'
import agent from './agent'

class ChallengeParticipationDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {loadingState: LoadingState.NOT_STARTED, challengePart: undefined}
    
    this.createMainView = this.createMainView.bind(this)
  }

  componentDidMount() {
    // api call to get the details of the challenge part
    this.setState({loadingState: LoadingState.LOADING})
    agent.ChallengeParticipation.Get(this.props.participationId).then((result) => {
      console.log(result.body)
      this.setState({challengePart: result.body})
      this.setState({loadingState: LoadingState.LOADED})
    }).catch((err) => {
      console.log(err)
      this.setState({loadingState: LoadingState.FAILED})
    })
  }

  createMainView() {

  }

  render() {
    var body
    switch (this.state.loadingState) {
      case LoadingState.NOT_STARTED:
      case LoadingState.LOADING:
        body = <div>Loading...</div>
        break;
      case LoadingState.LOADED:
        body = <div>
          <h1>{this.state.challengePart.challenge.title}</h1>
          </div>
        break;
      case LoadingState.FAILED:
        body = <div>Could not load this challenge. Please refresh.</div>
        break;
      default:
        break;
    }
    return (
      <div>
        {body}
      </div>
    );
  }
}

export default ChallengeParticipationDetails;