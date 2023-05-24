import 'babel-polyfill';

import { createApp } from 'vue';

import toast from '@/plugins/vue-toast-notification';
import VeeValidatePlugin from '@/plugins/vee-validate';
import store from '@/store';
import router from '@/router';
import { VTooltip } from 'floating-vue';
import 'floating-vue/dist/style.css';
import helperMixin from '@/mixins/helper';
import App from './App.vue';

import './assets/style/app.scss';

const app = createApp(App);

// Plugins
app.use(router);
app.use(VeeValidatePlugin);
app.use(toast);
app.use(store);

// Directives
app.directive('tooltip', VTooltip);

// Mixins
app.mixin(helperMixin);

app.mount('#app');
