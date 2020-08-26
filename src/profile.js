import React from 'react'
import agent from './agent'
import RoundImage from './RoundImage'
import Link from './link'

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

  buildChallengeGrid(challenges) {
    return (
      <div className="flex w-full flex-wrap" >
        {challenges.map((part) =>

          <div className="generic-container w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <h3>
              <Link to={`/challenges/${part.challenge.slug}`}>
                {part.challenge.title}
              </Link>
            </h3>
            <p>Days done: {part.dayOfChallenge}</p>
          </div>
        )}
      </div>)
  }

  render() {
    return (
      <div className="flex flex-col items-center w-full">
        <RoundImage alt="profile" src={this.state.user.profilePictureUrl} />
        <h2>{this.state.user.username}</h2>
        <h2 className="self-start">Active Challenges</h2>
        {this.buildChallengeGrid(this.state.challengeParts.filter(part => part.status === 'active'))}
        <h2 className="self-start">Completed Challenges</h2>
        {this.buildChallengeGrid(this.state.challengeParts.filter(part => part.status === 'complete'))}
      </div>
    )
  }
}

export default Profile