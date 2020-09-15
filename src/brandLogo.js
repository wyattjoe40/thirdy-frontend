import React from 'react'
import Link from './link'

class BrandLogo extends React.Component {
  render() {
    return (
      <div className="brand-text m-2 font-sans" id="top-bar-logo">
        <div>
          <Link to={'/'} >
            <span className="text-3xl" id="title">{this.props.title}</span>
            <span className="text-xs">alpha 0.1</span>
          </Link>
        </div>
      </div>
    )
  }
}

export default BrandLogo