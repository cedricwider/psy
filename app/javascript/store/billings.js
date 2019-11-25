import { billings } from './types';

const billingState = {
  current: null,
  error: null,
  index: {},
  loading: false,
};

const getters = {
  [billings.current]: state => state.current,
  [billings.error]: state => state.error,
  [billings.index]: state => state.index,
  [billings.loading]: state => state.loading,
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
  [billings.load]
};

export default {
  actions,
  getters,
  mutations,
  state: billingState,
};
