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
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      patient: patients.current,
      patientLoading: patients.loading,
    }),
    fullName() {
      if (!this.patient) return '';
      return `${this.patient.firstName} ${this.patient.lastName}`;
    },
    address() {
      if (!this.patient) return null;
      return this.patient.address;
    },
  },

  mounted() {
    this.loadCurrentPatient();
  },
  methods: {
    ...mapActions({
      fetchPatient: patients.show,
      setCurrentPatient: patients.current,
      fetchAddress: addresses.load,
    }),
    loadCurrentPatient() {
      const patientId = this.$route.params.id;
      this.isLoading = true;
      return this.fetchPatient(patientId).then((patient) => {
        this.setCurrentPatient(patient);
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
