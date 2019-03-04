import { addresses } from './types';

const addressState = {
  error: null,
  current: null,
  index: [],
  loading: false,
};

const getters = {
  [addresses.error]: state => state.error,
  [addresses.current]: state => state.address,
  [addresses.loading]: state => state.loading,
  [addresses.index]: state => state.index,
};

export const mutations = {
  [addresses.error]: (state, error) => {
    state.error = error;
  },
  [addresses.current]: (state, address) => {
    state.current = address;
  },
  [addresses.index]: (state, index) => {
    state.index = index;
  },
  [addresses.loading]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [addresses.create]: (state, address) => {
    state.index.push(address);
  },
  [addresses.update]: (state, address) => {
    const foundAddress = state.index.find(pat => pat.id === address.id);
    if (foundAddress) {
      state.index[state.index.indexOf(foundAddress)] = address;
    } else {
      state.index.push(address);
    }
  },
  [addresses.delete]: (state, address) => {
    const foundAddress = state.index.find(pat => pat.id === address.id);
    if (foundAddress) {
      state.index.splice(state.index.indexOf(foundAddress), 1);
    }
  },
};

export const actions = {
  [addresses.create]: ({ commit, rootGetters }, address) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .post('/api/addresses', {
        first_name: address.firstName,
        last_name: address.lastName,
        email: address.email,
        password: address.password,
        password_confirmation: address.passwordConfirmation,
      })
      .then((response) => {
        commit(addresses.create, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),

  [addresses.index]: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .get('/api/addresses')
      .then((response) => {
        commit(addresses.index, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),

  [addresses.show]: ({ commit, rootGetters }, index) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .get(`/api/addresses/${index}`)
      .then((response) => {
        commit(addresses.update, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),

  [addresses.load]: ({ commit, rootGetters }, href) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .get(href)
      .then((response) => {
        commit(addresses.update, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),

  [addresses.update]: ({ commit, rootGetters }, address) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .put(`/api/addresses/${address.id}`, address)
      .then((response) => {
        commit(addresses.update, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),

  [addresses.delete]: ({ commit, rootGetters }, address) => new Promise((resolve, reject) => {
    commit(addresses.loading, true);
    rootGetters.httpClient
      .delete(`/api/addresses/${address.id}`)
      .then((response) => {
        commit(addresses.delete, response.data);
        commit(addresses.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(addresses.error, error.response.data);
        commit(addresses.loading, false);
        reject(error);
      });
  }),
};

export default {
  state: addressState,
  getters,
  mutations,
  actions,
};
