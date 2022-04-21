<template>
  <div id="app">
    <dark-screen v-if="isLoginShown || isSignupShown" />
    <app-header
      @toggleSignup="toggleSignup"
      @toggleLogin="toggleLogin"
      @logout="logout"
    />
    <router-view />
    <login
      v-if="!loggedInUser && isLoginShown && !isSignupShown"
      @toggleLogin="toggleLogin"
      @showSignup="toggleSignup"
    />
    <signup
      v-if="!loggedInUser && isSignupShown && !isLoginShown"
      @toggleSignup="toggleSignup"
      @showLogin="toggleLogin"
    />
    <mobile-navbar @showLogin="toggleLogin" />
    <app-footer />
  </div>
</template>

<script>
import appHeader from './cmps/app-header.vue';
import login from './cmps/user-login/login.vue';
import signup from './cmps/user-login/signup.vue';
import appFooter from './cmps/app-footer.vue';
import MobileNavbar from './cmps/mobile-navbar.vue';
import DarkScreen from './cmps/dark-screen.vue';

export default {
  data() {
    return {};
  },

  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    isLoginShown() {
      return this.$store.getters.isLoginShown;
    },
    isSignupShown() {
      return this.$store.getters.isSignupShown;
    },
  },
  methods: {
    toggleLogin() {
      this.$store.commit('toggleLoginModal');
    },
    toggleSignup() {
      this.$store.commit('toggleSignupModal');
    },
    logout() {
      this.$store.dispatch({ type: 'logout' });
      this.$store.commit('closeModal');
      if (this.$route.name !== 'Home') {
        this.$router.push('/');
      }
    },
  },
  components: {
    appHeader,
    login,
    signup,
    appFooter,
    MobileNavbar,
    DarkScreen,
  },
};
</script>
