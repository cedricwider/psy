<template>
  <section class="therapy-edit">
    <c-loading :loading="isLoading">
      <therapy-form
        :therapy="therapy"
        :error-message="errorMessage"
        :error="serverError"
        @save="saveTherapy"
        @cancel="onCancelClicked"
      />
    </c-loading>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import TherapyForm from './therapy_form.vue';
import { therapyMixin } from '../../mixins/therapy_mixin';
import { therapies } from '../../store/types';
import CLoading from '../shared/c_loading.vue';

export default {
  components: {
    TherapyForm,
    CLoading,
  },
  mixins: [therapyMixin],
  data() {
    return {
      isLoading: false,
      serverError: null,
      therapy: { address: {} },
    };
  },
  created() {
    this.isLoading = true;
    this.loadTherapy(this.$route.params.id)
      .then((therapy) => {
        this.isLoading = false;
        this.therapy = therapy;
        this.setCurrentTherapy(therapy);
      })
      .catch((serverError) => {
        this.isLoading = false;
        this.serverError = serverError;
        console.log('Error while loading therapy: ', serverError);
      });
  },
  methods: {
    ...mapActions({ loadTherapy: therapies.show, setCurrentTherapy: therapies.current }),
    saveTherapy(therapy) {
      this.therapy = therapy;
      this.setCurrentTherapy(this.therapy);
      this.storeTherapy(this.therapy)
        .then(thrpy => this.$router.push({ name: 'therapyshow', params: { id: thrpy.id } }))
        .catch(error => (this.serverError = error));
    },
  },
};
</script>

<style lang="scss" scoped></style>
