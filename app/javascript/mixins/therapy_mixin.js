import { mapActions } from 'vuex';
import { therapies } from '../store/types';

export const therapyMixin = {
  data() {
    return {
      errorMessage: null,
    };
  },
  methods: {
    ...mapActions({ storeTherapy: therapies.save }),
    saveTherapy() {
      this.storeTherapy(this.therapy)
        .then((pat) => {
          this.clearForm();
          this.$router.push({ name: 'therapyshow', params: { id: pat.id } });
        })
        .catch(error => (this.errorMessage = error.message));
    },
    clearForm() {
      this.therapy = { address: {} };
    },
    onCancelClicked() {
      this.clearForm();
      this.$router.go(-1);
    },
  },
};
