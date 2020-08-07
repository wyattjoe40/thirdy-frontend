import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ChallengeDetails from './challengeDetails'
import Signup from './signup'
import * as serviceWorker from './serviceWorker';
import Header from './header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header title="Thirdy - 30 Day Challenges"/>
      <Route exact={true} path="/" component={App} />
      <Route path="/signup" component={Signup} />
      <Route path="/challenges/:slug" render={({match}) => (
        <ChallengeDetails slug={match.params.slug} />
      )}/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
