import { sessions } from './types'

const state = {
  error: null,
  token: window.localStorage.getItem('psy-jwt-token'),
}

const getters = {
  [sessions.token]: state => state.token,
  [sessions.error]: state => state.error,
}

const mutations = {
  [sessions.token]: (state, token) => window.localStorage.setItem('psy-jwt-token', token),
  [sessions.error]: (state, error) => (state.error = error),
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
    new Promise((resolve, reject) => {
      rootGetters.httpClient
        .post('/logout')
        .then(response => {
          commit(sessions.token, null)
          resolve.response.data
        })
        .catch(error => {
          const errorMessage = error.response.data ? error.response.data.message : 'Error while trying to logout'
          console.log(errorMessage)
          commit(sessions.error, errorMessage)
          reject(error)
        })
    }),
}

export default {
  state,
  getters,
  mutations,
  actions,
}
