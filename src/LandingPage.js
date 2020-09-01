import React, { Component } from 'react';
import Link from './link';

class LandingPage extends Component {
  render() {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-center">Find a challenge today!</h1>
        <Link to="/explore">
          <button className="btn btn-green">Explore Challenges</button>
        </Link>
      </div>
    );
  }
}

export default LandingPage;