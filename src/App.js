import React from 'react';
import Explore from './Explore';
import ChallengeDetails from './challengeDetails'
import PrivateRoute from './PrivateRoute'
import Profile from './profile'
import LoginSignupModal from './loginSignupModal'
import ChallengeParticipationDetails from './ChallengeParticipationDetails'
import MySettings from './MySettings'
import Testing from './Testing'
import Header from './header'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import loginContext, { CurrentScreen } from './loginContext'
import userContext from './userContext'
import tabContext from './tabContext'
import NotFound from './NotFound'
import ls from 'local-storage'
import LandingPage from './LandingPage';
import MyChallenges from './MyChallenges';
import history from './history'
import Signout from './Signout'
import Search from './Search'
import CreateChallenge from './CreateChallenge';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = { 
      selectedTabs: ls('selectedTabs') || {},
      user: ls('user'),
      isLoginOpen: false,
      currentScreen: CurrentScreen.LOGIN 
    }

    this.setUser = this.setUser.bind(this)
    this.startLogin = this.startLogin.bind(this)
    this.startSignup = this.startSignup.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.setCurrentScreen = this.setCurrentScreen.bind(this)
    this.setSelectedTab = this.setSelectedTab.bind(this)
  }

  setSelectedTab(key, value) {
    if (!key) {
      return
    }

    const selectedTabs = this.state.selectedTabs
    selectedTabs[key] = value
    this.setState({
      selectedTabs: selectedTabs
    })
    ls('selectedTabs', selectedTabs)
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
        <Router history={history}>
          <loginContext.Provider value={{ startLogin: this.startLogin, startSignup: this.startSignup, closeLogin: this.closeLogin, isLoginOpen: this.state.isLoginOpen, currentScreen: this.state.currentScreen, setCurrentScreen: this.setCurrentScreen }}>
            <userContext.Provider value={{ user: this.state.user, setUser: this.setUser }} >
              <tabContext.Provider value={{ selectedTabs: this.state.selectedTabs, setSelectedTab: this.setSelectedTab }} >
                <Header title="thirdy" />
                <LoginSignupModal />
                <div id="main-react-content" className="max-w-screen-lg mx-auto mt-4">
                  <Switch>
                    <Route exact={true} path="/">
                      {this.state.user ?
                        <Redirect to="/user/challenges" />
                        : <LandingPage />}
                    </Route>
                    <Route exact={true} path="/explore" component={Explore} />
                    <Route exact={true} path="/search" component={Search} />
                    <Route path="/profiles/:username" render={({ match }) => (
                      <Profile username={match.params.username} />
                    )} />
                    <Route path="/challenges/:slug" render={({ match }) => (
                      <ChallengeDetails onLogin={this.openLogin} slug={match.params.slug} />
                    )} />
                    <Route path="/user/challenges/:participationId" render={({ match }) => (
                      <ChallengeParticipationDetails participationId={match.params.participationId} />
                    )} />
                    <PrivateRoute exact={true} path="/create-challenge">
                      <CreateChallenge />
                    </PrivateRoute>
                    <Route path="/signout" component={Signout} />
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
              </tabContext.Provider>
            </userContext.Provider>
          </loginContext.Provider>
        </Router>
      </React.StrictMode>
    )
  }
}

export default App