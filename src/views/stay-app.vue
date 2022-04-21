<template>
  <section class="stay-app main-container">
    <div class="sub-header">
      <p>
        {{ numOfResults }} stays {{ city }}
        <br />
        Review COVID-19 travel restrictions before you book.
      </p>
    </div>
    <hr />
    <stay-list :stays="stays"> </stay-list>
  </section>
</template>

<script>
import stayList from '../cmps/stay-explore-list.vue';
import secondaryFilters from '../cmps/filters/secondary-filters.vue';
import guestsFilter from '../cmps/filters/guest-filter.vue';

export default {
  components: { stayList, secondaryFilters, guestsFilter },
  name: 'stay-app',
  data() {
    return {};
  },
  async created() {
    await this.$store.dispatch({ type: 'loadStays' });
  },
  computed: {
    stays() {
      return this.$store.getters.staysToShow;
    },
    numOfResults() {
      return this.$store.getters.staysToShow.length;
    },
    city() {
      const filter = this.$store.getters.filterBy;
      return filter.city ? 'in ' + filter.city : 'to explore';
    },
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>
