import 'babel-polyfill';
import { mutations } from 'store/billings';
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

  describe('Actions', () => {});
});
