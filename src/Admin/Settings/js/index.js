/**
 * All of the code for your admin's Settings Page belongs in this file (import from other files in this directory).
 *
 * The single/concatenated .js file gets enqueued from src/Admin/class-Assets.php.
 */

/*global wp, settingsData */

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
