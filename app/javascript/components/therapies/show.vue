<template>
  <section class="show">
    <c-loading :loading="isLoading">
      <c-therapy
        v-if="therapy"
        :therapy="therapy"
      />
    </c-loading>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { therapies } from '../../store/types';
import CLoading from '../shared/c_loading.vue';
import CTherapy from '../models/c_therapy.vue';

export default {
  components: {
    CLoading,
    CTherapy,
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      therapy: therapies.current,
      therapyLoading: therapies.loading,
    }),
  },

  mounted() {
    this.loadCurrentTherapy();
  },
  methods: {
    ...mapActions({
      fetchTherapy: therapies.show,
      setCurrentTherapy: therapies.current,
    }),
    loadCurrentTherapy() {
      const therapyId = this.$route.params.id;
      this.isLoading = true;
      return this.fetchTherapy(therapyId).then((therapy) => {
        this.setCurrentTherapy(therapy);
        this.isLoading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
