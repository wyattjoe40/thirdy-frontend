import React from 'react';
import logo from './logo.svg';
import './App.css';
import ChallengePreview from './challengePreview';
import FakeData from './fakeData'
import LoadingState from './loadingState'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { loadingState: LoadingState.NOT_STARTED }
  }

  componentWillMount() {
    // call the API to retrieve challenges
    // once the API call returns then set the challenges data on our state
    this.setState({challenges: FakeData.createFakeChallenges(3)})
  }

  render() {
    var body;
    if (this.state.loadingState === LoadingState.LOADING || this.state.loadingState === LoadingState.NOT_STARTED) {
      body = <p>Loading...</p>
    } else if (this.state.loadingState === LoadingState.LOADED) {
      body = this.state.challenges ? this.state.challenges.map((ch) => (
        <ChallengePreview key={ch.slug} slug={ch.slug} title={ch.title} description={ch.description} />
      )) : <p>Loading...</p>
    } else if (this.state.loadingState === LoadingState.FAILED) {
      body = <p>Failed to load data. Please refresh and try again.</p>
    } else {
      console.log("Unknown state: " + this.state.loadingState)
    }

    return (
      <div className="App">
        {body}
      </div>
    );
  }
}


export default App;
