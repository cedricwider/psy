import 'babel-polyfill';
import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { mutations, actions } from 'store/addresses';
import { addresses } from 'store/types';

describe('AddressStore', () => {
  describe('Mutations', () => {
    it('Sets current address', () => {
      const mutateCurrentAddress = mutations[addresses.current];
      const address = { name: 'Rudy Spec' };
      const state = { current: null };
      mutateCurrentAddress(state, address);
      expect(state.current).toEqual(address);
    });

    it('Sets error', () => {
      const mutateError = mutations[addresses.error];
      const error = { message: 'Something went wrong!' };
      const state = { error: null };
      mutateError(state, error);
      expect(state.error).toEqual(error);
    });

    it('Adds a addresses to the collection', () => {
      const mutateAddAddress = mutations[addresses.create];
      const address = { name: 'Rudy Spec' };
      const state = { index: [] };
      mutateAddAddress(state, address);
      expect(state.index.length).toBe(1);
    });

    describe('Adding a single address to the collection', () => {
      describe('When the address is not yet known', () => {
        it('Adds the address to the collection', () => {
          const address = { id: 1, first_name: 'jes', last_name: 'test' };
          const state = { index: [] };
          const updateAddress = mutations[addresses.update];

          updateAddress(state, address);
          expect(state.index.length).toBe(1);
        });
      });
      describe('When the address already exists', () => {
        it('Updates the existing address in the collection', () => {
          const address = { id: 1, first_name: 'jes', last_name: 'test' };
          const state = { index: [address] };
          const updateAddress = mutations[addresses.update];

          updateAddress(state, address);
          expect(state.index.length).toBe(1);
        });
      });
    });

    it('Sets Addresses', () => {
      const mutateAddresses = mutations[addresses.index];
      const index = [{ name: 'Rudy Spec' }];
      const state = { index: null };
      mutateAddresses(state, index);
      expect(state.index).toEqual(index);
    });

    it('Sets the loading flag', () => {
      const mutateLoading = mutations[addresses.loading];
      const state = { loading: false };
      mutateLoading(state, true);
      expect(state.loading).toBe(true);
    });

    it('Deletes a address', () => {
      const address = { id: 1, first_name: 'jes', last_name: 'test' };
      const state = { index: [address] };
      const deleteAddress = mutations[addresses.delete];

      deleteAddress(state, address);
      expect(state.index.length).toBe(0);
    });
  });

  describe('Actions', () => {
    describe('Create Address', () => {
      const address = { id: 1, firts_name: 'jes', last_name: 'test' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .post('/api/addresses')
          .reply(200, address);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Creates a address', async () => {
        const commit = sinon.spy();
        const createAddress = actions[addresses.create];

        await createAddress({ commit, rootGetters }, address);
        expect(commit.calledWith(addresses.loading, true)).toBe(true);
        expect(commit.calledWith(addresses.create, address)).toBe(true);
        expect(commit.calledWith(addresses.loading, false)).toBe(true);
      });
    });

    describe('Load all addresses', () => {
      const addressesResponse = [{ id: 1, firts_name: 'jes', last_name: 'test' }];
      let httpClient;
      let rootGetters;

      describe('With a successful response', () => {
        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';
          nock('http://localhost/')
            .get('/api/addresses')
            .reply(200, addressesResponse);
          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Loads all addresses', async () => {
          const commit = sinon.spy();
          const loadAddresses = actions[addresses.index];

          await loadAddresses({ commit, rootGetters });
          expect(commit.calledWith(addresses.loading, true)).toBe(true);
          expect(commit.calledWith(addresses.index, addressesResponse)).toBe(true);
          expect(commit.calledWith(addresses.loading, false)).toBe(true);
        });
      });

      describe('When an error occurs', () => {
        const errorMessage = { message: 'Error occured!! :(' };

        beforeEach(() => {
          axios.defaults.baseURL = 'http://localhost/';

          nock('http://localhost/')
            .get('/api/addresses')
            .reply(500, errorMessage);

          httpClient = axios;
          rootGetters = { httpClient };
        });

        it('Sets the error message', () => {
          const commit = sinon.spy();
          const loadAddresses = actions[addresses.index];

          loadAddresses({ commit, rootGetters })
            .then(() => {
              throw new Error('Expected the promise to catch instead it resolved.');
            })
            .catch(() => {
              expect(commit.calledWith(addresses.loading, true)).toBe(true);
              expect(commit.calledWith(addresses.error, errorMessage)).toBe(true);
              expect(commit.calledWith(addresses.loading, false)).toBe(true);
            });
        });
      });
    });

    describe('Loading a single address by id', () => {
      const address = { id: 1, firts_name: 'jes', last_name: 'test' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/addresses/1')
          .reply(200, address);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single address', async () => {
        const commit = sinon.spy();
        const getAddress = actions[addresses.show];

        await getAddress({ commit, rootGetters }, 1);
        expect(commit.calledWith(addresses.loading, true)).toBe(true);
        expect(commit.calledWith(addresses.update, address)).toBe(true);
        expect(commit.calledWith(addresses.loading, false)).toBe(true);
      });
    });

    describe('Loading a single address by href', () => {
      const address = { id: 1, firts_name: 'jes', last_name: 'test' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .get('/api/addresses/1')
          .reply(200, address);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single address', async () => {
        const commit = sinon.spy();
        const getAddress = actions[addresses.load];

        await getAddress({ commit, rootGetters }, 'http://localhost/api/addresses/1');
        expect(commit.calledWith(addresses.loading, true)).toBe(true);
        expect(commit.calledWith(addresses.update, address)).toBe(true);
        expect(commit.calledWith(addresses.loading, false)).toBe(true);
      });
    });

    describe('Update a address', () => {
      const address = { id: 1, firts_name: 'Rudi', last_name: 'Spec' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .put('/api/addresses/1', address)
          .reply(200, address);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Loads a single address', async () => {
        const commit = sinon.spy();
        const updateAddress = actions[addresses.update];

        await updateAddress({ commit, rootGetters }, address);
        expect(commit.calledWith(addresses.loading, true)).toBe(true);
        expect(commit.calledWith(addresses.update, address)).toBe(true);
        expect(commit.calledWith(addresses.loading, false)).toBe(true);
      });
    });

    describe('Delete a address', () => {
      const address = { id: 1, firts_name: 'Rudi', last_name: 'Spec' };
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost/')
          .delete('/api/addresses/1')
          .reply(200, address);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('Deletes a single address', async () => {
        const commit = sinon.spy();
        const deleteAddress = actions[addresses.delete];

        await deleteAddress({ commit, rootGetters }, address);
        expect(commit.calledWith(addresses.loading, true)).toBe(true);
        expect(commit.calledWith(addresses.delete, address)).toBe(true);
        expect(commit.calledWith(addresses.loading, false)).toBe(true);
      });
    });
  });
});
