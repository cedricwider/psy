<template>
  <div class="card patient-card">
    <div class="card-header">
      <p class="title">
        {{ `${patient.firstName} ${patient.lastName}` }}
      </p>
    </div>
    <div class="content">
      <div class="rows">
        <div class="row">
          <p>{{ `${patient.address.street} ${patient.address.houseNumber}` }}</p>
        </div>
        <div class="row">
          <p>{{ `${patient.address.zip} ${patient.address.town}` }}</p>
        </div>
        <div class="row">
          <p>{{ patient.address.country }}</p>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a
        class="card-footer-item"
        @click="onPatientRemoved"
      >Klient Entfernen</a>
    </footer>
  </div>
</template>

<script>
export default {
  props: {
    patient: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onPatientRemoved() {
      this.$emit('delete', this.patient);
    },
  },
};
</script>

<style lang="scss" scoped></style>
