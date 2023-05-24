import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import {
  required, email, min, max,
} from '@vee-validate/rules';

export default {
  install: (app) => {
    app.component('VeeForm', Form);
    app.component('VeeField', Field);
    app.component('VeeErrorMessage', ErrorMessage);

    defineRule('required', required);
    defineRule('email', email);
    defineRule('min', min);
    defineRule('max', max);

    configure({
      validateOnInput: true,
      validateOnChange: true,
      validateOnBlur: true,
      validateOnModelUpdate: true,
    });
  },
};
