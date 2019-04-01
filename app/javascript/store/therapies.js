import { therapies } from './types';

const therapyState = {
  error: null,
  current: null,
  index: [],
  loading: false,
};

const getters = {
  [therapies.error]: state => state.error,
  [therapies.current]: state => state.current,
  [therapies.loading]: state => state.loading,
  [therapies.index]: state => state.index,
};

export const mutations = {
  [therapies.error]: (state, error) => {
    state.error = error;
  },
  [therapies.current]: (state, therapy) => {
    state.current = therapy;
  },
  [therapies.index]: (state, index) => {
    state.index = index;
  },
  [therapies.loading]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [therapies.create]: (state, therapy) => {
    state.index.push(therapy);
  },
  [therapies.update]: (state, therapy) => {
    const foundTherapy = state.index.find(pat => pat.id === therapy.id);
    if (foundTherapy) {
      state.index[state.index.indexOf(foundTherapy)] = therapy;
    } else {
      state.index.push(therapy);
    }
  },
  [therapies.delete]: (state, therapy) => {
    const foundTherapy = state.index.find(pat => pat.id === therapy.id);
    if (foundTherapy) {
      state.index.splice(state.index.indexOf(foundTherapy), 1);
    }
  },
};

export const actions = {
  [therapies.current]: ({ commit }, therapy) => new Promise((resolve) => {
    commit(therapies.current, therapy);
    resolve(therapy);
  }),

  [therapies.create]: ({ commit, rootGetters }, therapy) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .post('/api/therapies', therapy)
      .then((response) => {
        commit(therapies.create, response.data);
        commit(therapies.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),

  [therapies.index]: ({ commit, dispatch, rootGetters }) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .get('/api/therapies')
      .then((response) => {
        const therapies = response.data;
        therapies.forEach((therapy) => {
          const promises = therapy.patients.map(patient => dispatch(patient.show, patient.id));
        });
        commit(therapies.index, response.data);
        commit(therapies.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),

  [therapies.show]: ({ commit, rootGetters }, index) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .get(`/api/therapies/${index}`)
      .then((response) => {
        commit(therapies.update, response.data);
        commit(therapies.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),
  [therapies.save]: ({ dispatch }, therapy) => {
    const saveOperation = therapy.id ? therapies.update : therapies.create;
    return dispatch(saveOperation, therapy);
  },

  [therapies.update]: ({ commit, rootGetters }, therapy) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .put(`/api/therapies/${therapy.id}`, therapy)
      .then((response) => {
        commit(therapies.update, response.data);
        commit(therapies.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),

  [therapies.delete]: ({ commit, rootGetters }, therapy) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .delete(`/api/therapies/${therapy.id}`)
      .then((response) => {
        commit(therapies.delete, response.data);
        commit(therapies.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),
};

export default {
  state: therapyState,
  getters,
  mutations,
  actions,
};
