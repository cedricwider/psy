<template>
  <div class="login">
    <form-container>
      <error
        slot="error"
        :message="error"
      />

      <div class="field">
        <div class="control">
          <input
            v-model="email"
            type="email"
            class="input"
            placeholder="Email"
          >
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input
            v-model="password"
            type="password"
            class="input"
            placeholder="Passwort"
          >
        </div>
      </div>

      <template slot="buttons">
        <router-link
          class="button is-link is-outlined"
          to="/register"
        >
          Registrieren
        </router-link>
        <button
          class="button is-primary"
          :class="{ 'is-loading': loading }"
          @click="submit"
        >
          Einloggen
        </button>
      </template>
    </form-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Error from './shared/Error';
import FormContainer from './shared/FormContainer';
import { sessions } from '../store/types';

export default {
  components: {
    error: Error,
    'form-container': FormContainer,
  },

  data() {
    return {
      email: '',
      password: '',
    };
  },

  computed: {
    ...mapGetters({
      loading: sessions.loading,
      error: sessions.error,
      token: sessions.token,
    }),
  },

  methods: {
    ...mapActions({
      signIn: sessions.signIn,
    }),

    register() {
      this.email = '';
      this.password = '';
    },

    submit() {
      console.log('Login.vue in submit');
      this.signIn({ email: this.email, password: this.password })
        .then(() => {
          console.log('Login.vue Received sign-in response.');
          window.setTimeout(() => {
            this.$router.push({ name: 'index' });
          }, 500);
        })
        .catch(error => console.error(`Login.vue Error recieved: ${error}`));
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  margin: 1rem 0.5rem;
}
</style>
