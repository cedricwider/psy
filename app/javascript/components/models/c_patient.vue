<template>
  <section class="patient">
    <layout
      :back-link="{ name: 'addresses' }"
      :edit-link="{ name: 'addressedit', params: { id: patient.id } }"
      :show-delete="true"
      @delete="deletePatient"
    >
      <h1 slot="title">
        {{ `${patient.firstName} ${patient.lastName}` }}
      </h1>
      <div class="phone">
        {{ patient.phone }}
      </div>
      <section class="address">
        <c-address :address="patient.address" />
      </section>
    </layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import CAddress from './c_address.vue';
import Layout from '../shared/layouts/show.vue';
import { patients } from '../../store/types';

export default {
  components: {
    CAddress,
    Layout,
  },

  props: {
    patient: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions({ deletePatient: [patients.delete] }),
  },
};
</script>

<style lang="scss" scoped></style>
