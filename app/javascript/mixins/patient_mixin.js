import { mapActions } from 'vuex';
import { patients } from '../store/types';

export const patientMixin = {
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions({ storePatient: patients.save }),
    savePatient() {
      this.storePatient(this.patient)
        .then((pat) => {
          this.clearForm();
          this.$router.push({ name: 'addressshow', params: { id: pat.id } });
        })
        .catch(error => (this.errorMessage = error.message));
    },
    clearForm() {
      this.patient = { address: {} };
    },
    onCancelClicked() {
      this.clearForm();
      this.$router.go(-1);
    },
  },
};
