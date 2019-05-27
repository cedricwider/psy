<template>
  <section class="session-form">
    <form-layout>
      <error
        slot="error"
        :message="errorMessage"
      />

      <!-- Therapy -->
      <b-field label="Therapie">
        <b-select
          placeholder="Therapie auswählen..."
          :loading="therapiesLoading"
          @input="onTherapySelected"
        >
          <option
            v-for="therapy in allTherapies"
            :key="therapy.id"
            :value="therapy"
          >
            {{ therapyAsOptionString(therapy) }}
          </option>
        </b-select>
      </b-field>
      <div class="columns">
        <div class="column is-one-third">
          <!-- Date -->
          <b-field label="Datum">
            <b-datepicker
              v-model="startDate"
              placeholder="Datum auswählen..."
              icon="calendar-today"
            />
          </b-field>
        </div>
        <div class="column is-one-third">
          <!-- Duration -->
          <b-field label="Dauer">
            <b-select placeholder="Dauer auswählen...">
              <option
                v-for="duration in durations"
                :key="duration"
                :value="duration"
              >
                {{ duration }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column is-one-third">
          <!-- Price -->
          <b-field label="Preis">
            <b-numberinput
              v-model="sessionPrice"
              step="10"
            />
          </b-field>
        </div>
      </div>
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
import { therapies } from '../../store/types';
import FormContainer from '../shared/FormContainer.vue';
import Error from '../shared/Error.vue';

export default {
  components: {
    Error,
    formLayout: FormContainer,
  },
  data() {
    return {
      durations: [1, 2, 3, 4, 5],
      error: null,
      errorMessage: '',
      sessionPrice: 0,
      startDate: new Date(),
      therapyId: null,
      duration: null,
    };
  },
  computed: {
    ...mapGetters({ therapiesLoading: therapies.loading, allTherapies: therapies.index }),
  },
  mounted() {
    this.loadTherapies();
  },
  methods: {
    ...mapActions({
      loadTherapies: therapies.index,
    }),
    therapyAsOptionString(therapy) {
      return `${therapy.title} (${therapy.patients.map(p => p.lastName).join(', ')})`;
    },
    onTherapySelected(therapy) {
      this.therapyId = therapy.id;
      this.sessionPrice = therapy.price;
    },
    onSaveButtonClicked() {
      console.log('Save button clicked. Please implement some logic');
    },
    onCancelButtonClicked() {
      console.log('Cancel button clicked. Please implement some logic');
    },
  },
};
</script>

<style lang="scss" scoped></style>
