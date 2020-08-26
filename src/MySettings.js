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
      <div>
        <h2>Upload Profile Picture</h2>
        <input id="file-picker" type="file" name="image" onChange={this.onFileChange} />
        <button disabled={!this.state.selectedImage} onClick={this.onUploadImage}>Upload</button>
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <userContext.Consumer>
    {userContext => (<MySettings {...props} userContext={userContext} ref={ref} />)}
  </userContext.Consumer>
))