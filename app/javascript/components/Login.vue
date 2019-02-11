<template>
  <div class="login">
    <form-container>
      <error slot='error' :message='error'></error>

      <div class="field">
        <div class="control">
          <input type="email" v-model="email" class="input" placeholder="Email">
        </div>
      </div>
      <div class="field">
        <div class="control">
          <input type="password" v-model="password" class="input" placeholder="Passwort">
        </div>
      </div>

      <template slot="buttons">
        <router-link class='button is-link is-outlined' to="/register">Registrieren</router-link>
        <button class='button is-primary' @click='submit'>Einloggen</button>
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
    margin: 1rem .5rem;
  }
</style>
