<template>
  <table class="table c-table">
    <thead>
      <tr>
        <th
          v-for="(column, index) in columnNames"
          :key="index"
          class="c-table-head"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(dataRow, index) in tableData"
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
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    columnNames: {
      type: Object,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
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
