import React from 'react'

class Challenges extends React.Component {
  render() {
      <div className="Challenges">
        /** Grid view of challenges */
        { this.props.challenges.map((ch) => {
          return <ChallengePreview author={ch.author} key={ch.slug} slug={ch.slug} title={ch.title} description={ch.description} />
        })}
      </div>
  }
}

var challenges = FakeData.createFakeChallenges(3)

ReactDOM.render(
  <React.StrictMode>
    <Header title="Thirdy - 30 Day Challenges"/>
    <p>This is the challenges.js file.</p>
    <Challenges challenges={challenges} />
  </React.StrictMode>,
  document.getElementById('root')
);