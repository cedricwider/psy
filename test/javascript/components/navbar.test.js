import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Router from 'vue-router'
import navigation from 'Navigation.vue'
import { sessions } from 'store/types'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Router)

describe('Navigation', () => {
  let store, actions, getters
  let wrapper
  let token
  let setErrorMessage

  const setupStore = () => {
    getters = {
      [sessions.token]: jest.fn(() => {
        return token
      }),
    }

    actions = {}

    store = new Vuex.Store({
      state: {},
      actions,
      getters,
    })

    wrapper = shallowMount(navigation, { localVue, store })
  }

  describe('When the user is logged in', () => {
    beforeEach(() => {
      token = 'token'
      setupStore()
    })

    it('gets mounted', () => {
      expect(wrapper.find('.psy-navigation').exists()).toBe(true)
    })

    it('shows menu items', () => {
      expect(wrapper.findAll('.psy-menu-item').length).toBeGreaterThan(1)
    })
  })

  describe('When the user is logged out', () => {
    beforeEach(() => {
      token = null
      setupStore()
    })

    it('gets mounted', () => {
      expect(wrapper.find('.psy-navigation').exists()).toBe(true)
    })

    it('shows menu items', () => {
      expect(wrapper.findAll('.psy-menu-item').length).toEqual(2)
    })
  })
})
