<template>
  <section class="therapy">
    <layout
      :back-link="{ name: 'therapies' }"
      :edit-link="{ name: 'therapyedit', params: { id: therapy.id } }"
      :show-delete="true"
      @delete="deleteTherapy"
    >
      <h1 slot="title">
        {{ therapy.title }}
      </h1>
      <section>
        <div class="section-header level">
          <div class="level-left">
            <h3>
              Klient(en)
            </h3>
          </div>
          <div class="level-right">
            <p class="is-right">
              Preis: CHF {{ therapy.price }}.-
            </p>
          </div>
        </div>
        <div class="columns">
          <div
            v-for="patient in therapy.patients"
            :key="patient.id"
            class="column patient-detail"
          >
            <h4 class="patient-header">
              {{ `${patient.firstName} ${patient.lastName}` }}
            </h4>
            <div
              v-if="patient.address"
              class="patient-address"
            >
              <div class="rows">
                <div class="row">
                  <p>{{ `${patient.address.street} ${patient.address.houseNumber}` }}</p>
                </div>
                <div class="row">
                  <p>{{ `${patient.address.zip} ${patient.address.town}` }}</p>
                </div>
                <div class="row">
                  <p>{{ patient.address.town }}</p>
                </div>
                <div class="column" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </layout>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { therapies } from '../../store/types';
import Layout from '../shared/layouts/show.vue';

export default {
  components: { Layout },

  props: {
    therapy: {
      type: Object,
      required: true,
    },
  },

  methods: {
    ...mapActions({ deleteTherapy: therapies.delete }),
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  border-bottom: 1px solid;
  margin-bottom: 1.5rem;
}
</style>
