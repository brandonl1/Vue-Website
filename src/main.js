import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueRouter from 'vue-router';
import VeeValidate from 'vee-validate';
import axios from 'axios';
import VueAxios from 'vue-axios'

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VueRouter);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

import store from './store';

new Vue({
  render: (h) => h(App),
  store,
}).$mount('#app');
