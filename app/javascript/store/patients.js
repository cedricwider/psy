import { patients } from './types'

const patientState = {
  error: null,
  current: null,
  index: [],
}

const getters = {
  [patients.error]: state => state.error,
  [patients.current]: state => state.patient,
}

export const mutations = {
  [patients.error]: (state, error) => {
    state.error = error
  },
  [patients.current]: (state, patient) => {
    state.current = patient
  },
  [patients.index]: (state, index) => {
    state.index = index
  },
}

const actions = {
  [patients.create]: ({ commit, rootGetters }, patient) =>
    new Promise((resolve, reject) => {
      rootGetters.httpClient
        .post('/patients', {
          first_name: patient.firstName,
          last_name: patient.lastName,
          email: patient.email,
          password: patient.password,
          password_confirmation: patient.passwordConfirmation,
        })
        .then(response => {
          commit(patients.current, response.data)
          resolve(response.data)
        })
        .catch(error => {
          commit(patients.error, error.response.data)
          reject(error)
        })
    }),
}

export default {
  state: patientState,
  getters,
  mutations,
  actions,
}
