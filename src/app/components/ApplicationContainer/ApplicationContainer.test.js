/* globals describe, it */
import { mount, shallow } from 'enzyme'
import ApplicationContainer from './ApplicationContainer'
import React from 'react'
import { expect } from 'chai'
import { createMockStore } from 'redux-test-utils'
import { Provider } from 'react-redux'
import MockStore from '../../../../mock/store/mockStore'

const mockStore = MockStore({})
let store = null
describe('ApplicationContainer Component', () => {
  beforeAll(() => {
    store = createMockStore(mockStore.getReducerState())
  })
  beforeEach(() => {
    mockStore.resetStore()
    return mockStore
  })
  test('should render header and content', () => {
    const ApplicationContainerWrapper = mount(<Provider store={store} ><ApplicationContainer /></Provider>)
    const ApplicationContainerElement = ApplicationContainerWrapper.find('.Application-container')
    expect(ApplicationContainerElement.children()).to.have.lengthOf(2)
  })

  test('should render Sections by default', () => {
    const ApplicationContainerWrapper = mount(<Provider store={store} ><ApplicationContainer /></Provider>)
    const SectionElement = ApplicationContainerWrapper.find('.Sections')
    expect(SectionElement.exists()).to.equal(true)
  })

  test('should render sections footer component', () => {
    const ApplicationContainerWrapper = mount(<Provider store={store} ><ApplicationContainer /></Provider>)
    const SectionsFooter = ApplicationContainerWrapper.find('.Sections-footer')
    expect(SectionsFooter.exists()).to.equal(true)
    expect(SectionsFooter.find('button').length).to.equal(3)
  })

  test('should render LoanReqConfirmation page on click of submit', () => {
    const ApplicationContainerWrapper = mount(<Provider store={store} ><ApplicationContainer /></Provider>)
    const SectionButtonComponent = ApplicationContainerWrapper.find('SectionButton')
    expect(SectionButtonComponent.exists()).to.equal(true)
    SectionButtonComponent.find('#Button-submit').first().simulate('click', {})
    expect(ApplicationContainerWrapper.find('.LoanReqConfirmation').exists()).to.equal(true)
  })
})
