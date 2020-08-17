import React from 'react'
import LoadingState from './loadingState'
import agent from './agent'
import userContext from './userContext'
import loginContext from './loginContext'
import { withRouter } from 'react-router-dom'

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {loadingState: LoadingState.NOT_STARTED}

    this.startChallenge = this.startChallenge.bind(this)
  }

  componentDidMount() {
    this.setState({loadingState: LoadingState.LOADING})
    agent.Challenge.Get(this.props.slug).then((response) => {
      this.setState({challenge: response.body, loadingState: LoadingState.LOADED});
    })
  }

  startChallenge() {
    console.log("Starting a challenge")
    // call the web api to start a challenge
    agent.ChallengeParticipation.Create({challenge: {slug: this.state.challenge.slug}}).then((result) => {
      const challengeParticipation = result.body
      console.log("newly created challengeParticipation")
      console.log(challengeParticipation)
      // redirect to the challenge instance page
      this.props.history.push(`/user/challenges/${challengeParticipation.id}`)
    }).catch((err) => {
      alert("Problem starting the challenge. Please try again.")
    })
  }

  render() {
    var body
    switch (this.state.loadingState) {
      case LoadingState.NOT_STARTED:
      case LoadingState.LOADING:
        body = <p>Loading...</p>
        break;
      case LoadingState.LOADED:
        body = 
        <userContext.Consumer>
          {(userContext) => (
        <div>
          <p>{this.state.challenge.title}</p>
          <p>{this.state.challenge.description}</p>
          <p>{this.state.challenge.author.username}</p>
          { userContext.user ? 
          <button onClick={this.startChallenge}>Start Challenge!</button>
          : <loginContext.Consumer>{loginContext => 
            (<button onClick={(e) => 
              loginContext.startLogin()}>Start Challenge!</button>
            )}</loginContext.Consumer>
          }
        </div>)}
        </userContext.Consumer>
        break;
      case LoadingState.FAILED:
        body = <p>FAILED! Try refreshing.</p>
        break;
      default:
        console.log("Unknown loading state: " + this.state.loadingState)
        break;
    }

    return <div>{body}</div>
  }
}

export default withRouter(ChallengeDetails)