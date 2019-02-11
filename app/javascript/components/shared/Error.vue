<template>
  <div class="error">
    <div class="error-message" v-if='message'>
      <div class="notification is-danger">
        <p>{{message}}</p>
      </div>
    </div>
    <div class="error-object message is-danger" v-if='displayError'>
      <div class="message-header">
        <p>{{ messageHeader }}</p>
      </div>
      <div class="message-body">
        <ul>
          <li v-for='( message, index ) in errorMessages' :key='index'>{{ message }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['message', 'error'],
  computed: {
    errorMessages() {
      const errorMessages = Object.entries(this.error.errors)
        .map(entry => entry[1].map(fieldError => `${entry[0]} ${fieldError}`));
      return [].concat(...errorMessages);
    },
    messageHeader() {
      return this.error.message;
    },
    displayError() {
      return this.showError && this.error;
    },
  },
  data() {
    return {
      showError: true,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
