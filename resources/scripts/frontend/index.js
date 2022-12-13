// eslint-disable-next-line no-unused-vars
import config from '@config';
import './vendor/*.js';
import '@styles/frontend';
import './spritesvg';

import Vue from 'vue';
import App from './App.vue';

(function ( frontend, $ ) {
  $( document ).ready( () => {
    $( "#tabs" ).tabs({
      active: 0,
      activate: function(event, ui) {

        var scrollTop = $(window).scrollTop(); // save current scroll position
        window.location.hash = ui.newPanel.attr('id'); // add hash to url
        $(window).scrollTop(scrollTop); // keep scroll at current position
      }});
  } );
})( window.frontend = window.frontend || {}, jQuery );


Vue.config.productionTip = false;

// const { _x } = wp.i18n;

// Vue.prototype.$t = _x;
Vue.prototype.$t = (t) => {
  return t
};

(function(doc,found) {
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {

      var yourdiv = doc.querySelector("#search-catalog-items");

      if(found && !yourdiv){
        // Was there but is gone, do something
        found = false;

      }

      if(yourdiv){
        // Found it, do something
        found = true;
        loadSearchCatalogItems();
      }

    });
  });
  observer.observe(doc, { childList: true, subtree: true });
})(document,false);

loadSearchCatalogItems()

function loadSearchCatalogItems() {
  if (document.getElementById('search-catalog-items')) {
    new Vue({
      el: '#search-catalog-items',
      render: (h) => h(App),
    });
  }
}
