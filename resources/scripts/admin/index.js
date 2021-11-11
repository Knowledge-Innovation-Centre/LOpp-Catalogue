// eslint-disable-next-line no-unused-vars
import config from '@config';
import '@styles/admin';

console.log('not');

import Vue from "vue";
import App from "./App.vue";
import Notifications from 'vue-notification'

Vue.config.productionTip = false;

const {_x} = wp.i18n;
Vue.prototype.$t = _x;

Vue.use(Notifications)

if (document.getElementById("vue-admin")) {
  new Vue({
    // store,
    el: "#vue-admin",
    // router,
    render: h => h(App)
  });
}


// Your code goes here ...
