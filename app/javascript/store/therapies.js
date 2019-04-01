import { patients, therapies } from './types';

const therapyState = {
  error: null,
  current: null,
  index: {},
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
  [therapies.index]: (state, therapies) => {
    if (!state.index) state.index = {};
    therapies.forEach(therapy => (state.index[therapy.id] = therapy));
  },
  [therapies.loading]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [therapies.create]: (state, therapy) => {
    if (!state.index) state.index = {};
    state.index[therapy.id] = therapy;
  },
  [therapies.update]: (state, therapy) => {
    if (!state.index) state.index = {};
    state.index[therapy.id] = therapy;
  },
  [therapies.delete]: (state, therapy) => {
    if (!state.index) state.index = {};
    delete state.index[therapy.id];
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
      .then(async (response) => {
        // TODO: Factor-out this huge junk of code... (14j)
        // Maybe a helper would be nice since we don't want to
        // pollute the whole actions-namespace with private functions
        const therapiesResponse = response.data;
        const patientPromises = therapiesResponse
          .map(therapy => therapy.patients)
          .flat()
          .map(patientRef => dispatch(patients.show, patientRef.id));
        const patientResponses = await Promise.all(patientPromises);
        patientResponses.forEach((patientResponse) => {
          // TODO: One patient can be in multiple therapies...! <-- there's currently a BUG
          const therapy = therapiesResponse.find(t => t.patients.map(p => p.id).includes(patientResponse.id));
          const patientIndex = therapy.patients.findIndex(p => p.id === patientResponse.id);
          therapy.patients[patientIndex] = patientResponse;
        });
        commit(therapies.index, therapiesResponse);
        commit(therapies.loading, false);
        resolve(therapiesResponse);
      })
      .catch((error) => {
        console.error('Error while loading therapies: ', error);
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
