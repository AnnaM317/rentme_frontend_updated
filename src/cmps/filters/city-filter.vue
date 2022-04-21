<template>
  <section class="city-filter flex">
    <div class="toggel-btn" @click="toggleLocations">
      <span v-if="onExplorePage || (!topOfPage && onHomePage)">{{
        city || 'Location'
      }}</span>
      <template v-else>
        <label>Location</label>
        <span>
          {{ city || 'Where are you going?' }}
        </span>
      </template>
    </div>

    <ul
      v-click-outside="onClickOutside"
      class="dropdown-list"
      v-if="shouldShow"
      @blur="toggleLocations"
    >
      <p
        v-for="city in citiesList"
        :key="city.imgUrls[1]"
        @click="filterCity(city.name)"
      >
        <img :src="city.imgUrls[1]" alt="" />
        {{ city.name }}
      </p>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'city-filter',
  props: {
    currCity: String,
    onExplorePage: Boolean,
    topOfPage: Boolean,
    onHomePage: Boolean,
    citiesList: Array,
  },
  data() {
    return {
      city: this.currCity,
      shouldShow: false,
    };
  },
  created() {},
  methods: {
    filterCity(city) {
      this.city = city;
      this.$emit('filteredCity', city);
      this.toggleLocations();
    },
    toggleLocations() {
      this.$emit('filterClicked');
      this.shouldShow = !this.shouldShow;
    },
    onClickOutside() {
      this.shouldShow = false;
    },
  },
  computed: {},
  components: {},
};
</script>
