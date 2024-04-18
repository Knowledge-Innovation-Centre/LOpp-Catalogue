// eslint-disable-next-line no-unused-vars
import './vendor/*.js';
import '@styles/frontend';
// import './spritesvg.js';
import Vue from 'vue';
import App from './App.vue';
import AppSingleCatalogue from './AppSingleCatalogue.vue';

(function (frontend, $) {
  $(document).ready(() => {
    $('#tabs').tabs({
      active: 0,
      activate(event, ui) {
        const scrollTop = $(window).scrollTop(); // save current scroll position
        window.location.hash = ui.newPanel.attr('id'); // add hash to url
        $(window).scrollTop(scrollTop); // keep scroll at current position
      },
    });
  });
}(window.frontend = window.frontend || {}, jQuery));

let loaded = false;
Vue.config.productionTip = false;

// const { _x } = wp.i18n;

// Vue.prototype.$t = _x;
Vue.prototype.$t = (t) => t;

(function (doc, found) {
  const observer = new MutationObserver(((mutations) => {
    mutations.forEach((mutation) => {
      const yourdiv = doc.querySelector('#search-catalog-items');

      if (found && !yourdiv) {
        // Was there but is gone, do something
        found = false;
      }

      if (yourdiv) {
        // Found it, do something
        found = true;
        loadSearchCatalogItems();
      }
    });
  }));

  observer.observe(doc, { childList: true, subtree: true });
}(document, false));

loadSearchCatalogItems();

function loadSearchCatalogItems() {
  if (document.getElementById('search-catalog-items')) {
    if (!loaded) {
      loaded = true;
      new Vue({
        el: '#search-catalog-items',
        render: (h) => h(App),
      });
    }
  }
}

if (document.getElementById('catalogue-single-page')) {

  const post_id = document.getElementById("catalogue-single-page").getAttribute('data-post-id');

    new Vue({
      el: '#catalogue-single-page',
      render: (h) => h(AppSingleCatalogue, {props: {post_id}}),
    });
}
