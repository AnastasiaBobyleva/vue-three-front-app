import { describe, it, expect, beforeEach } from 'vitest'
import { DOMWrapper, shallowMount, VueWrapper } from '@vue/test-utils'
import ItemListSidebar from '../ItemListSidebar.vue'

let wrapper: VueWrapper;

beforeEach(() => {
  const defaultID = '0'
  wrapper = shallowMount(ItemListSidebar, {props: {
    data: [{
        id: defaultID,
        name: 'Part',
        description: 'This is a simple part'
     }],
     activeID: defaultID
    },
    global: {renderStubDefaultSlot: true}
  })
});

describe('Card list component', () => {
  it('renders properly', () => {
    // Shallow mount your components when doing unit tests,
    // and simply mount them when doing tests in your entire application
    expect(wrapper.text()).toContain('Body')
  })

  it('defines card item', () => {
    // Get first card in the items list
    const firstItem = wrapper.find('el-card')
    // Check item element properties
    expect(firstItem.classes()).toContain('cardDefault')
  })
})





