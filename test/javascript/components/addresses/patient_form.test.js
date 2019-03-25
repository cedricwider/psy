import 'babel-polyfill';
import Vue from 'vue';
import { mount } from '@vue/test-utils';
import PatientForm from 'addresses/patient_form.vue';

Vue.config.ignoredElements = ['b-input', 'b-field', 'b-select'];

describe('PatientForm', () => {
  const patient = { address: {} };
  let propsData = { patient };
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PatientForm, { propsData });
  });

  it('is mounted correctly', () => {
    expect(wrapper.find('.patient-form').exists()).toBe(true);
  });

  describe('Emitting events', () => {
    describe('CancelButton', () => {
      it('emits a "cancel" event', async () => {
        const cancelButton = wrapper.find('#cancel');
        cancelButton.trigger('click');
        await Vue.nextTick();
        expect(wrapper.emitted().cancel).toBeTruthy();
      });
    });

    describe('SaveButton', () => {
      it('emits a "save" event', async () => {
        const saveButton = wrapper.find('#submit');
        saveButton.trigger('click');
        await Vue.nextTick();
        expect(wrapper.emitted().save).toBeTruthy();
      });
    });
  });

  describe('Displaying the errorMessage', () => {
    const errorMessage = 'The error message';
    beforeEach(() => {
      propsData = { patient, errorMessage };
      wrapper = mount(PatientForm, { propsData });
    });

    it('Shows an error message', () => {
      expect(wrapper.find('.error').exists()).toBeTruthy();
    });
  });
});
