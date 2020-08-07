import React from 'react'
import {Link as RRLink} from 'react-router-dom'

/**
 * Wrapper class around react-router's Link element so that if we move away from
 * react router we can easily change all links back to anchor (<a>) tags
 */
class Link extends React.Component {
  render() {
    return <RRLink to={this.props.to}>{this.props.children}</RRLink>
  }
}

export default Link