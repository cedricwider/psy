<template>
  <section class="patients-index">
    <section class="title">
      <h1 class="title is-1">
        Addresbuch
      </h1>
    </section>
    <patients-table
      :patients="allPatients"
      @select="onRowSelected"
    />
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { patients } from '../../store/types';
import PatientsTable from './patients_table.vue';

export default {
  components: {
    PatientsTable,
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      allPatients: patients.index,
      isLoading: patients.loading,
    }),
  },
  created() {
    this.loadPatients();
  },
  methods: {
    ...mapActions({ loadPatients: patients.index, setCurrentPatient: patients.current }),
    onRowSelected(patient) {
      this.setCurrentPatient(patient).then(() => {
        this.$router.push({ name: 'addressshow', params: { id: patient.id } });
      });
    },
  },
};
</script>

<style lang="scss" scoped />
