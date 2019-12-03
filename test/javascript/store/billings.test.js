import 'babel-polyfill';
import axios from 'axios';
import sinon from 'sinon';
import nock from 'nock';
import { actions, mutations } from 'store/billings';
import { billings } from 'store/types';

describe('BillingsStore', () => {
  describe('Mutations', () => {
    const billing = {
      title: 'title',
      session: { href: 'http://example.org' },
    };

    const error = { message: 'Something went wrong!' };

    it('Sets current billing', () => {
      const muatation = mutations[billings.current];
      const store = { current: null };
      muatation(store, billing);

      expect(store.current).toEqual(billing);
    });

    it('Sets the error', () => {
      const muatation = mutations[billings.error];
      const store = { error: null };
      muatation(store, error);

      expect(store.error).toEqual(error);
    });

    it('Sets all billings', () => {
      const muatation = mutations[billings.index];
      const store = { index: null };
      const index = [billing];
      muatation(store, index);

      expect(store.index).toEqual(index);
    });

    describe('Adding a single billing to the collection', () => {
      const createBilling = mutations[billings.create];

      context('When the billing is not yet known', () => {
        const store = { index: [] };

        it('Adds the billing to the collection', () => {
          createBilling(store, billing);

          expect(store.index.length).toEqual(1);
        });
      });

      context('When the billing is already known', () => {
        const existingBilling = { id: 1, ...billing };
        const store = { index: [existingBilling] };

        it('Does not add the same billing twice', () => {
          createBilling(store, existingBilling);

          expect(store.index.length).toEqual(1);
        });
      });
    });

    describe('Updating an existing billing', () => {
      const updateBilling = mutations[billings.update];
      const existingBilling = { id: 1, ...billing };
      const store = { index: [existingBilling] };
      const updatedBilling = {
        id: 1,
        title: 'updatedTitle',
        session: { href: 'http://example.org' },
      };

      it('updates an existing billing', () => {
        updateBilling(store, updatedBilling);

        expect(store.index.length).toEqual(1);
        expect(store.index[0].title).toEqual('updatedTitle');
      });
    });

    describe('Deleting a billing', () => {
      let store = { index: [billing] };
      const deleteBilling = mutations[billings.delete];

      it('removes an existing billing', () => {
        deleteBilling(store, billing);

        expect(store.index.length).toEqual(0);
      });

      context('when billing does not exist', () => {
        store = { index: [] };
        it('does not delete anything', () => {
          deleteBilling(store, billing);

          expect(store.index.length).toEqual(0);
        });
      });
    });
  });

  describe('Actions', () => {
    const billingId = 1;
    const billing = {
      id: billingId,
      title: 'title',
      session: { href: 'http://example.com' },
    };

    describe('Load a billing by id', () => {
      let httpClient;
      let rootGetters;

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost/';
        nock('http://localhost')
          .get(`/api/billings/${billingId}`)
          .reply(200, billing);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('loads a single billing', async () => {
        const commit = sinon.spy();
        const loadBilling = actions[billings.load];

        const loadedBilling = await loadBilling(
          { commit, rootGetters },
          billingId,
        );
        expect(loadedBilling).toEqual(billing);
      });
    });

    describe('Loading all billings', () => {
      let httpClient;
      let rootGetters;
      const allBillings = [billing];

      beforeEach(() => {
        axios.defaults.baseURL = 'http://localhost';
        nock('http://localhost')
          .get('/api/billings')
          .reply(200, allBillings);
        httpClient = axios;
        rootGetters = { httpClient };
      });

      it('loads all billings', async () => {
        const commit = sinon.spy();
        const loadBillings = actions[billings.index];

        const loadedBillings = await loadBillings({ commit, rootGetters });
        expect(loadedBillings).toEqual(allBillings);
      });
    });
  });
});
