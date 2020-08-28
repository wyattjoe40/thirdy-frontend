const CurrentScreen = Object.freeze({LOGIN: 1, SIGNUP: 2, PROFILE: 3})

const loginContext = require('react').createContext({startLogin: undefined, startSignup: undefined, closeLogin: undefined, isLoginOpen: undefined, currentScreen: CurrentScreen.LOGIN, setCurrentScreen: undefined})

export { loginContext as default, CurrentScreen }