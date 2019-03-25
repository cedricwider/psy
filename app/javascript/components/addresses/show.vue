<template>
  <section class="show">
    <c-loading :loading="isLoading">
      <c-patient
        v-if="patient"
        :patient="patient"
      />
    </c-loading>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { patients, addresses } from '../../store/types';
import CLoading from '../shared/c_loading.vue';
import CPatient from '../models/c_patient.vue';

export default {
  components: {
    CLoading,
    CPatient,
  },

  computed: {
    ...mapGetters({
      patient: patients.current,
      patientLoading: patients.loading,
      addressLoading: addresses.loading,
    }),
    isLoading() {
      return this.patientLoading || this.addressLoading;
    },
    fullName() {
      if (!this.patient) return '';
      return `${this.patient.firstName} ${this.patient.lastName}`;
    },
    address() {
      if (!this.patient) return null;
      return this.patient.address;
    },
  },

  created() {
    if (!this.patient) {
      this.loadCurrentPatient();
    }
  },
  methods: {
    ...mapActions({
      fetchPatient: patients.show,
      setCurrentPatient: patients.current,
      fetchAddress: addresses.load,
    }),
    loadCurrentPatient() {
      const patientId = this.$route.params.id;
      return this.fetchPatient(patientId).then((patient) => {
        this.setCurrentPatient(patient);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
