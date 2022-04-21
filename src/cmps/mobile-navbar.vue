<template>
  <nav class="mobile-navbar flex">
    <router-link class="mobile-nav-link" to="/explore">
      <font-awesome-icon icon="search" />
      <span>Explore</span>
    </router-link>

    <router-link class="mobile-nav-link" to="/wishlist">
      <font-awesome-icon :icon="['far', 'heart']" />
      <span>Wishlist</span>
    </router-link>

    <router-link class="mobile-nav-link" to="/trips">
      <font-awesome-icon :icon="['fab', 'airbnb']" />
      <span>Trips</span>
    </router-link>

    <router-link class="mobile-nav-link" to="/">
      <font-awesome-icon :icon="['fas', 'home']" />
      <span>Home</span>
    </router-link>

    <router-link v-if="loggedInUser" class="mobile-nav-link" to="/user-profile">
      <font-awesome-icon :icon="['far', 'user']" />
      <span>Profile</span>
    </router-link>

    <a v-else class="mobile-nav-link pointer" @click="showLogin">
      <font-awesome-icon icon="user-circle" />
      <span>Log in</span>
    </a>
  </nav>
</template>
<script>
export default {
  name: 'mobile-navbar',
  props: {},
  methods: {
    showLogin() {
      this.$emit('showLogin');
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
