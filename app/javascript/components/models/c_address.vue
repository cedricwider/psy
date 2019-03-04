<template>
  <section
    v-if="address"
    class="address"
  >
    <p>{{ address.street }}&nbsp;{{ address.house_number }}</p>
    <p>{{ address.zip }}&nbsp;{{ address.town }}</p>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { addresses } from '../../store/types';

export default {
  props: {
    href: { type: String, required: true },
  },

  data() {
    return {
      address: null,
    };
  },

  created() {
    this.fetchAddress(this.href).then(address => (this.address = address));
  },

  methods: {
    ...mapActions({ fetchAddress: addresses.load }),
  },
};
</script>

<style lang="scss" scoped></style>
