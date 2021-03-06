import React from 'react'
import LoadingState from './loadingState'
import agent from './agent'
import { withRouter } from 'react-router-dom'
import UserLink from './UserLink'
import LoginRequiredAction from './LoginRequiredAction'
import withAuthenticationRedirector from './withAuthenticationRedirector'

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loadingState: LoadingState.NOT_STARTED }

    this.startChallenge = this.startChallenge.bind(this)
    this.createLoadedBody = this.createLoadedBody.bind(this)
  }

  componentDidMount() {
    this.setState({ loadingState: LoadingState.LOADING })
    agent.Challenge.Get(this.props.slug).then((response) => {
      this.setState({ challenge: response.body, loadingState: LoadingState.LOADED });
    })
    agent.Challenge.GetActiveUsers(this.props.slug).then((response) => {
      this.setState({ challengeActiveUsers: response.body })
    })
  }

  startChallenge() {
    console.log("Starting a challenge")
    // call the web api to start a challenge
    agent.ChallengeParticipation.Create({ challenge: { slug: this.state.challenge.slug } }).then((result) => {
      const challengeParticipation = result.body
      console.log("newly created challengeParticipation")
      console.log(challengeParticipation)
      // redirect to the challenge instance page
      this.props.history.push(`/user/challenges/${challengeParticipation.id}`)
    }).catch((err) => {
      alert("Problem starting the challenge. Please try again.")
    })
  }

  createLoadedBody() {
    return (
      <div className="w-full p-3 generic-container flex flex-wrap">
        <div className="w-full md:w-2/3">
          <h2>{this.state.challenge.title}</h2>
          <UserLink username={this.state.challenge.author.username} profilePictureUrl={this.state.challenge.author.profilePictureUrl} />
          <p className="mb-3">{this.state.challenge.description}</p>
          <LoginRequiredAction action={this.startChallenge} render=
            {action => (
              <button className="btn btn-orange" onClick={action}>Start Challenge!</button>
            )} />
          <p className="mt-3">Users have completed this challenge {this.state.challenge.completedCount} times!</p>
        </div>
        <div className="w-full md:w-1/3 generic-container">
          <p>Users currently participating:</p>
          <ul>
            {this.state.challengeActiveUsers &&
              this.state.challengeActiveUsers.map((user) => (<li><UserLink username={user.username} profilePictureUrl={user.profilePictureUrl} /></li>))}
          </ul>
        </div>
      </div>
    )
  }

  render() {
    var body
    switch (this.state.loadingState) {
      case LoadingState.NOT_STARTED:
      case LoadingState.LOADING:
        body = <p>Loading...</p>
        break;
      case LoadingState.LOADED:
        body = this.createLoadedBody()
        break;
      case LoadingState.FAILED:
        body = <p>FAILED! Try refreshing.</p>
        break;
      default:
        console.log("Unknown loading state: " + this.state.loadingState)
        break;
    }

    return body
  }
}

export default withAuthenticationRedirector(withRouter(ChallengeDetails))