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
      <div>
        { this.state.challengeParts.map((challenge) => (
          <CompletedChallengePreview challengePart={challenge} />
        )) }
      </div>
    );
  }
}

export default MyPastChallenges;