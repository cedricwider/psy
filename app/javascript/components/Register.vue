<template>
  <form-layout>
    <error slot="error" :error="errorMessage"></error>
    <div class="field">
      <div class="control">
        <input type="text" name="first-name" v-model="user.firstName" class="input" placeholder="Vorname">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input type="text" name="last-name" v-model="user.lastName" class="input" placeholder="Nachname">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input type="email" name="email" v-model="user.email" class="input" placeholder="Email">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input type="password" name="password" v-model="user.password" class="input" placeholder="Passwort">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <input type="password" name="password-confirmation" v-model="user.passwordConfirmation" class="input" placeholder="Passwort Wiederholen">
      </div>
    </div>

    <template slot="buttons">
      <router-link class="button is-link is-outlined" to="/login">Login</router-link>
      <button class='button is-primary' @click="register">Registrieren</button>
    </template>
  </form-layout>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { users, sessions } from '../store/types';
import Error from './shared/Error';
import FormContainer from './shared/FormContainer';

export default {
  components: {
    'form-layout': FormContainer,
    error: Error,
  },

  computed: {
    ...mapGetters({
      errorMessage: users.error,
    }),
  },

  data() {
    return {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
      },
    };
  },

  methods: {
    ...mapActions({
      createUser: users.create,
      signIn: sessions.signIn,
    }),

    register() {
      this.createUser(this.user)
        .then(() => {
          this.signIn({
            email: this.user.email,
            password: this.user.password,
          }).then(() => {
            this.$router.push({ name: 'index' });
          });
        })
        .catch((error) => {
          console.error('Error received: ', error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
