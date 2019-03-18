<template>
  <section class="address-new">
    <form-layout>
      <error
        slot="error"
        :error="errorMessage"
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
            v-model="firstName"
            type="text"
            placeholder="Hans"
          />
        </b-field>
        <b-field
          label="Nachname"
          expanded
        >
          <b-input
            v-model="lastName"
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
            v-model="street"
            type="text"
            placeholder="Mustergasse"
          />
        </b-field>
        <b-field label="Nr.">
          <b-input
            v-model="houseNumber"
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
            v-model="zip"
            type="text"
            placeholder="8108"
          />
        </b-field>
        <b-field
          label="Ort"
          expanded
        >
          <b-input
            v-model="town"
            type="text"
            placeholder="Musterswil"
          />
        </b-field>
      </b-field>
      <b-field label="Land">
        <b-input
          v-model="country"
          type="text"
          placeholder="Schweiz"
        />
      </b-field>
    </form-layout>
  </section>
</template>

<script>
import FormContainer from '../shared/FormContainer.vue';

export default {
  components: {
    'form-layout': FormContainer,
  },
  data() {
    return {
      salutations: ['Frau', 'Herr', 'Dr.', 'Prof.', 'Prof. Dr.'],
      errorMessage: null,
      salutation: null,
      firstName: null,
      lastName: null,
      street: null,
      houseNumber: null,
      zip: null,
      town: null,
      country: 'Schweiz',
    };
  },
};
</script>

<style lang="scss" scoped></style>
