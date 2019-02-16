import { sessions } from './types'

const state = {
  error: null,
  token: null,
}

const getters = {
  [sessions.token]: state => state.token || window.localStorage.getItem('psy-jwt-token'),
  [sessions.error]: state => state.error,
}

const mutations = {
  [sessions.error]: (state, error) => (state.error = error),
  [sessions.token]: (state, token) => {
    state.token = token
    if (token !== null) window.localStorage.setItem('psy-jwt-token', token)
    else window.localStorage.removeItem('psy-jwt-token')
  },
}

const actions = {
  [sessions.signIn]: ({ commit, rootGetters }, credentials) =>
    new Promise((resolve, reject) => {
      rootGetters.httpClient
        .post('/tokens', { username: credentials.email, password: credentials.password })
        .then(response => {
          const jwtToken = response.data.token
          commit(sessions.token, jwtToken)
          resolve(response.data)
        })
        .catch(error => {
          const errorMessage = error.response.data ? error.response.data.message : 'Error while trying to login'
          console.log(errorMessage)
          commit(sessions.error, errorMessage)
          reject(error)
        })
    }),

  [sessions.signOut]: ({ commit, rootGetters }) =>
    new Promise((resolve, _) => {
      commit(sessions.token, null)
      resolve()
    }),
}

export default {
  state,
  getters,
  mutations,
  actions,
}
