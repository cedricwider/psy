import { mapActions } from 'vuex';
import { patients } from '../store/types';

export const patientMixin = {
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions({ createPatient: patients.create }),
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
