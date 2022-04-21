<template>
  <section class="home-page main-container">
    <div class="pic full">
      <!-- <div class="main-header"> -->
      <stayFilter :citiesList="citiesList" />
      <h1 class="main-txt">
        Find a place to<br />
        stay anywhere.<br />
        Anytime.
      </h1>
    </div>
    <!-- </div> -->
    <section class="top-rated">
      <home-list
        @cardClicked="cardClicked"
        :places="citiesList"
        :listTitle="'Popular Destinations'"
      />
      <home-list
        @cardClicked="cardClicked"
        :places="topStays"
        :listTitle="'Top Rated'"
      />

      <section class="become-a-host">
        <div class="flex column">
          <h4>Become a host</h4>
          <p>
            Earn extra income and unlock new opportunities by sharing your
            space.
          </p>

          <router-link class="simple-btn grey" to="/become-host">
            Learn more
          </router-link>
        </div>
      </section>
    </section>
  </section>
</template>

<script>
import stayFilter from '../cmps/filters/stay-filter.vue';
import stayList from '../cmps/stay-explore-list.vue';
import homeList from '../cmps/lists/home-list.vue';
import { stayService } from '../services/stay.service';
export default {
  name: 'home-page',
  data() {
    return {
      filterBy: null,
      topStays: null,
      citiesList: stayService.getCitiesList().splice(0, 4),
    };
  },
  async created() {
    this.clearAllFilters();
    this.loadFilter();
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
        this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy });
        this.$router.push('/explore');
      }
    },
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    clearAllFilters() {
      this.$store.commit({ type: 'clearAllFilters' });
    },
  },
  computed: {},
  components: {
    stayFilter,
    stayList,
    homeList,
  },
};
</script>
