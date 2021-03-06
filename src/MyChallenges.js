import React from 'react';
import TabMenu from './TabMenu';
import TabMenuItem from './TabMenuItem';
import MyCurrentChallenges from './MyCurrentChallenges';
import MyPastChallenges from './MyPastChallenges'

function MyChallenges(props) {
  return (
    <div>
      <TabMenu title="My Challenges">
        <TabMenuItem title="Current">
          <MyCurrentChallenges />
        </TabMenuItem>
        <TabMenuItem title="Past">
          <MyPastChallenges />
        </TabMenuItem>
        {
          /*
          <TabMenuItem title="Authored">
            <p>tab item 3 content</p>
          </TabMenuItem>
          */
        }
      </TabMenu>
    </div>
  );
}

export default MyChallenges;