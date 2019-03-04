<template>
  <div class="container home">
    <h1>Home</h1>
    <c-sandbox />
  </div>
</template>

<script>
import Sandbox from './shared/sandbox.vue';

export default {
  components: { 'c-sandbox': Sandbox },
};
</script>

<style lang="scss" scoped></style>
