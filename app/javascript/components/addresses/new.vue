<template>
  <section class="address-new">
    <patient-form
      :patient="patient"
      :error-message="errorMessage"
      @save="savePatient"
      @cancel="clearForm"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { patients } from '../../store/types';
import PatientForm from './patient_form.vue';

export default {
  components: {
    'patient-form': PatientForm,
  },
  data() {
    return {
      errorMessage: null,
      patient: {
        address: {},
      },
    };
  },
  computed: {
    ...mapGetters({ currentPatient: patients.current }),
  },
  methods: {
    ...mapActions({
      setCurrentPatient: patients.current,
      createPatient: patients.create,
    }),
    savePatient() {
      this.createPatient(this.patient)
        .then((pat) => {
          this.$router.push({ name: 'addressshow', params: { id: pat.id } });
          this.clearForm();
        })
        .catch(error => (this.errorMessage = error.message));
    },
    clearForm() {
      this.patient = { address: {} };
    },
  },
};
</script>

<style lang="scss" scoped></style>
