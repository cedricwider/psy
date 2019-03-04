<template>
  <section class="patient">
    <section class="title">
      <h1>{{ fullName }}</h1>
    </section>
    <section class="address">
      <c-address
        v-for="address in patient.addresses"
        :key="address.id"
        :href="address.href"
      />
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
      return `${this.patient.first_name} ${this.patient.last_name}`;
    },
  },
};
</script>

<style lang="scss" scoped></style>
