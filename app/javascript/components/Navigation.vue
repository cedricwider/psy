<template>
  <nav
    class="navbar psy-navigation"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link
        class="navbar-item"
        to="/home"
      >
        <img src="/logo_transparent.png">
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': burgerExpanded }"
        aria-label="menu"
        :aria-expanded="burgerExpanded"
        data-target="psyNavbar"
        @click="burgerMenuClicked"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div
      id="psyNavbar"
      ref="psyNavbar"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <router-link
          to="/home"
          class="navbar-item psy-menu-item"
        >
          Home
        </router-link>

        <router-link
          v-if="isLoggedIn"
          to="/timesheet"
          class="navbar-item psy-menu-item"
        >
          Zeit Rapport
        </router-link>

        <router-link
          v-if="isLoggedIn"
          to="/addresses"
          class="navbar-item psy-menu-item"
        >
          Addressbuch
        </router-link>

        <router-link
          v-if="isLoggedIn"
          to="/therapies"
          class="navbar-item psy-menu-item"
        >
          Therapien
        </router-link>
      </div>

      <div class="navbar-end">
        <div
          v-if="!isLoggedIn"
          class="navbar-item psy-menu-item"
        >
          <div class="buttons">
            <router-link
              class="button is-primary"
              to="/register"
            >
              <strong>Registrieren</strong>
            </router-link>
            <router-link
              class="button"
              to="/login"
            >
              Login
            </router-link>
          </div>
        </div>

        <div
          v-if="isLoggedIn"
          class="navbar-item"
        >
          <div class="buttons">
            <button
              class="button psy-logout-button"
              @click="logout"
            >
              <strong>Logout</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { sessions } from '../store/types';

export default {
  data() {
    return {
      burgerExpanded: false,
    };
  },

  computed: {
    ...mapGetters({ token: sessions.token }),
    isLoggedIn() {
      return this.token !== null;
    },
  },

  methods: {
    ...mapActions({ signOut: sessions.signOut }),

    logout() {
      this.signOut();
    },

    burgerMenuClicked() {
      console.log('Burger Menu Clicked!');
      this.burgerExpanded = !this.burgerExpanded;
      this.$refs.psyNavbar.classList.toggle('is-active');
    },
  },
};
</script>

<style lang="scss" scoped></style>
