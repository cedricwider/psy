import { patients, therapies } from './types';
import {
  extractPatientRefs,
  attachPatientsToTherapies,
  therapyToRequest,
  responseToTherapy,
} from '../helpers/formatters';

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
  [therapies.find]: state => therapyId => state.index[therapyId],
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
      .post('/api/therapies', therapyToRequest(therapy))
      .then((response) => {
        const thrpy = responseToTherapy(response.data);
        commit(therapies.create, thrpy);
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
        let therapyData = response.data.map(thrpy => responseToTherapy(thrpy));
        const patientResponses = await Promise.all(
          extractPatientRefs(therapyData).map(patientRef => dispatch(patients.show, patientRef.id)),
        );
        therapyData = attachPatientsToTherapies(therapyData, patientResponses);
        commit(therapies.index, therapyData);
        commit(therapies.loading, false);
        resolve(therapyData);
      })
      .catch((error) => {
        console.error('Error while loading therapies: ', error);
        commit(therapies.error, error.response.data);
        commit(therapies.loading, false);
        reject(error);
      });
  }),

  [therapies.show]: ({ commit, dispatch, rootGetters }, index) => new Promise((resolve, reject) => {
    commit(therapies.loading, true);
    rootGetters.httpClient
      .get(`/api/therapies/${index}`)
      .then(async (response) => {
        let therapyData = responseToTherapy(response.data);
        const patientResponses = await Promise.all(
          therapyData.patients.map(patientRef => dispatch(patients.show, patientRef.id)),
        );
        therapyData = attachPatientsToTherapies([therapyData], patientResponses);
        commit(therapies.update, therapyData[0]);
        commit(therapies.loading, false);
        resolve(therapyData[0]);
      })
      .catch((error) => {
        console.error('Error while loading therpaies: ', error);
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
    console.log(`Therapy Request: ${JSON.stringify(therapyToRequest(therapy))}`);
    rootGetters.httpClient
      .put(`/api/therapies/${therapy.id}`, therapyToRequest(therapy))
      .then((response) => {
        const thrps = responseToTherapy(response.data);
        console.log(`Therapy after reponse: ${JSON.stringify(responseToTherapy(response.data))}`);
        commit(therapies.update, thrps);
        commit(therapies.loading, false);
        resolve(thrps);
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
