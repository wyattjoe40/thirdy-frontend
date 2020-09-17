import superagent from 'superagent';
import history from './history'

const isProduction = process.env.REACT_APP_ENVIRONMENT === 'PRODUCTION';

var host
if (isProduction) {
  host = "https://thirdy-backend.azurewebsites.net/api"
} else {
  host = "http://localhost:3001/api"
}

function createUrl(route) {
  return `${host}/${route}`
}

function unauthorizedRedirect(req) {
  req.on('response', function (res) {
    if (res.status === 401) {
      console.log("Unauthorized. Redirecting.")
      history.push('/signout')
    }
  })
}

const agent = superagent.agent()
agent.use(unauthorizedRedirect)

const methods = {
  Get: (route, options) => agent.get(createUrl(route)).withCredentials().query(options ?? {}),
  Post: (route, body) => agent.post(createUrl(route)).withCredentials().send(body ?? {}),
  Put: (route, body) => agent.put(createUrl(route)).withCredentials().send(body ?? {}),
}

const Challenge = {
  Get: (slug) => methods.Get(`challenges/${slug}`),
  Create: (challenge) => methods.Post("challenges", challenge),
  GetActiveUsers: (slug) => methods.Get(`challenges/${slug}/users?status=active`)
}

const Challenges = {
  Get: (options) => methods.Get("challenges", options),
  ForAuthor: (username) => methods.Get(`challenges?author=${username}`),
  Search: (query) => methods.Get(`challenges?filter=${query}`)
}

const ChallengeParticipation = {
  Get: (id) => methods.Get(`challenge-participation/${id}`),
  Update: (id, body) => methods.Put(`challenge-participation/${id}`, body),
  Create: (body) => methods.Post(`challenge-participation`, body),
  Abandon: (id) => ChallengeParticipation.Update(id, { status: 'abandoned' }),
}

const User = {
  Login: (body) => methods.Post("user/login", body),
  Logout: () => methods.Post("user/logout"),
  // TODO wydavis: put under user path
  Signup: (body) => methods.Post("signup", body),
  GetCurrent: () => methods.Get('users'),
  GetUser: (username) => methods.Get(`users/${username}`),
  ParticipatingChallenges: (username) => methods.Get(`users/${username}/participating-challenges`),
  ActiveChallenges: () => methods.Get('user/participating-challenges?challenge-status=active'),
  CompletedChallenges: () => methods.Get('user/participating-challenges?challenge-status=complete'),
  AbandonedChallenges: () => methods.Get('user/participating-challenges?challenge-status=abandoned'),
  AllChallenges: () => methods.Get('user/participating-challenges'),
  AddProfilePicture: (body) => methods.Post("user/profile-picture", body),
}

const routes = {
  User: User,
  Challenge: Challenge,
  Challenges: Challenges,
  ChallengeParticipation: ChallengeParticipation,
}

export default routes 