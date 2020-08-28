import React from 'react';
import ReactDOM from 'react-dom';
import './assets/main.css'
import Home from './Home';
import ChallengeDetails from './challengeDetails'
import PrivateRoute from './PrivateRoute'
import Profile from './profile'
import LoginSignupModal from './loginSignupModal'
import ChallengeParticipationDetails from './ChallengeParticipationDetails'
import MyChallenges from './MyChallenges'
import MySettings from './MySettings'
import Testing from './Testing'
import * as serviceWorker from './serviceWorker';
import Header from './header'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import loginContext, { CurrentScreen } from './loginContext'
import userContext from './userContext'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircle, faCheckCircle, faTimesCircle, faCommentAlt, faQuestion } from '@fortawesome/free-solid-svg-icons'
import NotFound from './NotFound'
import ls from 'local-storage'

library.add(faCircle, faCheckCircle, faTimesCircle, faCommentAlt, faQuestion)

// set context here
class Root extends React.Component {
  constructor(props) {
    super(props)

    console.log(ls('user'))
    this.state = { user: ls('user'), openLoginState: false, isLoginOpen: false, currentScreen: CurrentScreen.LOGIN }

    this.setUser = this.setUser.bind(this)
    this.startLogin = this.startLogin.bind(this)
    this.startSignup = this.startSignup.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.setCurrentScreen = this.setCurrentScreen.bind(this)
  }

  startLogin() {
    this.setState({ currentScreen: CurrentScreen.LOGIN, isLoginOpen: true })
  }

  startSignup() {
    this.setState({ currentScreen: CurrentScreen.SIGNUP, isLoginOpen: true })
  }

  closeLogin() {
    this.setState({ isLoginOpen: false })
  }

  setUser(user) {
    this.setState({ user: user })
    if (user) {
      ls('user', user)
    } else {
      ls.remove('user')
    }
  }

  setCurrentScreen(currentScreen) {
    this.setState({ currentScreen: currentScreen })
  }

  render() {
    return (
      <React.StrictMode>
        <Router>
          <loginContext.Provider value={{ startLogin: this.startLogin, startSignup: this.startSignup, closeLogin: this.closeLogin, isLoginOpen: this.state.isLoginOpen, currentScreen: this.state.currentScreen, setCurrentScreen: this.setCurrentScreen }}>
            <userContext.Provider value={{ user: this.state.user, setUser: this.setUser }} >
              <Header title="Thirdy" />
              <LoginSignupModal />
              <div id="main-react-content" className="max-w-screen-lg mx-auto mt-4">
                <Switch>
                  <Route exact={true} path="/" component={Home} />
                  <Route path="/profiles/:username" render={({ match }) => (
                    <Profile username={match.params.username} />
                  )} />
                  <Route path="/challenges/:slug" render={({ match }) => (
                    <ChallengeDetails onLogin={this.openLogin} slug={match.params.slug} />
                  )} />
                  <Route path="/user/challenges/:participationId" render={({ match }) => (
                    <ChallengeParticipationDetails participationId={match.params.participationId} />
                  )} />
                  <Route path="/testing" component={Testing} />
                  <PrivateRoute exact={true} path="/user/challenges">
                    <MyChallenges />
                  </PrivateRoute>
                  <PrivateRoute exact={true} path="/user/settings">
                    <MySettings />
                  </PrivateRoute>
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
            </userContext.Provider>
          </loginContext.Provider>
        </Router>
      </React.StrictMode>
    )
  }
}

ReactDOM.render(<Root />,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
