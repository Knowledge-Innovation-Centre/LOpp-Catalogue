import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

const {_x} = wp.i18n;

Vue.prototype.$t = _x;

if (document.getElementById("search-catalog-items")) {
    new Vue({
        // store,
        el: "#search-catalog-items",
        // router,
        render: h => h(App)
    });
}
