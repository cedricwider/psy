<template>
  <div id="app container">
    <section class="navigation">
      <psy-nav></psy-nav>
    </section>
    <section class="content">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import router from 'router'
import { store } from 'store/store'
import Navigation from './components/Navigation'

export default {
  components: {
    'psy-nav': Navigation,
  },
  store,
  router,
  data() {
    return {}
  },
}
</script>

<style scoped></style>
