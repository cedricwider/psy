<template>
  <section class="therapies-index">
    <div class="level">
      <div class="level-left">
        <h1 class="title is-1">
          Therapien
        </h1>
      </div>
      <div class="level-right">
        <button
          class="button is-secondary"
          @click="onAddTherapyClicked"
        >
          Therapie erfassen
        </button>
      </div>
    </div>
    <c-loading :loading="therapiesLoading">
      <therapies-table
        :therapies="Object.values(allTherapies)"
        @select="onTherapySelected"
      />
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

    onTherapySelected(therapy) {
      this.$router.push({ name: 'therapyshow', params: { id: therapy.id } });
    },

    onAddTherapyClicked() {
      this.$router.push({ name: 'therapynew' });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
