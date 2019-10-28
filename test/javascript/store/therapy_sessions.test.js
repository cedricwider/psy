import 'babel-polyfill';
import moment from 'moment';
import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { mutations, actions } from 'store/therapy_sessions';
import { therapySessions } from 'store/types';
import { responseToSession } from 'helpers/formatters';

describe('TherapySessionStore', () => {
  describe('Mutations', () => {
    it('Sets current therapySession', () => {
      const mutateCurrentTherapySession = mutations[therapySessions.current];
      const therapySession = { title: 'Test Therapy Session' };
      const state = { current: null };
      mutateCurrentTherapySession(state, therapySession);
      expect(state.current).toEqual(therapySession);
    });

    it('Sets error', () => {
      const mutateError = mutations[therapySessions.error];
      const error = { message: 'Something went wrong!' };
      const state = { error: null };
      mutateError(state, error);
      expect(state.error).toEqual(error);
    });

    it('Adds a therapySessions to the collection', () => {
      const mutateAddTherapySession = mutations[therapySessions.create];
      const therapySession = { title: 'Test Therapy Session' };
      const state = { index: [] };
      mutateAddTherapySession(state, therapySession);
      expect(state.index.length).toBe(1);
    });

    describe('Adding a single TherapySession to the collection', () => {
      describe('When the therapy sessionn is not yet known', () => {
        it('Adds the therapy session to the collection', () => {
          const therapySession = { title: 'Test Therapy Session' };
          const state = { index: [] };
          const updateTherapySession = mutations[therapySessions.update];

          updateTherapySession(state, therapySession);
          expect(state.index.length).toBe(1);
        });
      });
      describe('When the therapy session already exists', () => {
        it('Updates the existing therapy session in the collection', () => {
          const therapySession = { title: 'Test Therapy Session' };
          const state = { index: [therapySession] };
          const updateTherapySession = mutations[therapySessions.update];

          updateTherapySession(state, therapySession);
          expect(state.index.length).toBe(1);
        });
      });
    });

    it('Sets therapy sessions', () => {
      const mutateTherapySession = mutations[therapySessions.index];
      const index = [{ title: 'Test Therapy Session' }];
      const state = { index: null };
      mutateTherapySession(state, index);
      expect(state.index).toEqual(index);
    });

    it('Sets the loading flag', () => {
      const mutateLoading = mutations[therapySessions.loading];
      const state = { loading: false };
      mutateLoading(state, true);
      expect(state.loading).toBe(true);
    });

    it('Deletes a therapy session', () => {
      const therapySession = { title: 'Test Therapy Session' };
      const state = { index: [therapySession] };
      const deleteTherapySession = mutations[therapySessions.delete];

      deleteTherapySession(state, therapySession);
      expect(state.index.length).toBe(0);
    });
  });

  describe('Actions', () => {
    describe('Create Address', () => {
      const therapySession = {
        title: 'Test Therapy Session',
        startTime: moment('2019-10-28T09:33:19.986Z'),
        price: 180,
      };

      const serverResponse = {
        title: 'Test Therapy Session',
        start_time: moment('2019-10-28T09:33:19.986Z'),
        price_cents: 18000,
      };

      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .post('/api/sessions')
          .reply(200, serverResponse);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Creates a therapySession', async () => {
        const commit = sinon.spy();
        const createTherapySession = actions[therapySessions.create];

        await createTherapySession({ commit, rootGetters }, therapySession);
        expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
        expect(commit.calledWith(therapySessions.create, therapySession)).toBe(true);
        expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
      });
    });

    describe('Load all therapy sessions', () => {
      const therapySessionsResponse = [
        {
          title: 'Test Therapy Session',
          start_time: moment('2019-10-28T09:33:19.986Z'),
          therapy: { id: 1, href: 'http://test.host/therpaies/1' },
        },
      ];
      let httpClient = null;
      let rootGetters = null;

      describe('With a successful response', () => {
        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';
          nock('http://localhost/')
            .get('/api/sessions')
            .reply(200, therapySessionsResponse);
          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Loads all therapySessions', async () => {
          const commit = sinon.spy();
          const dispatch = sinon.stub().returns({ id: 1, href: 'http://test.host/therpaies/1' });
          const loadTherapySessions = actions[therapySessions.index];
          const transformedSessions = therapySessionsResponse.map(response => responseToSession(response));

          await loadTherapySessions({ commit, dispatch, rootGetters });
          console.log(
            `Expected: ${JSON.stringify(transformedSessions)}\nReceived: ${JSON.stringify(commit.getCall(1).args[1])}`,
          );

          expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
          expect(commit.calledWith(therapySessions.index, transformedSessions)).toBe(true);
          expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
        });
      });

      describe('When an error occurs', () => {
        const errorMessage = { message: 'Error occured!! :(' };

        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';

          nock('http://localhost/')
            .get('/api/sessions')
            .reply(500, errorMessage);

          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Sets the error message', () => {
          const commit = sinon.spy();
          const loadTherapySessions = actions[therapySessions.index];

          loadTherapySessions({ commit, rootGetters })
            .then(() => {
              throw new Error('Expected the promise to catch instead it resolved.');
            })
            .catch(() => {
              expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
              expect(commit.calledWith(therapySessions.error, errorMessage)).toBe(true);
              expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
            });
        });
      });
    });

    describe('Loading a single address by id', () => {
      const therapySession = { title: 'Test Therapy Session' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/sessions/1')
          .reply(200, therapySession);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single therapySession', async () => {
        const commit = sinon.spy();
        const getTherapySession = actions[therapySessions.show];

        await getTherapySession({ commit, rootGetters }, 1);
        expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
        expect(commit.calledWith(therapySessions.update, responseToSession(therapySession))).toBe(true);
        expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
      });
    });

    describe('Loading a single therapySession by href', () => {
      const therapySession = {
        title: 'Test Therapy Session',
        start_time: moment('2019-10-28T09:33:19.986Z'),
      };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/sessions/1')
          .reply(200, therapySession);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single therapySession', async () => {
        const commit = sinon.spy();
        const getTherapySession = actions[therapySessions.load];

        await getTherapySession({ commit, rootGetters }, 'http://localhost/api/sessions/1');
        expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
        expect(commit.calledWith(therapySessions.update, responseToSession(therapySession))).toBe(true);
        expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
      });
    });

    describe('Update a therapySession', () => {
      const therapySession = { title: 'Test Therapy Session', id: 1 };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .put('/api/sessions/1', therapySession)
          .reply(200, therapySession);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single therapySession', async () => {
        const commit = sinon.spy();
        const updateTherapySession = actions[therapySessions.update];

        await updateTherapySession({ commit, rootGetters }, therapySession);
        expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
        expect(commit.calledWith(therapySessions.update, responseToSession(therapySession))).toBe(true);
        expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
      });
    });

    describe('Delete a therapySession', () => {
      const therapySession = { title: 'Test Therapy Session', id: 1 };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .delete('/api/sessions/1')
          .reply(200, therapySession);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Deletes a single therapySession', async () => {
        const commit = sinon.spy();
        const deleteTherapySession = actions[therapySessions.delete];

        await deleteTherapySession({ commit, rootGetters }, therapySession);
        expect(commit.calledWith(therapySessions.loading, true)).toBe(true);
        expect(commit.calledWith(therapySessions.delete, responseToSession(therapySession))).toBe(true);
        expect(commit.calledWith(therapySessions.loading, false)).toBe(true);
      });
    });
  });
});
