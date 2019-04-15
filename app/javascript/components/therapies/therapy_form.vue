<template>
  <section class="therapy-form">
    <form-layout>
      <error
        slot="error"
        :message="errorMessage"
        :error="error"
      />

      <!-- Title -->
      <b-field
        label="Bezeichnung"
        expanded
      >
        <b-input
          v-model="therapy.title"
          type="text"
          placeholder="Hans"
        />
      </b-field>

      <!-- Patient selection -->
      <section class="patient-selection">
        <b-field label="Klient hinzufügen">
          <b-autocomplete
            v-model="name"
            :data="filteredPatients"
            icon="magnify"
            :clear-on-select="true"
            :loading="isLoading"
            custom-field-formatter="p => p.firstName"
            @select="onPatientSelected"
          >
            <template slot-scope="props">
              {{ patientDisplayText(props.option) }}
            </template>
          </b-autocomplete>
        </b-field>
        <div class="patient-list">
          <div
            v-for="patient in therapy.patients"
            :key="patient.id"
            class="patient-card"
          >
            <c-patient-card
              :patient="patient"
              @delete="onPatientDeleted"
            />
          </div>
        </div>
      </section>

      <template slot="buttons">
        <button
          id="cancel"
          class="button is-outlined"
          @click="onCancelButtonClicked"
        >
          Abbrechen
        </button>
        <button
          id="submit"
          class="button is-primary"
          type="submit"
          @click="onSaveButtonClicked"
        >
          Speichern
        </button>
      </template>
    </form-layout>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import FormContainer from '../shared/FormContainer.vue';
import Error from '../shared/Error.vue';
import { patients } from '../../store/types';
import CPatientCard from './c_patient_card.vue';

export default {
  components: {
    'form-layout': FormContainer,
    Error,
    CPatientCard,
  },
  props: {
    therapy: {
      type: Object,
      required: true,
    },
    errorMessage: {
      type: String,
      required: false,
      default: '',
    },
    error: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      isLoading: false,
      ptnts: null,
      name: null,
    };
  },
  computed: {
    ...mapGetters({
      allPatients: patients.index,
      patientsLoading: patients.loading,
    }),
    filteredPatients() {
      if (!this.therapy.patients) return;

      return this.allPatients
        .filter(patient => !this.therapy.patients.includes(patient))
        .filter(
          patient => this.patientDisplayText(patient)
            .toLowerCase()
            .indexOf(this.name) >= 0,
        );
    },
  },
  methods: {
    ...mapActions({ loadPatients: patients.index }),
    onCancelButtonClicked() {
      this.$emit('cancel');
    },
    onSaveButtonClicked() {
      this.$emit('save', this.therapy);
    },
    onPatientSelected(patient) {
      this.therapy.patients.push(patient);
    },
    onPatientDeleted(patient) {
      console.log(`Deleting patient: ${JSON.stringify(patient)}`);
      const patientIndex = this.therapy.patients.indexOf(patient);
      this.therapy.patients.splice(patientIndex, 1);
    },
    formatPatient(patient) {
      console.log(patient);
      return `${patient.firstName} ${patient.lastName} ${patient.address.town}`;
    },
    patientDisplayText(patient) {
      return `${patient.firstName} ${patient.lastName} -- ${patient.address.town}`;
    },
  },
  mounted() {
    this.isLoading = true;
    this.loadPatients().then(() => (this.isLoading = false));
  },
};
</script>

<style lang="scss" scoped>
.patient-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.patient-card:nth-child(n + 2) {
  margin-left: 2rem;
}
</style>
