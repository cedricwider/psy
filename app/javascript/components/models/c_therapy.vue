<template>
  <section class="therapy">
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <button
            class="button is-secondary"
            @click="onBackButtonClicked"
          >
            Zur Übersicht
          </button>
        </div>
      </div>
      <div class="level-item">
        <h1>{{ therapy.title }}</h1>
      </div>
      <div class="level-right">
        <div class="level-item">
          <button
            class="button"
            @click="onEditButtonClicked"
          >
            Bearbeiten
          </button>
        </div>
      </div>
    </div>
    <section>
      <div class="section-header">
        <h3>
          Klient(en)
        </h3>
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
  </section>
</template>

<script>
import CPatient from './c_patient.vue';

export default {
  components: { CPatient },

  props: {
    therapy: {
      type: Object,
      required: true,
    },
  },

  computed: {},
  methods: {
    onBackButtonClicked() {
      this.$router.push({ name: 'therapies' });
    },

    onEditButtonClicked() {
      this.$router.push({ name: 'therapyedit', params: { id: this.therapy.id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.section-header {
  border-bottom: 1px solid;
  margin-bottom: 1.5rem;
}
</style>
