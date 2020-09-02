import React, { Component } from 'react';
import TabMenu from './TabMenu';
import TabMenuItem from './TabMenuItem';
import MyChallenges from './MyChallenges';

class Testing extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <TabMenu title="My Challenges">
          <TabMenuItem title="Current">
            <MyChallenges />
          </TabMenuItem>
          <TabMenuItem title="Past">
            <p>tab item 2 content</p>
          </TabMenuItem>
          <TabMenuItem title="Authored">
            <p>tab item 3 content</p>
          </TabMenuItem>
        </TabMenu>
      </div>
    );
  }
}

export default Testing;