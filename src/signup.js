import React from 'react'
import agent from './agent'
import TimezonePicker from './TimezonePicker'
import loginContext from "./loginContext";
import userContext from "./userContext";

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Username:
            <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange} />
            </label>
          </div>
          <div>
            <label>
              Email:
            <input type="email" name="email" value={this.state.email} onChange={this.handleValueChange} />
            </label>
          </div>
          <div>
            <label>
              Password:
            <input type="password" name="password" value={this.state.password} onChange={this.handleValueChange} />
            </label>
          </div>
          <div>
            <label>
              Receive email newsletter:
            <input type="checkbox" name="newsletterOptIn" checked={this.state.newsletterOptIn} onChange={this.handleCheckboxChange} />
            </label>
          </div>
          <div>
            <label>
              Timezone:
          </label>
            <TimezonePicker
              name="timezone"
              onChange={this.handleValueChange}
              defaultValue={'America/New_York'}
              unselectLabel="Select a timezone..."
              className="p-2 border-green-600"
              style={{
                borderRadius: '0.5rem',
              }}
            />
          </div>
          <input type="submit" value="Signup" />
          <button onClick={(event) => {
            event.preventDefault();
            const now = (new Date()).getTime().toString();
            this.setState({ username: `matt${now}`, email: `matt${now}@test.com`, password: "pass", newsletterOptIn: true });
          }}>Fill with unique values</button>
        </form>
        {this.state.error &&
          <p style={{ color: "red" }}>
            {this.state.error}
          </p>
        }
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