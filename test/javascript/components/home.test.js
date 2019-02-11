import { mount } from '@vue/test-utils'
import Home from 'components/Home.vue'

describe('Home', () => {
  const wrapper = mount(Home)

  it('is mounted correctly', () => {
    expect(wrapper.find('.home')).toBeDefined()
  })
})
