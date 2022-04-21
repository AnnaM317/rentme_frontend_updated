/// vue files
import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

/// scss
import './assets/styles/main.scss';

/// library's
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
import * as VueGoogleMaps from 'vue2-google-maps';
import vClickOutside from 'v-click-outside';

import swal from 'sweetalert2';
window.Swal = swal;
import 'sweetalert2/src/sweetalert2.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(fab, fas, far);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
Vue.use(vClickOutside);
Vue.use(ElementUI, { locale });
Vue.use(VueGoogleMaps, {
  load: {
    key: '***',
    libraries: 'places',
    load: {
      region: 'IL',
      language: 'En',
    },
  },
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app');

document.addEventListener('DOMContentLoaded', function () {
  const selector = '.nav_user';
  const elems = Array.from(document.querySelectorAll(selector));
  const navigation = document.querySelector('.nav_profile');

  function makeActive(evt) {
    const target = evt.target;

    if (!target || !target.matches(selector)) {
      return;
    }

    elems.forEach((elem) => elem.classList.remove('active'));

    evt.target.classList.add('active');
  }
});
