<template>
  <footer class="main-container clean-els">
    <section class="footer-content flex">
      <div class="top-rated">
        <footer-list
          v-if="topStays"
          @cardClicked="cardClicked"
          :places="topStays"
          :listTitle="'Top Rated'"
        />
        <hr />
      </div>

      <div class="top-nearby">
        <footer-list
          @cardClicked="cardClicked"
          :places="topStays"
          :listTitle="'Nearby'"
        />
        <hr />
      </div>

      <div class="top-cities">
        <footer-list
          @cardClicked="cardClicked"
          :places="citiesForList"
          :listTitle="'Cities'"
        />
        <hr />
      </div>
    </section>

    <div class="rights">
      <span>©2022 rentme</span>
      <span>·</span>
      <router-link class="main-router-link" to="/">
        <span>About</span>
      </router-link>
      <span>·</span>

      <!-- <router-link class="main-router-link" to="/">
        <span>Login</span>
      </router-link>
      <span>·</span> -->

      <router-link class="main-router-link host-link" to="/become-host"
        >Become a Host</router-link
      >
    </div>
  </footer>
</template>

<script>
import footerList from '../cmps/lists/footer-list.vue';

export default {
  name: 'app-footer',
  data() {
    return {
      topStays: null,
      citiesForList: [
        {
          name: 'London',
          address: 'England',
        },
        {
          name: 'Hong Kong',
          address: 'China',
        },
        {
          name: 'Tel Aviv',
          address: 'Israel',
        },
        {
          name: 'Rome',
          address: 'Italy',
        },
      ],
    };
  },
  async created() {
    await this.$store.dispatch({ type: 'loadStays' });
    const stays = this.$store.getters.staysToShow;
    this.topStays = stays.filter((stay) => stay.avgRate >= 4.5).slice(0, 4);
  },
  methods: {
    cardClicked(cardObject) {
      this.filterBy.city = cardObject.name;
      if (cardObject._id) {
        this.$router.push('/stay/' + cardObject._id);
      } else {
        this.setFilter(this.filterBy);
      }
    },
  },
  components: {
    footerList,
  },
};
</script>
