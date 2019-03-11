import { mount } from '@vue/test-utils';
import CTable from 'shared/c_table.vue';

describe('CTable', () => {
  const tableData = [
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
    { first: 'Banana', second: 'Apple', third: 'Orange' },
  ];

  const columnNames = {
    first: 'First',
    second: 'Second',
    third: 'Last',
  };
  const wrapper = mount(CTable, { propsData: { columnNames, tableData } });

  describe('Table setup', () => {
    beforeEach(() => {});

    it('Mounts correclty', () => {
      expect(wrapper.find('.c-table').exists()).toBe(true);
    });

    it('Adds header rows', () => {
      const table = wrapper.find('.c-table');
      expect(table.findAll('.c-table-head').length).toBe(3);
    });

    it('Adds data rows', () => {
      const table = wrapper.find('.c-table');
      expect(table.findAll('.c-table-row').length).toBe(tableData.length);
    });

    it('Adds row data', () => {
      const table = wrapper.find('.c-table');
      expect(table.findAll('.c-table-cell').length).toBe(tableData.length * Object.keys(columnNames).length);
    });
  });
});
