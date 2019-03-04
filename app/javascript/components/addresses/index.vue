<template>
  <section class="patients-index">
    <section class="title">
      <h1>Patienten</h1>
    </section>
    <section class="table">
      <b-table
        :data="allPatients"
        :columns="columns"
        :loading="isLoading"
        striped
        :hoverable="true"
      />
    </section>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { patients } from '../../store/types';

export default {
  data() {
    return {
      columns: [
        { field: 'salutation', label: 'Anrede' },
        { field: 'first_name', label: 'Vorname' },
        { field: 'last_name', label: 'Nachname' },
      ],
    };
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
    ...mapActions({ loadPatients: patients.index }),
  },
};
</script>

<style lang="scss" scoped />
