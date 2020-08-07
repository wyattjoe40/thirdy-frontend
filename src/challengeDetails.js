import React from 'react'

class ChallengeDetails extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props)
    console.log(JSON.stringify(this.props))
  }

  render() {
    return <p>{this.props.slug}</p>
  }
}

export default ChallengeDetails