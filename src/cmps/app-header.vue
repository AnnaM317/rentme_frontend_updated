<template>
  <header
    v-bind:class="{
      'white-header': !onHomePage && !onBecomeHostPage,
      'nav-scrolled': !topOfPage,
      'user-logo-only-display': !onHomePage && !onExplorePage,
    }"
    class="main-container"
  >
    <nav class="main-nav">
      <router-link class="main-router-link" to="/">
        <div class="logo">
          <font-awesome-icon :icon="['fab', 'airbnb']" />
          <span>rentme</span>
        </div>
      </router-link>
      <main-filters
        v-if="onExplorePage || (onHomePage && !topOfPage)"
        @filtered="goToExplorePage"
        :onExplorePage="onExplorePage"
        :onHomePage="onHomePage"
        :topOfPage="topOfPage"
        :citiesList="citiesList"
      />
      <div class="flex nav-content">
        <router-link class="main-router-link" to="/explore"
          >Explore</router-link
        >
        <router-link
          v-if="!loggedInUser || !loggedInUser.isHost"
          class="main-router-link"
          to="/become-host"
          >Become a Host</router-link
        >

        <div class="dropdown" v-click-outside="onClickOutside">
          <button
            @click="toggleUserModal"
            class="flex align-center user-btn dropbtn"
          >
            <font-awesome-icon icon="bars" class="bars" />
            <div class="user-logo">
              <img v-if="loggedInUser" :src="imgUrl" alt="user image" />
              <font-awesome-icon v-else icon="user-circle" />
            </div>
          </button>
          <div
            id="myDropdown"
            :class="{ show: showUserModal }"
            class="dropdown-content"
            @click="toggleUserModal"
          >
            <router-link v-if="loggedInUser" to="/wishlist">
              <span>Wishlist</span>
            </router-link>
            <template v-if="!loggedInUser">
              <a @click.stop="toggleLogin">Log in</a>
              <a @click.stop="toggleSignup">Sign up</a>
              <hr />
              <router-link to="/become-host">
                <span>Host your home</span>
              </router-link>
            </template>
            <template v-else>
              <router-link v-if="loggedInUser" :to="'/user-profile'">
                <span>Notifications</span>
              </router-link>
              <router-link v-if="loggedInUser" :to="'/trips'">
                <span>Trips</span>
              </router-link>
              <hr />
              <router-link v-if="loggedInUser" :to="'/stay/edit'">
                <span>Host your home</span>
              </router-link>
              <router-link v-if="loggedInUser" :to="'/user-profile'">
                <span>User profile</span>
              </router-link>
              <hr />
              <a @click.stop="logout">Log out</a>
            </template>
          </div>
        </div>
      </div>
    </nav>
    <section>
      <secondary-filters v-if="onExplorePage" />
    </section>
  </header>
</template>
<script>
import mainFilters from './filters/stay-filter.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
import { stayService } from '../services/stay.service';
export default {
  name: 'app-header',
  data() {
    return {
      onHomePage: false,
      onExplorePage: false,
      onBecomeHostPage: false,
      showUserModal: false,
      topOfPage: true,
      showMainFilters: false,
      citiesList: stayService.getCitiesList(),
    };
  },
  beforeMount() {
    window.addEventListener('scroll', this.handelScroll);
  },
  watch: {
    $route: {
      handler() {
        this.onHomePage = this.$route.name !== 'Home' ? false : true;
        this.onExplorePage = this.$route.name === 'Explore' ? true : false;
        this.onBecomeHostPage =
          this.$route.name === 'BecomeHost' ? true : false;
      },
      immediate: true,
    },
  },
  computed: {
    userId() {
      return this.$store.getters.loggedInUser._id;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    imgUrl() {
      const user = this.$store.getters.loggedInUser;
      if (user && user?.imgUrl) {
        return user.imgUrl;
      } else {
        return '';
      }
    },
  },
  methods: {
    toggleUserModal() {
      this.showUserModal = !this.showUserModal;
    },
    onClickOutside() {
      this.showUserModal = false;
    },
    handelScroll() {
      if (window.pageYOffset > 0) this.topOfPage = false;
      else this.topOfPage = true;
    },
    toggleLogin() {
      this.$emit('toggleLogin');
      this.showUserModal = false;
    },
    toggleSignup() {
      this.$emit('toggleSignup');
      this.showUserModal = false;
    },
    logout() {
      this.$emit('logout');
      this.showUserModal = false;
    },
    goToExplorePage() {
      if (!this.$route.name === 'Explore') {
        this.$router.push('/explore');
      } else return;
    },
  },
  components: {
    mainFilters,
    secondaryFilters,
  },
};
</script>
