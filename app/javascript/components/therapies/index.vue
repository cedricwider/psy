<template>
  <section class="therapies-index">
    <c-loading :loading="therapiesLoading">
      <therapies-table :therapies="Object.values(allTherapies)" />
    </c-loading>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import TherapiesTable from './therapies_table.vue';
import CLoading from '../shared/c_loading.vue';
import { therapies } from '../../store/types';

export default {
  components: {
    TherapiesTable,
    CLoading,
  },

  computed: {
    ...mapGetters({
      allTherapies: therapies.index,
      therapiesLoading: therapies.loading,
    }),
  },

  created() {
    this.loadTherapies();
  },

  methods: {
    ...mapActions({
      loadTherapies: therapies.index,
    }),
  },
};
</script>

<style lang="scss" scoped></style>
