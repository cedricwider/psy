import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vue from 'vue';
import Vuex from 'vuex';
import Router from 'vue-router';
import navigation from 'Navigation.vue';
import { sessions } from 'store/types';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Router);

describe('Navigation', () => {
  let store;
  let actions;
  let getters;
  let wrapper;
  let token;
  let setErrorMessage;
  const router = new Router();

  const setupStore = () => {
    getters = {
      [sessions.token]: jest.fn(() => token),
    };

    actions = {
      [sessions.signOut]: jest.fn(() => {
        token = null;
      }),
    };

    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    });

    wrapper = shallowMount(navigation, { localVue, store, router });
  };

  describe('When the user is logged in', () => {
    beforeEach(() => {
      token = 'token';
      setupStore();
    });

    it('gets mounted', () => {
      expect(wrapper.find('.psy-navigation').exists()).toBe(true);
    });

    it('shows menu items', () => {
      expect(wrapper.findAll('.psy-menu-item').length).toBeGreaterThan(1);
    });

    it('shows the logout button', () => {
      expect(wrapper.findAll('.psy-logout-button').length).toEqual(1);
    });

    it('logs out the user', () => {
      const logoutButton = wrapper.find('.psy-logout-button');
      logoutButton.trigger('click');
      Vue.nextTick().then(() => {
        expect(wrapper.findAll('.psy-menu-item').length).toEqual(2);
        done();
      });
    });
  });

  describe('When the user is logged out', () => {
    beforeEach(() => {
      token = null;
      setupStore();
    });

    it('gets mounted', () => {
      expect(wrapper.find('.psy-navigation').exists()).toBe(true);
    });

    it('shows menu items', () => {
      expect(wrapper.findAll('.psy-menu-item').length).toEqual(2);
    });
  });
});
