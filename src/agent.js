import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const host = "http://localhost:3001/api"

function createUrl(route) {
  return `${host}/${route}`
}

const methods = {
  Get: (route, options) => superagent.get(createUrl(route)).withCredentials().query(options ?? {}),
  Post: (route, body) => superagent.post(createUrl(route)).withCredentials().send(body ?? {}),
  Put: (route, body) => superagent.put(createUrl(route)).withCredentials().send(body ?? {}),
}

const Challenge = {
  Get: (slug) => methods.Get(`challenges/${slug}`),
  Create: () => methods.Put("challenges")
}

const Challenges = {
  Get: (options) => methods.Get("challenges", options),
}

const ChallengeParticipation = {
  Get: (id) => methods.Get(`challenge-participation/${id}`),
  Update: (id, body) => methods.Put(`challenge-participation/${id}`, body),
  Create: (body) => methods.Post(`challenge-participation`, body),
}

const User = {
  Login: (body) => methods.Post("user/login", body),
  Logout: () => methods.Post("user/logout"),
  // TODO wydavis: put under user path
  Signup: (body) => methods.Post("signup", body),
  GetCurrent: () => methods.Get('users'),
  ActiveChallenges: () => methods.Get('user/participating-challenges?challenge-status=active'),
}

const routes = {
  User: User,
  Challenge: Challenge,
  Challenges: Challenges,
  ChallengeParticipation: ChallengeParticipation,
}

export default routes 