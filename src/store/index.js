import Vue from 'vue';
import Vuex from 'vuex';

import { userStore } from './user.store.js';
import { stayStore } from './stay.store.js';
import { orderStore } from './order.store.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoginShown: false,
    isSignupShown: false,
    isDarkScreenShown: false,
  },
  getters: {
    isLoginShown(state) {
      return state.isLoginShown;
    },
    isSignupShown(state) {
      return state.isSignupShown;
    },
  },
  mutations: {
    toggleLoginModal(state) {
      state.isSignupShown = false;
      state.isLoginShown = !state.isLoginShown;
    },
    toggleSignupModal(state) {
      state.isLoginShown = false;
      state.isSignupShown = !state.isSignupShown;
    },
    closeModal(state) {
      state.isLoginShown = false;
      state.isSignupShown = false;
    },
    toggleDarkScreen(state) {
      state.isDarkScreenShown = !state.isDarkScreenShown;
    },
  },
  strict: true,
  modules: {
    userStore,
    stayStore,
    orderStore,
  },
});
