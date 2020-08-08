import React from 'react'

class Signup extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      email: '',
      password: '',
      newsletterOptIn: true
    }

    this.handleValueChange = this.handleValueChange.bind(this)
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleValueChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleCheckboxChange(event) {
    this.setState({[event.target.name]: event.target.checked})
  }

  handleSubmit(event) {
    alert("Submit")
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={this.state.username} onChange={this.handleValueChange}/>
        </label>
        <label>
          Email:
          <input type="email" name="email" value={this.state.email} onChange={this.handleValueChange}/>
        </label>
        <label>
          Password:
          <input type="password" name="password" value={this.state.password} onChange={this.handleValueChange}/>
        </label>
        <label>
          Receive email newsletter:
          <input type="checkbox" name="newsletterOptIn" checked={this.state.newsletterOptIn} onChange={this.handleCheckboxChange}/>
        </label>
        <input type="submit" value="Signup"/>
      </form>
    )
  }
}

export default Signup