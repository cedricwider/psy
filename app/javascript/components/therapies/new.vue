<template>
  <section class="address-new">
    <therapy-form
      :therapy="therapy"
      :error-message="errorMessage"
      @save="saveTherapy"
      @cancel="onCancelClicked"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { therapies } from '../../store/types';
import TherapyForm from './therapy_form.vue';
import { therapyMixin } from '../../mixins/therapy_mixin';

export default {
  components: {
    TherapyForm,
  },
  mixins: [therapyMixin],
  data() {
    return {
      errorMessage: null,
      therapy: {
        title: null,
        patients: [],
      },
    };
  },
  computed: {
    ...mapGetters({ currentTherapy: therapies.current }),
  },
  methods: {
    ...mapActions({
      setCurrentTherapy: therapies.current,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
