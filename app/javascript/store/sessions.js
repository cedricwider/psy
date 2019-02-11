import { sessions } from './types';

const state = {
  error: null,
  token: null,
};

const getters = {
  [sessions.token]: state => state.token,
  [sessions.error]: state => state.error,
};

const mutations = {
  [sessions.token]: (state, token) => (state.token = token),
  [sessions.error]: (state, error) => (state.error = error),
};

const actions = {
  [sessions.signIn]: ({ commit, rootGetters }, credentials) => new Promise((resolve, reject) => {
    rootGetters.httpClient
      .post('/tokens', { username: credentials.email, password: credentials.password })
      .then((response) => {
        const jwtToken = response.data.token;
        commit(sessions.token, jwtToken);
        resolve(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response.data ? error.response.data.message : 'Error while trying to login'
        console.log(errorMessage);
        commit(sessions.error, errorMessage);
        reject(error);
      });
  }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
