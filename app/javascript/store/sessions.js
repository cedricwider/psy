import { sessions } from './types';

const state = {
  error: null,
  loading: false,
  token: null,
};

const getters = {
  [sessions.token]: state => state.token || window.localStorage.getItem('psy-jwt-token'),
  [sessions.error]: state => state.error,
  [sessions.loading]: state => state.loading,
};

const mutations = {
  [sessions.error]: (state, error) => (state.error = error),
  [sessions.loading]: (state, loading) => (state.loading = loading),
  [sessions.token]: (state, token) => {
    state.token = token;
    if (token !== null) window.localStorage.setItem('psy-jwt-token', token);
    else window.localStorage.removeItem('psy-jwt-token');
  },
};

const actions = {
  [sessions.signIn]: ({ commit, rootGetters }, credentials) => new Promise((resolve, reject) => {
    commit(sessions.loading, true);
    rootGetters.httpClient
      .post('/tokens', { username: credentials.email, password: credentials.password })
      .then((response) => {
        commit(sessions.loading, false);
        const jwtToken = response.data.token;
        commit(sessions.token, jwtToken);
        console.log('store/sessions.signIn:: Storing WebToken in window.logalStorage["psy-jwt-token"]');
        resolve(response.data);
      })
      .catch((error) => {
        commit(sessions.loading, false);
        console.log('Error', error);
        const errorMessage = error.response.data ? error.response.data.message : 'Error while trying to login';
        console.log('ErrorMessage: ', errorMessage);
        commit(sessions.error, errorMessage);
        reject(error);
      });
  }),

  [sessions.signOut]: ({ commit }) => new Promise((resolve) => {
    commit(sessions.token, null);
    resolve();
  }),
};

export default {
  state,
  getters,
  mutations,
  actions,
};
