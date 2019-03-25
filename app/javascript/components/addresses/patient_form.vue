<template>
  <section class="patient-form">
    <form-layout>
      <error
        slot="error"
        :message="errorMessage"
        :error="error"
      />

      <!-- Salutation and Name -->
      <b-field
        grouped
        group-multiline
      >
        <b-field label="Anrede">
          <b-select placeholder="Bitte auswählen">
            <option
              v-for="(salutation, index) in salutations"
              :key="index"
              :value="salutation"
            >
              {{ salutation }}
            </option>
          </b-select>
        </b-field>
        <b-field
          label="Vorname"
          expanded
        >
          <b-input
            v-model="patient.firstName"
            type="text"
            placeholder="Hans"
          />
        </b-field>
        <b-field
          label="Nachname"
          expanded
        >
          <b-input
            v-model="patient.lastName"
            type="text"
            placeholder="Muster"
          />
        </b-field>
      </b-field>

      <!-- Street and house number -->
      <b-field
        grouped
        group-multiline
      >
        <b-field
          label="Strasse"
          expanded
        >
          <b-input
            v-model="patient.address.street"
            type="text"
            placeholder="Mustergasse"
          />
        </b-field>
        <b-field label="Nr.">
          <b-input
            v-model="patient.address.houseNumber"
            type="text"
            placeholder="11"
          />
        </b-field>
      </b-field>

      <!-- PLZ / Town -->
      <b-field
        grouped
        group-multiline
      >
        <b-field label="PLZ">
          <b-input
            v-model="patient.address.zip"
            type="text"
            placeholder="8108"
          />
        </b-field>
        <b-field
          label="Ort"
          expanded
        >
          <b-input
            v-model="patient.address.town"
            type="text"
            placeholder="Musterswil"
          />
        </b-field>
      </b-field>
      <b-field label="Land">
        <b-input
          v-model="patient.address.country"
          type="text"
          placeholder="Schweiz"
        />
      </b-field>
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
import FormContainer from '../shared/FormContainer.vue';
import Error from '../shared/Error.vue';

export default {
  components: {
    'form-layout': FormContainer,
    Error,
  },
  props: {
    patient: {
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
      salutations: ['Frau', 'Herr', 'Dr.', 'Prof.', 'Prof. Dr.'],
    };
  },
  methods: {
    onCancelButtonClicked() {
      this.$emit('cancel');
    },
    onSaveButtonClicked() {
      this.$emit('save');
    },
  },
};
</script>

<style lang="scss" scoped></style>
