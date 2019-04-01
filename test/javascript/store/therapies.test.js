import 'babel-polyfill';
import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { mutations, actions } from 'store/therapies';
import { therapies } from 'store/types';

describe('TherapyStore', () => {
  describe('Mutations', () => {
    it('Sets current therapy', () => {
      const mutateCurrentTherapy = mutations[therapies.current];
      const therapy = { name: 'Rudy Spec' };
      const state = { current: null };
      mutateCurrentTherapy(state, therapy);
      expect(state.current).toEqual(therapy);
    });

    it('Sets error', () => {
      const mutateError = mutations[therapies.error];
      const error = { message: 'Something went wrong!' };
      const state = { error: null };
      mutateError(state, error);
      expect(state.error).toEqual(error);
    });

    it('Adds a therapies to the collection', () => {
      const mutateAddTherapy = mutations[therapies.create];
      const therapy = { name: 'Rudy Spec' };
      const state = { index: [] };
      mutateAddTherapy(state, therapy);
      expect(state.index.length).toBe(1);
    });

    describe('Adding a single therapy to the collection', () => {
      describe('When the therapy is not yet known', () => {
        it('Adds the therapy to the collection', () => {
          const therapy = { id: 1, title: 'jes', patients: [{ id: 1, href: 'http://test.com' }] };
          const state = { index: [] };
          const updateTherapy = mutations[therapies.update];

          updateTherapy(state, therapy);
          expect(state.index.length).toBe(1);
        });
      });
      describe('When the therapy already exists', () => {
        it('Updates the existing therapy in the collection', () => {
          const therapy = { id: 1, title: 'jes', patients: [{ id: 1, href: 'http://test.com' }] };
          const state = { index: [therapy] };
          const updateTherapy = mutations[therapies.update];

          updateTherapy(state, therapy);
          expect(state.index.length).toBe(1);
        });
      });
    });

    it('Sets Therapies', () => {
      const mutateTherapies = mutations[therapies.index];
      const index = [{ id: 1, title: 'Rudy Spec' }];
      const state = { index: null };
      mutateTherapies(state, index);
      expect(state.index).toEqual(index);
    });

    it('Sets the loading flag', () => {
      const mutateLoading = mutations[therapies.loading];
      const state = { loading: false };
      mutateLoading(state, true);
      expect(state.loading).toBe(true);
    });

    it('Deletes a therapy', () => {
      const therapy = { id: 1, title: 'jes', patients: [{ id: 1, href: 'http://test.com' }] };
      const state = { index: [therapy] };
      const deleteTherapy = mutations[therapies.delete];

      deleteTherapy(state, therapy);
      expect(state.index.length).toBe(0);
    });
  });

  describe('Actions', () => {
    describe('Create Therapy', () => {
      const therapy = {
        id: 1,
        title: 'Test Therapy',
        patients: [{ id: 1, href: 'http://test.com' }],
      };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .post('/api/therapies')
          .reply(200, therapy);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Creates a therapy', async () => {
        const commit = sinon.spy();
        const createTherapy = actions[therapies.create];

        await createTherapy({ commit, rootGetters }, therapy);
        expect(commit.calledWith(therapies.loading, true)).toBe(true);
        expect(commit.calledWith(therapies.create, therapy)).toBe(true);
        expect(commit.calledWith(therapies.loading, false)).toBe(true);
      });
    });

    describe('Load all therapies', () => {
      const therapiesResponse = [
        {
          id: 1,
          title: 'Test Thearpy',
          patients: [{ id: 1, href: 'http://test.com' }],
        },
      ];
      let httpClient;
      let rootGetters;

      describe('With a successful response', () => {
        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';
          nock('http://localhost/')
            .get('/api/therapies')
            .reply(200, therapiesResponse);
          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Loads all therapies', async () => {
          const commit = sinon.spy();
          const loadTherapies = actions[therapies.index];

          await loadTherapies({ commit, rootGetters });
          expect(commit.calledWith(therapies.loading, true)).toBe(true);
          expect(commit.calledWith(therapies.index, therapiesResponse)).toBe(true);
          expect(commit.calledWith(therapies.loading, false)).toBe(true);
        });
      });

      describe('When an error occurs', () => {
        const errorMessage = { message: 'Error occured!! :(' };

        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';

          nock('http://localhost/')
            .get('/api/therapies')
            .reply(500, errorMessage);

          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Sets the error message', () => {
          const commit = sinon.spy();
          const loadTherapies = actions[therapies.index];

          loadTherapies({ commit, rootGetters })
            .then(() => {
              throw new Error('Expected the promise to catch instead it resolved.');
            })
            .catch(() => {
              expect(commit.calledWith(therapies.loading, true)).toBe(true);
              expect(commit.calledWith(therapies.error, errorMessage)).toBe(true);
              expect(commit.calledWith(therapies.loading, false)).toBe(true);
            });
        });
      });
    });

    describe('Loading a single therapy by id', () => {
      const therapy = {
        id: 1,
        firts_name: 'jes',
        last_name: 'test',
        addresses: [
          {
            street: 'JestStreet',
            house_number: '42',
            zip: '1337',
            town: 'JestTown',
            country: 'Testistan',
          },
        ],
      };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/therapies/1')
          .reply(200, therapy);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single therapy', async () => {
        const commit = sinon.spy();
        const getTherapy = actions[therapies.show];

        await getTherapy({ commit, rootGetters }, 1);
        expect(commit.calledWith(therapies.loading, true)).toBe(true);
        expect(commit.calledWith(therapies.update, therapy)).toBe(true);
        expect(commit.calledWith(therapies.loading, false)).toBe(true);
      });
    });

    describe('Update a therapy', () => {
      const therapy = {
        id: 1,
        title: 'Test Thearpy',
        patients: [{ id: 1, href: 'http://test.com' }],
      };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .put('/api/therapies/1', therapy)
          .reply(200, therapy);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single therapy', async () => {
        const commit = sinon.spy();
        const updateTherapy = actions[therapies.update];

        await updateTherapy({ commit, rootGetters }, therapy);
        expect(commit.calledWith(therapies.loading, true)).toBe(true);
        expect(commit.calledWith(therapies.update, therapy)).toBe(true);
        expect(commit.calledWith(therapies.loading, false)).toBe(true);
      });
    });

    describe('Save a therapy', () => {
      describe('Save an existting therapy', () => {
        const therapy = {
          id: 1,
          title: 'Test Thearpy',
          patients: [{ id: 1, href: 'http://test.com' }],
        };

        it('calls the update action', () => {
          const dispatch = sinon.spy();
          const saveTherapy = actions[therapies.save];

          saveTherapy({ dispatch }, therapy);

          expect(dispatch.calledWith(therapies.update, therapy)).toBeTruthy();
        });
      });

      describe('Save a new therapy', () => {
        const therapy = {
          title: 'Test Thearpy',
          patients: [{ id: 1, href: 'http://test.com' }],
        };

        it('calls the create action', () => {
          const dispatch = sinon.spy();
          const saveTherapy = actions[therapies.save];

          saveTherapy({ dispatch }, therapy);

          expect(dispatch.calledWith(therapies.create, therapy)).toBeTruthy();
        });
      });
    });

    describe('Delete a therapy', () => {
      const therapy = { id: 1, firts_name: 'Rudi', last_name: 'Spec' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .delete('/api/therapies/1')
          .reply(200, therapy);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Deletes a single therapy', async () => {
        const commit = sinon.spy();
        const deleteTherapy = actions[therapies.delete];

        await deleteTherapy({ commit, rootGetters }, therapy);
        expect(commit.calledWith(therapies.loading, true)).toBe(true);
        expect(commit.calledWith(therapies.delete, therapy)).toBe(true);
        expect(commit.calledWith(therapies.loading, false)).toBe(true);
      });
    });
  });
});
