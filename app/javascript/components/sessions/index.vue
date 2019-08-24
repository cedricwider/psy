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
      <c-loading :loading="sessionsLoading">
        <session-list
          :therapy-sessions="sessions"
          @select="onSessionSelected"
        />
      </c-loading>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import SessionForm from './session_form';
import SessionList from './therapy_sessions_list';
import CLoading from '../shared/c_loading';
import { therapySessions } from '../../store/types';

export default {
  components: {
    CLoading,
    SessionForm,
    SessionList,
  },
  computed: {
    ...mapGetters({
      sessions: therapySessions.index,
      sessionsLoading: therapySessions.loading,
    }),
  },
  methods: {
    ...mapActions({
      loadTherapies: therapySessions.index,
    }),
    onSessionSelected(session) {
      this.$router.push({ name: 'sessionshow', params: { id: session.id } });
    },
  },
  mounted() {
    this.loadTherapies();
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
