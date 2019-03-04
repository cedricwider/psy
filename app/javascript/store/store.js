import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import sessions from './sessions';
import users from './users';
import patients from './patients';

function setupTokenHandling(axs) {
  axs.interceptors.request.use((config) => {
    config.headers.Authorization = `Token token=${window.localStorage.getItem('psy-jwt-token')}`;
    return config;
  });

  axs.interceptors.response.use(
    (response) => {
      const accessToken = response.headers['x-access-token'];
      if (accessToken) {
        window.localStorage.setItem('psy-jwt-token', accessToken);
      } else {
        console.info('store.js:: Successful response, but no access token found.');
      }
      return response;
    },
    (error) => {
      console.error('store.js:: Error response received');
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        if (error.response.status === 401) {
          window.localStorage.removeItem('psy-jwt-token');
          if (window.location.pathname !== '/login') {
            window.location = '/login';
          }
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('store.js:: Error (error.response is not present)', error.message);
      }
      console.log('store.js:: error.config: ', error.config);
      return Promise.reject(error);
    },
  );
}

Vue.use(Vuex);

const state = {};

const getters = {
  httpClient: () => {
    const axs = axios.create({
      timeout: 30000,
      headers: {
        Accept: 'application/json',
        Authorization: `Token token=${window.localStorage.getItem('psy-jwt-token')}`,
      },
    });

    setupTokenHandling(axs);
    return axs;
  },
};

const mutations = {};
const actions = {};

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: [sessions, users, patients],
});
