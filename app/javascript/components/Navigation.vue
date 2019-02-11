<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/home">
        <img src="/logo_transparent.png"/>
      </router-link >

      <a
        role="button"
        class="navbar-burger burger"
        :class="{'is-active': burgerExpanded}"
        aria-label="menu"
        v-bind:aria-expanded="burgerExpanded"
        data-target="psyNavbar"
        @click="burgerMenuClicked"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div ref="psyNavbar" id="psyNavbar" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/home" class="navbar-item">
          Home
        </router-link>

        <router-link to="/timesheet" class="navbar-item" v-if="isLoggedIn">
          Zeit Rapport
        </router-link>

        <router-link to="/addresses" class="navbar-item" v-if="isLoggedIn">
          Addressbuch
        </router-link>

        <router-link to="/therapies" class="navbar-item" v-if="isLoggedIn">
          Therapien
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item" v-if="!isLoggedIn">
          <div class="buttons">
            <router-link class="button is-primary" to="/register">
              <strong>Registrieren</strong>
            </router-link>
            <router-link class="button" to="/login">Login</router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      burgerExpanded: false,
      isLoggedIn: false
    }
  },

  methods: {
    burgerMenuClicked() {
      console.log('Burger Menu Clicked!')
      this.burgerExpanded = !this.burgerExpanded
      this.$refs.psyNavbar.classList.toggle('is-active')
    }
  }
}
</script>

<style lang="scss" scoped></style>
