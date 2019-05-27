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
        >
          <option
            v-for="therapy in allTherapies"
            :key="therapy.id"
            :value="therapy.id"
          >
            {{ therapyAsOptionString(therapy) }}
          </option>
        </b-select>
      </b-field>

      <!-- Date -->
      <b-field label="Datum">
        <b-datepicker
          v-model="startDate"
          placeholder="Datum auswählen..."
          icon="calendar-today"
        />
      </b-field>

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
      startDate: new Date(),
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
  },
};
</script>

<style lang="scss" scoped></style>
