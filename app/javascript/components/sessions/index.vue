<template>
  <div class="sessions-index">
    <!-- Header -->
    <section class="header">
      <div class="level">
        <div class="level-left">
          <h1>Zeit-Erfassung</h1>
        </div>
        <div class="level-right" />
      </div>
    </section>
    <!-- Session Form -->
    <section class="session-form">
      <session-form />
    </section>
    <!-- Session List -->
    <section class="session-list">
      <div class="placeholder" />
    </section>
  </div>
</template>

<script>
import SessionForm from './session_form';

export default {
  components: {
    SessionForm,
  },
  data() {
    return {
      sessionsLoading: false,
    };
  },
};
</script>

<style lang="scss" scoped>
.sessions-index {
  display: flex;
  flex-direction: column;
}
.session-form {
  min-height: 30vh;
}
.session-list {
  min-height: 70vh;
}
.placeholder {
  height: 100%;
  width: 100%;
  border: 1px black solid;
}
</style>
