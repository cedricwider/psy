import { mutations } from 'store/patients'
import { patients } from 'store/types'

describe('PatientStore', () => {
  describe('Mutations', () => {
    it('Sets current patient', () => {
      const mutateCurrentPatient = mutations[patients.current]
      const patient = { name: 'Rudy Spec' }
      const state = { current: null }
      mutateCurrentPatient(state, patient)
      expect(state.current).toEqual(patient)
    })

    it('Sets error', () => {
      const mutateError = mutations[patients.error]
      const error = { message: 'Something went wrong!' }
      const state = { error: null }
      mutateError(state, error)
      expect(state.error).toEqual(error)
    })

    it('Sets Patients', () => {
      const mutatePatients = mutations[patients.index]
      const index = [{ name: 'Rudy Spec' }]
      const state = { index: null }
      mutatePatients(state, index)
      expect(state.index).toEqual(index)
    })
  })

  describe('Actions', () => {})
})
