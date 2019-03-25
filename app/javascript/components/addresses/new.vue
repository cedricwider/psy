<template>
  <section class="address-new">
    <patient-form
      :patient="patient"
      :error-message="errorMessage"
      @save="savePatient"
      @cancel="onCancelClicked"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { patients } from '../../store/types';
import PatientForm from './patient_form.vue';
import { patientMixin } from '../../mixins/patient_mixin';

export default {
  components: {
    'patient-form': PatientForm,
  },
  mixins: [patientMixin],
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
    }),
  },
};
</script>

<style lang="scss" scoped></style>
