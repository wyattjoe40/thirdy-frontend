import React from 'react'
import Link from './link'
import './header.css'

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
    return <div id="top-bar">
        <nav>
          <div id="top-bar-logo">
            <Link to={'/'} >
              <div>
                <h1 style={{color: color}} id="title">{this.props.title}</h1>
              </div>
            </Link>
          </div>
          <div id="top-bar-menu">
            <ul>
              <Link to={'/login'} >
                <li className="top-bar-menu-item">Login</li>
              </Link>
              <Link to={'/signup'} >
                <li className="top-bar-menu-item">Signup</li>
              </Link>
            </ul>
          </div>
      </nav>
    </div>
    }
}

export default Header