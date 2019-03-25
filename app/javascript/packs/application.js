/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import App from '../app.vue';
import 'vue-material-design-icons/styles.css';
import 'buefy/dist/buefy.css';
import './style/main.scss';
import 'babel-polyfill';

Vue.use(Buefy);
Vue.use(VeeValidate);

document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('#app');
  const app = new Vue({
    el,
    render: h => h(App),
  });
  console.log(app);
});
