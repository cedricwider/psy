<template>
  <table class="table c-table">
    <thead>
      <tr>
        <slot name="header">
          <th
            v-for="(column, index) in columnNames"
            :key="index"
            class="c-table-head"
          >
            {{ column }}
          </th>
        </slot>
      </tr>
    </thead>
    <tbody>
      <slot
        v-for="(dataRow, index) in tableData"
        name="row"
        :index="index"
        :row="dataRow"
        class="c-table-row"
      >
        <tr
          :key="index"
          class="c-table-row"
        >
          <td
            v-for="(dataValue, jndex) in dataRowValues(dataRow)"
            :key="jndex"
            class="c-table-cell"
          >
            {{ dataValue }}
          </td>
        </tr>
      </slot>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columnNames: {
      type: Object,
      required: false,
      default: () => {},
    },
    tableData: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
  computed: {
    headerFields() {
      return this.columnNames.values;
    },
  },
  methods: {
    dataRowValues(dataEntry) {
      return Object.keys(this.columnNames).map(key => dataEntry[key]);
    },
  },
};
</script>

<style lang="scss" scoped></style>
