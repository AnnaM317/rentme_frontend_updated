<template>
  <section class="become-a-host full-page">
    <h4>Become a host</h4>
    <p>Earn extra income and unlock new opportunities by sharing your space.</p>

    <router-link v-if="loggedInUser" class="simple-btn grey" to="/stay/edit">
      Add listing
    </router-link>
    <button @click="showLoginModal" v-else class="simple-btn pink">
      Log in
    </button>
  </section>
</template>

<script>
export default {
  components: {},
  name: 'become-host-page',
  data() {
    return {};
  },
  created() {},
  methods: {
    showLogin() {
      this.$store.commit('toggleLoginModal');
    },
    showLoginModal() {
      this.$store.commit('toggleLoginModal');
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
