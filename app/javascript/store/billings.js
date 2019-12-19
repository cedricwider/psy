import { billings } from './types';

const billingState = {
  current: null,
  error: null,
  index: {},
  loading: false,
};

export const getters = {
  [billings.current]: state => state.current,
  [billings.error]: state => state.error,
  [billings.index]: state => state.index,
  [billings.loading]: state => state.loading,
  // According to https://github.com/vuejs/vuex/issues/688
  [billings.show]: state => billingId => state.index.find(billing => billing.id === billingId),
};

export const mutations = {
  [billings.current]: (state, current) => {
    state.current = current;
  },
  [billings.error]: (state, error) => {
    state.error = error;
  },
  [billings.index]: (state, index) => {
    state.index = index;
  },
  [billings.loading]: (state, loading) => {
    state.loading = loading;
  },
  [billings.create]: (state, billing) => {
    if (!billing.id) {
      state.index.push(billing);
    }
  },
  [billings.update]: (state, billing) => {
    const billingIndex = state.index.findIndex(b => b.id === billing.id);
    if (billingIndex === undefined) return;

    state.index[billingIndex] = billing;
  },
  [billings.delete]: (state, billing) => {
    const billingIndex = state.index.findIndex(b => b.id === billing.id);
    if (billingIndex === undefined) return;

    state.index.splice(billingIndex, 1);
  },
};

export const actions = {
  [billings.index]: ({ commit, rootGetters }, sessionId) => new Promise((resolve, reject) => {
    commit(billings.loading, true);
    rootGetters.httpClient
      .get(`/api/sessions/${sessionId}/billings`)
      .then(response => response.data)
      .then((response) => {
        commit(billings.index, response);
        commit(billings.loading, false);
        resolve(response);
      })
      .catch((error) => {
        commit(billings.loading, false);
        commit(billings.error, error);
        reject(error);
      });
  }),
  [billings.load]: ({ commit, rootGetters }, id) => new Promise((resolve, reject) => {
    commit(billings.loading, true);
    rootGetters.httpClient
      .get(`/api/billings/${id}`)
      .then(response => response.data)
      .then((response) => {
        commit(billings.update, response);
        commit(billings.loading, false);
        resolve(response);
      })
      .catch((error) => {
        commit(billings.error, error);
        commit(billings.loading, false);
        reject(error);
      });
  }),
  [billings.create]: ({ commit, rootGetters }, sessionId, billing) => new Promise((resolve, reject) => {
    commit(billings.loading, true);
    rootGetters.httpClient
      .post(`/api/sessions/${sessionId}/billings`, billing)
      .then(response => response.data)
      .then((response) => {
        commit(billings.loading, false);
        commit(billings.create, response);
        resolve(response);
      })
      .catch((error) => {
        commit(billings.error, error);
        commit(billings.loading, false);
        reject(error);
      });
  }),
  [billings.update]: ({ commit, rootGetters }, billing) => new Promise((resolve, reject) => {
    commit(billings.loading, true);
    rootGetters.httpClient
      .put(`/api/billings/${billing.id}`, billing)
      .then(response => response.data)
      .then((response) => {
        commit(billings.loading, false);
        commit(billings.create, response);
        resolve(response);
      })
      .catch((error) => {
        commit(billings.error, error);
        commit(billings.loading, false);
        reject(error);
      });
  }),
};

export default {
  actions,
  getters,
  mutations,
  state: billingState,
};
