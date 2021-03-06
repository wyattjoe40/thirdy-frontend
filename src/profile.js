import React from 'react'
import agent from './agent'
import RoundImage from './RoundImage'
import Link from './link'
import { isFinished } from './ChallengeParticipationHelpers'

class Profile extends React.Component {
  constructor(props) {
    super(props)

    this.state = { user: {}, challengeParts: [] }

    this.buildChallengeGrid = this.buildChallengeGrid.bind(this)
  }

  componentDidMount() {
    agent.User.GetUser(this.props.username).then((result) => {
      this.setState({ user: result.body })
    }).catch(err => {
      console.log(err)
    })
    agent.User.ParticipatingChallenges(this.props.username).then((result) => {
      this.setState({ challengeParts: result.body })
    })
  }

  buildChallengeGrid(title, challenges) {
    return (
      <div className="generic-container w-full mb-4">
        <h2 className="self-start">{title}</h2>
        <div className="flex w-full flex-wrap items-stretch" >
          {challenges.map((part) =>
            <div className="w-full h-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 pr-4 pb-4">
              <div className="w-full h-full generic-container">
                <h3>
                  <Link to={`/challenges/${part.challenge.slug}`}>
                    {part.challenge.title}
                  </Link>
                </h3>
                <p>Days done: {part.dayOfChallenge}</p>
              </div>
            </div>
          )}
        </div>
      </div>)
  }

  render() {
    return (
      <div className="flex flex-col items-center w-full">
        <RoundImage alt="profile" src={this.state.user.profilePictureUrl} />
        <h2>{this.state.user.username}</h2>
        {this.buildChallengeGrid("Active Challenges", this.state.challengeParts.filter(part => part.status === 'active'))}
        {this.buildChallengeGrid("Completed Challenges", this.state.challengeParts.filter(part => isFinished(part)))}
      </div>
    )
  }
}

export default Profile