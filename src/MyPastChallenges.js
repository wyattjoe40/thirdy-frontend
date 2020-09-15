import React, { Component } from 'react';
import agent from './agent';
import CompletedChallengePreview from './CompletedChallengePreview'

class MyPastChallenges extends Component {
  state = { challengeParts: []}

  componentDidMount() {
    // load past challenges
    Promise.all([agent.User.CompletedChallenges(), agent.User.AbandonedChallenges()]).then((result) => {
      console.log("result: ")
      console.log(result)
      const completed = result[0].body
      const abandoned = result[1].body
      this.setState({challengeParts: completed.concat(abandoned)})
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
      <ul className="challenge-list">
        { this.state.challengeParts.map((challenge) => (
          <li key={challenge.id}><CompletedChallengePreview challengePart={challenge} /></li>
        )) }
      </ul>
    );
  }
}

export default MyPastChallenges;