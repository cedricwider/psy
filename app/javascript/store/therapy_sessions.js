import { therapySessions } from './types';
import { sessionToRequest, responseToSession } from '../helpers/formatters';

const therapySessionState = {
  error: null,
  current: null,
  index: [],
  loading: false,
};

const getters = {
  [therapySessions.error]: state => state.error,
  [therapySessions.current]: state => state.therapySession,
  [therapySessions.loading]: state => state.loading,
  [therapySessions.index]: state => state.index,
};

export const mutations = {
  [therapySessions.error]: (state, error) => {
    state.error = error;
  },
  [therapySessions.current]: (state, therapySession) => {
    state.current = therapySession;
  },
  [therapySessions.index]: (state, index) => {
    state.index = index;
  },
  [therapySessions.loading]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [therapySessions.create]: (state, therapySession) => {
    state.index.push(therapySession);
  },
  [therapySessions.update]: (state, therapySession) => {
    const foundTherapySession = state.index.find(pat => pat.id === therapySession.id);
    if (foundTherapySession) {
      state.index[state.index.indexOf(foundTherapySession)] = therapySession;
    } else {
      state.index.push(therapySession);
    }
  },
  [therapySessions.delete]: (state, therapySession) => {
    const foundTherapySession = state.index.find(pat => pat.id === therapySession.id);
    if (foundTherapySession) {
      state.index.splice(state.index.indexOf(foundTherapySession), 1);
    }
  },
};

export const actions = {
  [therapySessions.create]: ({ commit, rootGetters }, therapySession) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .post('/api/sessions', sessionToRequest(therapySession))
      .then((response) => {
        commit(therapySessions.create, response.data);
        commit(therapySessions.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),

  [therapySessions.index]: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .get('/api/sessions')
      .then((response) => {
        const sessions = response.data.map(response => responseToSession(response));
        commit(therapySessions.index, sessions);
        commit(therapySessions.loading, false);
        resolve(sessions);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),

  [therapySessions.show]: ({ commit, rootGetters }, index) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .get(`/api/sessions/${index}`)
      .then((response) => {
        const session = responseToSession(response.data);
        commit(therapySessions.update, session);
        commit(therapySessions.loading, false);
        resolve(session);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),

  [therapySessions.load]: ({ commit, rootGetters }, href) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .get(href)
      .then((response) => {
        const session = responseToSession(response.data);
        commit(therapySessions.update, session);
        commit(therapySessions.loading, false);
        resolve(session);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),

  [therapySessions.update]: ({ commit, rootGetters }, therapySession) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .put(`/api/sessions/${therapySession.id}`, therapySession)
      .then((response) => {
        const session = responseToSession(response.data);
        commit(therapySessions.update, session);
        commit(therapySessions.loading, false);
        resolve(session);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),

  [therapySessions.delete]: ({ commit, rootGetters }, therapySession) => new Promise((resolve, reject) => {
    commit(therapySessions.loading, true);
    rootGetters.httpClient
      .delete(`/api/sessions/${therapySession.id}`)
      .then((response) => {
        const session = responseToSession(response.data);
        commit(therapySessions.delete, session);
        commit(therapySessions.loading, false);
        resolve(session);
      })
      .catch((error) => {
        commit(therapySessions.error, error.response.data);
        commit(therapySessions.loading, false);
        reject(error);
      });
  }),
};

export default {
  state: therapySessionState,
  getters,
  mutations,
  actions,
};
