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
              <div className="flex flex-col items-center">
                <form className="flex flex-col items-center" onSubmit={(e) => { this.onSubmit(e, (user) => { loginContext.closeLogin(); userContext.setUser(user) }) }}>
                  <h2 className="text-green-600">thirdy</h2>
                  <h3>Login</h3>
                  <div>
                    <input className="generic-container" placeholder="email address" type="email" name="email" onChange={this.onValueChange} />
                  </div>
                  <div>
                    <input className="generic-container" placeholder="password" type="password" name="password" onChange={this.onValueChange} />
                  </div>
                  <input className="btn btn-green" type="submit" value="Login" />
                  {this.state.error && <p>{this.state.error}</p>}
                </form>
                <button className="btn btn-gray" onClick={this.props.toSignup} >Go to Signup</button>
              </div>)}
          </userContext.Consumer>
          )}
      </loginContext.Consumer>
    )
  }
}

export default Login