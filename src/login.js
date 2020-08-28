import React from 'react'
import agent from './agent'
import loginContext from './loginContext'
import userContext from './userContext'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}

    this.onSubmit = this.onSubmit.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }

  onSubmit(e, onSuccess) {
    e.preventDefault()

    agent.User.Login({ email: this.state.email, password: this.state.password }).then((result) => {
      onSuccess(result.body)
      //this.props.setUser(result.body)
      //this.props.close()
    }).catch((err) => {
      // check the error status
      console.log(err.status)
      console.log(err)
      if (err.status === 401) {
        // set the error state
        if (err.response.body && err.response.body.error) {
          this.setState({ error: err.response.body.error })
        } else {
          this.setState({ error: "Invalid credentials." })
        }
      } else {
        // we don't know what this error is...
        this.setState({ error: "An error occurred. Please retry." })
      }
    })
  }

  onValueChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <loginContext.Consumer>
        {(loginContext) =>
          (<userContext.Consumer>
            {(userContext) => (
              <form onSubmit={(e) => { this.onSubmit(e, (user) => { loginContext.closeLogin(); userContext.setUser(user) }) }}>
                <div>
                  <label>
                    Email
                    <input type="email" name="email" onChange={this.onValueChange} />
                  </label>
                </div>
                <div>
                  <label>
                    Password
                    <input type="password" name="password" onChange={this.onValueChange} />
                  </label>
                </div>
                <input type="submit" value="Login" />
                {this.state.error && <p>{this.state.error}</p>}
              </form>)}
          </userContext.Consumer>
          )}
      </loginContext.Consumer>
    )
  }
}

export default Login