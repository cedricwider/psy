<template>
  <div id="app container">
    <router-view></router-view>
  </div>
</template>

<script>
import router from 'router';
import { store } from 'store/store';

export default {
  store,
  router,
  data() {
    return {
    };
  },
};
</script>

<style scoped></style>
