<template>
  <section class="patient-table">
    <b-table
      ref="table"
      :show-detail-icon="true"
      :data="patients"
      :loading="isLoading"
      striped
      hoverable
      detailed
      detail-key="id"
      @click="onRowClicked"
    >
      <template slot-scope="props">
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
          {{ props.row.first_name }}
        </b-table-column>
        <b-table-column
          field="last_name"
          label="Nachname"
        >
          {{ props.row.last_name }}
        </b-table-column>
      </template>

      <template
        slot="detail"
        slot-scope="props"
      >
        <div class="address-detail">
          <div class="street address-part">
            {{ mainAddress(props.row).street }}
          </div>
          <div class="house_number address-part">
            {{ mainAddress(props.row).house_number }}
          </div>
          <div class="zip address-part">
            {{ mainAddress(props.row).zip }}
          </div>
          <div class="city address-part">
            {{ mainAddress(props.row).town }}
          </div>
        </div>
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
      if (this.currentDetailRow) this.$refs.table.toggleDetails(this.currentDetailRow);
      if (row !== this.currentDetailRow) {
        this.currentDetailRow = row;
        this.$refs.table.toggleDetails(row);
      }
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
