import React from 'react'
import Link from './link'

class Header extends React.Component {
  constructor(props) {
    super(props)

    this.state = { date: new Date()}
  }

  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick() {
    this.setState({date: new Date()})
  }

  render() {
    var color = (this.state.date.getSeconds() % 2 === 0 ? 'red' : 'blue')
    return <div>
      <Link to={'/'} >
        <h1 style={{color: color}} id="title">{this.props.title}</h1>
      </Link>
    </div>
    }
}

export default Header