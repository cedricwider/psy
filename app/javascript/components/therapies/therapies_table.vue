<template>
  <section class="therapies-table">
    <b-table
      ref="table"
      :data="therapies"
      striped
      hoverable
      @click="onRowClicked"
    >
      <template v-slot="props">
        <b-table-column
          field="id"
          label="ID"
          width="40"
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          field="title"
          label="Titel"
        >
          {{ props.row.title }}
        </b-table-column>
        <b-table-column
          field="patients"
          label="Klienten"
        >
          {{ patientNames(props.row.patients) }}
        </b-table-column>
        <b-table-column
          field="active"
          label="Aktiv"
        >
          {{ props.row.active }}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  props: {
    therapies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentDetailRow: null,
      isLoading: false,
      patientNameStore: {},
    };
  },

  methods: {
    patientNames(patients) {
      return patients.map(patient => `${patient.firstName} ${patient.lastName}`).join(', ');
    },

    onRowClicked(row) {
      console.log('Row selected', row);
      this.$emit('select', row);
    },
  },
};
</script>

<style lang="scss" scoped></style>
