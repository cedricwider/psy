<template>
  <section class="patient">
    <section class="title">
      <h1>{{ fullName }}</h1>
    </section>
    <div class="phone">
      {{ patient.phone }}
    </div>
    <section class="address">
      <c-address :address="patient.address" />
    </section>
  </section>
</template>

<script>
import CAddress from './c_address.vue';

export default {
  components: {
    CAddress,
  },

  props: {
    patient: {
      type: Object,
      required: true,
    },
  },

  computed: {
    fullName() {
      return `${this.patient.firstName} ${this.patient.lastName}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
