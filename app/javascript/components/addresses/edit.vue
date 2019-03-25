<template>
  <section class="patient-edit">
    <c-loading :loading="isLoading">
      <patient-form
        :patient="patient"
        :error-message="errorMessage"
        :error="serverError"
        @save="savePatient"
        @cancel="onCancelClicked"
      />
    </c-loading>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import PatientForm from './patient_form.vue';
import { patientMixin } from '../../mixins/patient_mixin';
import { patients } from '../../store/types';
import CLoading from '../shared/c_loading.vue';

export default {
  components: {
    PatientForm,
    CLoading,
  },
  mixins: [patientMixin],
  data() {
    return {
      isLoading: false,
      serverError: null,
      patient: { address: {} },
    };
  },
  created() {
    this.isLoading = true;
    this.loadPatient(this.$route.params.id)
      .then((patient) => {
        this.isLoading = false;
        this.patient = patient;
        this.setCurrentPatient(patient);
      })
      .catch((serverError) => {
        this.isLoading = false;
        this.serverError = serverError;
        console.log('Error while loading patient: ', serverError);
      });
  },
  methods: {
    ...mapActions({ loadPatient: patients.show, setCurrentPatient: patients.current }),
  },
};
</script>

<style lang="scss" scoped></style>
