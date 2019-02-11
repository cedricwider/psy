import { users } from './types';

const userState = {
  error: null,
  current: null,
};

const getters = {
  [users.error]: state => state.error,
  [users.current]: state => state.user,
};

const mutations = {
  [users.error]: (state, error) => {
    state.error = error;
  },
  [users.current]: (state, user) => {
    state.current = user;
  },
};

const actions = {
  [users.create]: ({ commit, rootGetters }, user) => new Promise((resolve, reject) => {
    rootGetters.httpClient
      .post('/users', {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        password: user.password,
        password_confirmation: user.passwordConfirmation,
      })
      .then((response) => {
        commit(users.current, response.data);
        resolve(response.data);
      })
      .catch((error) => {
        commit(users.error, error.response.data);
        reject(error);
      });
  }),
};

export default {
  state: userState,
  getters,
  mutations,
  actions,
};
