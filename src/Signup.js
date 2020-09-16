import React from 'react'
import agent from './agent'
import loginContext from "./loginContext";
import userContext from "./userContext";
import TimezonePicker from './TimezonePicker';

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      newsletterOptIn: true,
      error: ''
    }

    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleValueChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleCheckboxChange(event) {
    this.setState({ [event.target.name]: event.target.checked })
  }

  handleSubmit(event) {
    event.preventDefault()

    // send info to the signup server and respond to the response (show error, or accept)
    agent.User.Signup({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      newsletterOptIn: this.state.newsletterOptIn,
      timezone: this.state.timezone
    }).then((result) => {
      console.log(JSON.stringify(result))
      // TODO wydavis
      // if signup success, we can move to the user profile picture modal
      this.props.userContext.setUser(result.body)
      this.props.loginContext.closeLogin();
    }, (err) => {
      console.log(err)
      if (err.status === 401) {
        // invalid values given. show error to the user
        const error_json = JSON.parse(err.response.text)
        this.setState({ error: error_json.error })
      } else {
        console.log(JSON.stringify(err))
        this.setState({ error: "Unknown error. Try again." })
      }
    });
  }

  render() {
    return (
      <div className="flex flex-col items-center">
        <form className="flex flex-col items-center" onSubmit={this.handleSubmit}>
          <h2 className="text-green-600">thirdy</h2>
          <h3>Signup</h3>
          <div className="mt-2">
            <input className="generic-container" placeholder="username" type="text" name="username" value={this.state.username} onChange={this.handleValueChange} />
          </div>
          <div>
            <input className="generic-container" placeholder="email" type="email" name="email" value={this.state.email} onChange={this.handleValueChange} />
          </div>
          <div>
            <input className="generic-container" placeholder="password" type="password" name="password" value={this.state.password} onChange={this.handleValueChange} />
          </div>
          <div className="mt-2">
            <TimezonePicker
              name="timezone"
              onChange={this.handleValueChange}
              unselectLabel="Select a timezone..."
              className="generic-container"
              style={{
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <div className="mt-2">
            <label>
              Receive email newsletter:
            <input type="checkbox" name="newsletterOptIn" checked={this.state.newsletterOptIn} onChange={this.handleCheckboxChange} />
            </label>
          </div>
          <input className="btn btn-green mt-2"  disabled={
            !this.state.username ||
            !this.state.email ||
            !this.state.password ||
            !this.state.timezone
          } type="submit" value="Signup" />
          <button className="btn btn-gray mt-2" onClick={(event) => {
            event.preventDefault();
            const now = (new Date()).getTime().toString();
            this.setState({ username: `matt${now}`, email: `matt${now}@test.com`, password: "pass", newsletterOptIn: true });
          }}>Fill with unique values</button>
        </form>
        {this.state.error &&
          <p className="mt-2 text-red-600">
            {this.state.error}
          </p>
        }
        <button className="btn btn-gray mt-2" onClick={this.props.toLogin}>Go to Login</button>
      </div>
    )
  }
}

export default React.forwardRef((props, ref) => (
  <loginContext.Consumer>
    {loginContext => (
      <userContext.Consumer>
        {userContext => (<Signup {...props} userContext={userContext} loginContext={loginContext} ref={ref} />)}
      </userContext.Consumer>)}
  </loginContext.Consumer>
))