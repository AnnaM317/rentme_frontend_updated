<template>
  <section class="wishlist-container main-container">
    <h2>Wishlist</h2>
    <wishlist v-if="loggedInUser && stays" :stays="stays" />
    <template v-if="!loggedInUser">
      <h2>Log in to view your Wishlist</h2>
      <p>
        You can create, view, or edit Wishlist once <br />
        you've logged in.
      </p>
      <button @click="showLogin" class="simple-btn pink">Log in</button>
    </template>
  </section>
</template>

<script>
import wishlist from '@/cmps/wishlist-list.vue';
export default {
  name: 'wishlist-page',
  components: { wishlist },
  props: {},
  data() {
    return {};
  },
  watch: {
    loggedInUser: {
      handler() {
        if (this.$route.name === 'wishlist') {
          this.loadStays();
        } else return;
      },
      immediate: true,
    },
  },
  async created() {
    window.scrollTo(0, 0);
    this.loadStays();
  },
  methods: {
    async loadStays() {
      await this.$store.dispatch({ type: 'loadStays' });
    },
    showLogin() {
      this.$store.commit('toggleLoginModal');
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    stays() {
      return this.$store.getters.staysToShow;
    },
  },
};
</script>
