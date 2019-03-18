<template>
  <section class="patient-table">
    <b-table
      ref="table"
      :show-detail-icon="true"
      :data="patients"
      :loading="isLoading"
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
        </b-table-column><b-table-column
          field="salutation"
          label="Anrede"
          width="60"
        >
          {{ props.row.salutation }}
        </b-table-column>
        <b-table-column
          field="first_name"
          label="Vorname"
        >
          {{ props.row.firstName }}
        </b-table-column>
        <b-table-column
          field="last_name"
          label="Nachname"
        >
          {{ props.row.lastName }}
        </b-table-column>
      </template>
    </b-table>
  </section>
</template>

<script>
export default {
  props: {
    patients: { type: Array, required: true },
    isLoading: { type: Boolean, required: false, default: false },
  },

  data() {
    return {
      currentDetailRow: null,
    };
  },

  methods: {
    mainAddress(patient) {
      return patient.addresses.find(address => address.main_address) || patient.addresses[0];
    },

    onRowClicked(row) {
      console.log('Row selected', row);
      this.$emit('select', row);
    },
  },
};
</script>

<style lang="scss" scoped>
.address-detail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.address-part {
  margin-right: 1.5rem;
}
</style>
