import React from 'react'
import Link from './link'

class BrandLogo extends React.Component {
  constructor(props) {
    super(props)

    this.state = { color: 'red' }
  }

  render() {
    return (
      <div className="brand-text text-3xl m-2 font-sans" id="top-bar-logo">
        <div>
          <Link to={'/'} >
            <span id="title">{this.props.title}</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default BrandLogo