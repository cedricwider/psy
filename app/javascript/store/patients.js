import { patients } from './types';
import { patientToRequest, responseToPatient } from '../helpers/formatters';

const patientState = {
  error: null,
  current: null,
  index: [],
  loading: false,
};

const getters = {
  [patients.error]: state => state.error,
  [patients.current]: state => state.current,
  [patients.loading]: state => state.loading,
  [patients.index]: state => state.index,
};

export const mutations = {
  [patients.error]: (state, error) => {
    state.error = error;
  },
  [patients.current]: (state, patient) => {
    state.current = patient;
  },
  [patients.index]: (state, index) => {
    state.index = index;
  },
  [patients.loading]: (state, isLoading) => {
    state.loading = isLoading;
  },
  [patients.create]: (state, patient) => {
    state.index.push(patient);
  },
  [patients.update]: (state, patient) => {
    const foundPatient = state.index.find(pat => pat.id === patient.id);
    if (foundPatient) {
      state.index[state.index.indexOf(foundPatient)] = patient;
    } else {
      state.index.push(patient);
    }
  },
  [patients.delete]: (state, patient) => {
    const foundPatient = state.index.find(pat => pat.id === patient.id);
    if (foundPatient) {
      state.index.splice(state.index.indexOf(foundPatient), 1);
    }
  },
};

export const actions = {
  [patients.current]: ({ commit }, patient) => new Promise((resolve) => {
    commit(patients.current, patient);
    resolve(patient);
  }),

  [patients.create]: ({ commit, rootGetters }, patient) => new Promise((resolve, reject) => {
    commit(patients.loading, true);
    rootGetters.httpClient
      .post('/api/patients', patientToRequest(patient))
      .then((response) => {
        commit(patients.create, response.data);
        commit(patients.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(patients.error, error.response.data);
        commit(patients.loading, false);
        reject(error);
      });
  }),

  [patients.index]: ({ commit, rootGetters }) => new Promise((resolve, reject) => {
    commit(patients.loading, true);
    rootGetters.httpClient
      .get('/api/patients')
      .then((response) => {
        const patientsResponse = response.data.map(pat => responseToPatient(pat));
        commit(patients.index, patientsResponse);
        commit(patients.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(patients.error, error.response.data);
        commit(patients.loading, false);
        reject(error);
      });
  }),

  [patients.show]: ({ commit, rootGetters }, index) => new Promise((resolve, reject) => {
    commit(patients.loading, true);
    rootGetters.httpClient
      .get(`/api/patients/${index}`)
      .then((response) => {
        console.log('Response Data: ', response.data);
        commit(patients.update, responseToPatient(response.data));
        commit(patients.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(patients.error, error.response.data);
        commit(patients.loading, false);
        reject(error);
      });
  }),

  [patients.update]: ({ commit, rootGetters }, patient) => new Promise((resolve, reject) => {
    commit(patients.loading, true);
    rootGetters.httpClient
      .put(`/api/patients/${patient.id}`, patientToRequest(patient))
      .then((response) => {
        commit(patients.update, response.data);
        commit(patients.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(patients.error, error.response.data);
        commit(patients.loading, false);
        reject(error);
      });
  }),

  [patients.delete]: ({ commit, rootGetters }, patient) => new Promise((resolve, reject) => {
    commit(patients.loading, true);
    rootGetters.httpClient
      .delete(`/api/patients/${patient.id}`)
      .then((response) => {
        commit(patients.delete, response.data);
        commit(patients.loading, false);
        resolve(response.data);
      })
      .catch((error) => {
        commit(patients.error, error.response.data);
        commit(patients.loading, false);
        reject(error);
      });
  }),
};

export default {
  state: patientState,
  getters,
  mutations,
  actions,
};
