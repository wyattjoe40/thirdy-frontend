import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Link from './link'

function NoChallengesUpsell(props) {
  return (
    <div className="flex flex-col items-center">
      <Link className="link-button" to="/explore">Explore challenges to start!</Link>
      <p>Or...</p>
      <Link className="link-button" to="/search"><FontAwesomeIcon icon="search" /> Search for a specific challenge</Link>
    </div>)
}

export default NoChallengesUpsell