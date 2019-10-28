<template>
  <section class="session-form">
    <form-layout>
      <error
        slot="error"
        :message="errorMessage"
      />

      <!-- Therapy -->
      <b-field labea="Therapie">
        <b-select
          v-model="therapyId"
          placeholder="Therapie auswählen..."
          :loading="therapiesLoading"
          @input="onTherapySelected"
        >
          <option
            v-for="(therapyOption, index) in allTherapies"
            :key="index"
            :value="therapyOption.id"
          >
            {{ therapyAsOptionString(therapyOption) }}
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
            <b-select
              v-model="duration"
              placeholder="Dauer auswählen..."
            >
              <option
                v-for="durationOption in durations"
                :key="durationOption"
                :value="durationOption"
              >
                {{ durationOption }}
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
import moment from 'moment';
import { therapies, therapySessions } from '../../store/types';
import FormContainer from '../shared/FormContainer.vue';
import Error from '../shared/Error.vue';

export default {
  components: {
    Error,
    formLayout: FormContainer,
  },
  data() {
    return {
      durations: [30, 60, 90, 120, 180],
      error: null,
      errorMessage: '',
      sessionPrice: 0,
      startDate: new Date(),
      therapyId: null,
      duration: 60,
    };
  },
  computed: {
    ...mapGetters({
      therapiesLoading: therapies.loading,
      allTherapies: therapies.index,
      findTherapyById: therapies.find,
    }),
    title() {
      return moment(this.startDate).format('dddd, Do MMMM YYYY');
    },
  },
  mounted() {
    this.loadTherapies();
  },
  methods: {
    ...mapActions({
      loadTherapies: therapies.index,
      saveTherapySession: therapySessions.save,
    }),
    therapyAsOptionString(therapy) {
      return `${therapy.title} (${therapy.patients.map(p => p.lastName).join(', ')})`;
    },
    onTherapySelected(therapyId) {
      const therapy = this.findTherapyById(therapyId);
      if (therapy) {
        this.sessionPrice = therapy.price;
      } else {
        this.sessionPrice = 0;
      }
    },
    onSaveButtonClicked() {
      console.log(`Saving therapySession: ${JSON.stringify(this.formToTherapy())}`);
      this.saveTherapySession(this.formToTherapy());
      this.resetForm();
    },
    onCancelButtonClicked() {
      this.resetForm();
    },
    resetForm() {
      this.sessionPrice = 0;
      this.startDate = new Date();
      this.therapyId = null;
      this.duration = 60;
    },
    formToTherapy() {
      return {
        therapyId: this.therapyId,
        title: `Therapiesitzung vom ${this.title}`,
        startTime: this.startDate,
        duration: this.duration,
        price: this.sessionPrice,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
