// eslint-disable-next-line no-unused-vars
import config from '@config';
import './vendor/*.js';
import '@styles/frontend';
import './spritesvg';

import Vue from 'vue';
import App from './App.vue';

(function ( frontend, $ ) {
  $( document ).ready( () => {
    // @TODO This is an example console.log(). Remove for production.
    console.log( 'hello from Frontend. jQuery $ is working.' );

    $('.loc-show-other-information').on('click', function() {
      $('.loc-other-information').removeClass('tw-hidden');
      $('.loc-hide-other-information').removeClass('tw-hidden');
      $('.loc-show-other-information').addClass('tw-hidden');
    })
    $('.loc-hide-other-information').on('click', function() {
      $('.loc-other-information').addClass('tw-hidden');
      $('.loc-hide-other-information').addClass('tw-hidden');
      $('.loc-show-other-information').removeClass('tw-hidden');
    })
  } );
})( window.frontend = window.frontend || {}, jQuery );


Vue.config.productionTip = false;

// const { _x } = wp.i18n;

// Vue.prototype.$t = _x;
Vue.prototype.$t = (t) => {
  return t
};
console.log('not');
if (document.getElementById('search-catalog-items')) {
  new Vue({
    // store,
    el: '#search-catalog-items',
    // router,
    render: (h) => h(App),
  });
}

// Your code goes here ...
