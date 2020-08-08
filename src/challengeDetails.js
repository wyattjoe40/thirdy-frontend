import React from 'react'
import LoadingState from './loadingState'
import agent from './agent'

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {loadingState: LoadingState.NOT_STARTED}
  }

  componentDidMount() {
    this.setState({loadingState: LoadingState.LOADING})
    agent.get('http://localhost:3001/api/challenges/' + this.props.slug).then((response) => {
      console.log(JSON.stringify(response));
      this.setState({challenge: response.body, loadingState: LoadingState.LOADED});
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
        body = <div>
          <p>{this.state.challenge.title}</p>
          <p>{this.state.challenge.description}</p>
        </div>
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

export default ChallengeDetails