<template>
  <section
    v-if="address"
    class="address"
  >
    <p>{{ address.street }}&nbsp;{{ address.houseNumber }}</p>
    <p>{{ address.zip }}&nbsp;{{ address.town }}</p>
  </section>
</template>

<script>
export default {
  props: {
    address: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
