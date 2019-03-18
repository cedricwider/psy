import 'babel-polyfill';
import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { mutations, actions } from 'store/patients';
import { patients } from 'store/types';

describe('PatientStore', () => {
  describe('Mutations', () => {
    it('Sets current patient', () => {
      const mutateCurrentPatient = mutations[patients.current];
      const patient = { name: 'Rudy Spec' };
      const state = { current: null };
      mutateCurrentPatient(state, patient);
      expect(state.current).toEqual(patient);
    });

    it('Sets error', () => {
      const mutateError = mutations[patients.error];
      const error = { message: 'Something went wrong!' };
      const state = { error: null };
      mutateError(state, error);
      expect(state.error).toEqual(error);
    });

    it('Adds a patients to the collection', () => {
      const mutateAddPatient = mutations[patients.create];
      const patient = { name: 'Rudy Spec' };
      const state = { index: [] };
      mutateAddPatient(state, patient);
      expect(state.index.length).toBe(1);
    });

    describe('Adding a single patient to the collection', () => {
      describe('When the patient is not yet known', () => {
        it('Adds the patient to the collection', () => {
          const patient = { id: 1, first_name: 'jes', last_name: 'test' };
          const state = { index: [] };
          const updatePatient = mutations[patients.update];

          updatePatient(state, patient);
          expect(state.index.length).toBe(1);
        });
      });
      describe('When the patient already exists', () => {
        it('Updates the existing patient in the collection', () => {
          const patient = { id: 1, first_name: 'jes', last_name: 'test' };
          const state = { index: [patient] };
          const updatePatient = mutations[patients.update];

          updatePatient(state, patient);
          expect(state.index.length).toBe(1);
        });
      });
    });

    it('Sets Patients', () => {
      const mutatePatients = mutations[patients.index];
      const index = [{ name: 'Rudy Spec' }];
      const state = { index: null };
      mutatePatients(state, index);
      expect(state.index).toEqual(index);
    });

    it('Sets the loading flag', () => {
      const mutateLoading = mutations[patients.loading];
      const state = { loading: false };
      mutateLoading(state, true);
      expect(state.loading).toBe(true);
    });

    it('Deletes a patient', () => {
      const patient = { id: 1, first_name: 'jes', last_name: 'test' };
      const state = { index: [patient] };
      const deletePatient = mutations[patients.delete];

      deletePatient(state, patient);
      expect(state.index.length).toBe(0);
    });
  });

  describe('Actions', () => {
    describe('Create Patient', () => {
      const patient = {
        id: 1,
        salutation: 'Dr.',
        firts_name: 'Jes',
        last_name: 'Test',
        address: {
          street: 'JestStreet',
          houseNumber: '42',
          zip: '1337',
          town: 'JestTown',
          country: 'Testistan',
        },
      };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .post('/api/patients')
          .reply(200, patient);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Creates a patient', async () => {
        const commit = sinon.spy();
        const createPatient = actions[patients.create];

        await createPatient({ commit, rootGetters }, patient);
        expect(commit.calledWith(patients.loading, true)).toBe(true);
        expect(commit.calledWith(patients.create, patient)).toBe(true);
        expect(commit.calledWith(patients.loading, false)).toBe(true);
      });
    });

    describe('Load all patients', () => {
      const patientsResponse = [{ id: 1, firts_name: 'jes', last_name: 'test' }];
      let httpClient;
      let rootGetters;

      describe('With a successful response', () => {
        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';
          nock('http://localhost/')
            .get('/api/patients')
            .reply(200, patientsResponse);
          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Loads all patients', async () => {
          const commit = sinon.spy();
          const loadPatients = actions[patients.index];

          await loadPatients({ commit, rootGetters });
          expect(commit.calledWith(patients.loading, true)).toBe(true);
          expect(commit.calledWith(patients.index, patientsResponse)).toBe(true);
          expect(commit.calledWith(patients.loading, false)).toBe(true);
        });
      });

      describe('When an error occurs', () => {
        const errorMessage = { message: 'Error occured!! :(' };

        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';

          nock('http://localhost/')
            .get('/api/patients')
            .reply(500, errorMessage);

          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Sets the error message', () => {
          const commit = sinon.spy();
          const loadPatients = actions[patients.index];

          loadPatients({ commit, rootGetters })
            .then(() => {
              throw new Error('Expected the promise to catch instead it resolved.');
            })
            .catch(() => {
              expect(commit.calledWith(patients.loading, true)).toBe(true);
              expect(commit.calledWith(patients.error, errorMessage)).toBe(true);
              expect(commit.calledWith(patients.loading, false)).toBe(true);
            });
        });
      });
    });

    describe('Loading a single patient by id', () => {
      const patient = { id: 1, firts_name: 'jes', last_name: 'test' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/patients/1')
          .reply(200, patient);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single patient', async () => {
        const commit = sinon.spy();
        const getPatient = actions[patients.show];

        await getPatient({ commit, rootGetters }, 1);
        expect(commit.calledWith(patients.loading, true)).toBe(true);
        expect(commit.calledWith(patients.update, patient)).toBe(true);
        expect(commit.calledWith(patients.loading, false)).toBe(true);
      });
    });

    describe('Update a patient', () => {
      const patient = { id: 1, firts_name: 'Rudi', last_name: 'Spec' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .put('/api/patients/1', patient)
          .reply(200, patient);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single patient', async () => {
        const commit = sinon.spy();
        const updatePatient = actions[patients.update];

        await updatePatient({ commit, rootGetters }, patient);
        expect(commit.calledWith(patients.loading, true)).toBe(true);
        expect(commit.calledWith(patients.update, patient)).toBe(true);
        expect(commit.calledWith(patients.loading, false)).toBe(true);
      });
    });

    describe('Delete a patient', () => {
      const patient = { id: 1, firts_name: 'Rudi', last_name: 'Spec' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .delete('/api/patients/1')
          .reply(200, patient);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Deletes a single patient', async () => {
        const commit = sinon.spy();
        const deletePatient = actions[patients.delete];

        await deletePatient({ commit, rootGetters }, patient);
        expect(commit.calledWith(patients.loading, true)).toBe(true);
        expect(commit.calledWith(patients.delete, patient)).toBe(true);
        expect(commit.calledWith(patients.loading, false)).toBe(true);
      });
    });
  });
});
