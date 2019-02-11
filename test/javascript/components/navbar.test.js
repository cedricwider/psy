import { mount } from '@vue/test-utils'
import navigation from 'Navigation.vue'

describe('Navigation', () => {
  const wrapper = mount(navigation)

  it('gets mounted', () => {
    expect(wrapper.find('.navigation').exists()).toBe(true)
  })
})
