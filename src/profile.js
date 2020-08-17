import React from 'react'

class Profile extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.username}</p>
      </div>
    )
  }
}

export default Profile