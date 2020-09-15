import React from 'react';
import ChallengePreview from './challengePreview';
import LoadingState from './loadingState'
import agent from './agent'
import withAuthenticationRedirector, { AuthenticationError } from './withAuthenticationRedirector'

class Explore extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loadingState: LoadingState.NOT_STARTED }

    this.createNewChallenge = this.createNewChallenge.bind(this)
  }

  componentDidMount() {
    // call the API to retrieve challenges
    agent.Challenges.Get({}).catch(this.props.redirectOnUnauthenticated).then((response) => {
      // once the API call returns then set the challenges data on our state
      if (!response || !response.body) {
        console.log("No body for challenges")
        return
      }
      this.setState({ challenges: response.body.challenges, loadingState: LoadingState.LOADED });
    }).catch((err) => {
      if ((err instanceof AuthenticationError)) {
        console.log("caught error in explore")
        console.log(err)
        this.setState({ loadingState: LoadingState.FAILED })
      }
    })
  }

  createNewChallenge(e) {
    console.log("create challenge button clicked")
    e.preventDefault()
    agent.Challenge.Create().catch(this.props.redirectOnUnauthenticated).end()
  }

  render() {
    var body;
    if (this.state.loadingState === LoadingState.LOADING || this.state.loadingState === LoadingState.NOT_STARTED) {
      body = <p>Loading...</p>
    } else if (this.state.loadingState === LoadingState.LOADED) {
      body = this.state.challenges ? <ul className="challenge-list">{this.state.challenges.map((ch) => (
        <li key={ch.slug}><ChallengePreview author={ch.author} slug={ch.slug} title={ch.title} description={ch.description} /></li>
      ))}</ul> : <p>Loading...</p>
    } else if (this.state.loadingState === LoadingState.FAILED) {
      body = <p>Failed to load data. Please refresh and try again.</p>
    } else {
      console.log("Unknown state: " + this.state.loadingState)
    }

    return (
      <div className="flex flex-1 flex-col">
        <h1>Explore</h1>
        {body}
      </div>
    );
  }
}


export default withAuthenticationRedirector(Explore);
