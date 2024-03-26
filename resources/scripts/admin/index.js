// eslint-disable-next-line no-unused-vars
import '@styles/admin';

import Vue from 'vue';
import Notifications from 'vue-notification';
import App from './App.vue';

Vue.config.productionTip = false;

const { _x } = wp.i18n;
Vue.prototype.$t = _x;

Vue.use(Notifications);

if (document.getElementById('vue-admin')) {
  new Vue({
    el: '#vue-admin',
    render: (h) => h(App),
  });
}

// Your code goes here ...
