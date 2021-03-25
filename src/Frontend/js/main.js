import Vue from "vue";
import App from "./App.vue";
// import store from "./store";
// import Vuex from "vuex";
// import commonMixin from "./mixins/commonMixin";


import InstantSearch from 'vue-instantsearch';

Vue.use(InstantSearch);
Vue.config.productionTip = false;
//
// Vue.use(Vuex);
// Vue.mixin(commonMixin);

if (document.getElementById("search-catalog-items")) {
    new Vue({
        // store,
        el: "#search-catalog-items",
        // router,
        render: h => h(App)
    });
}
