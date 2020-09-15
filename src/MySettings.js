import React, { Component } from 'react';
import agent from './agent'
import userContext from './userContext'

class MySettings extends Component {
  constructor(props) {
    super(props)

    this.state = { }

    this.onFileChange = this.onFileChange.bind(this)
    this.onUploadImage = this.onUploadImage.bind(this)
  }

  onFileChange(e) {
    this.setState({selectedImage: e.target.files[0]})
  }

  onUploadImage(e) {
    console.log("onUploadImage")

    const formData = new FormData()
    formData.append("profile-picture", this.state.selectedImage, this.state.selectedImage.name)
    agent.User.AddProfilePicture(formData).then(result => {
      const picUrl = result.body.profilePictureUrl
      const user = this.props.userContext.user
      user.profilePictureUrl = picUrl
      this.props.userContext.setUser(user)
      // profile image returned?
    }).catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <div className="generic-container">
        <h2>Settings</h2>
        <h3>Username</h3>
        <p className="ml-2">{this.props.userContext.user.username}</p>
        <h3>Upload Profile Picture</h3>
        <input className="ml-2 generic-container" id="file-picker" type="file" name="image" onChange={this.onFileChange} />
        <button className="ml-2 btn btn-green" disabled={!this.state.selectedImage} onClick={this.onUploadImage}>Upload</button>
        <h3>Email</h3>
        <p className="ml-2">{this.props.userContext.user.email}</p>
        <h3>Timezone</h3>
        <p className="ml-2">{this.props.userContext.user.timezone}</p>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <userContext.Consumer>
    {userContext => (<MySettings {...props} userContext={userContext} ref={ref} />)}
  </userContext.Consumer>
))