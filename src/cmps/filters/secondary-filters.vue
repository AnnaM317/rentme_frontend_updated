<template>
  <section v-click-outside="closeModal" class="secondary-filters">
    <!-- PRICE RANGE -->
    <div class="dropdown">
        <!-- <span class="middle"> -->
      <button
        class="secondary-filter-btn"
        @click="toggleModal('price')"
        v-bind:class="{ active: price.shouldShow }"
      >
        Price
      </button>
      <div
        v-bind:class="{ show: price.shouldShow }"
        class="dropdown-content price"
      >
        <button class="close-btn" @click="closeModal">✕</button>
        <p>The average nightly price is $220</p>
        <el-slider
          @change="dispatchToStore"
          v-model="filterBy.priceRange"
          range
          :min="15"
          :max="850"
        >
        </el-slider>
        <div class="flex">
          <p>
            min price <br /><span>${{ filterBy.priceRange[0] }}</span>
          </p>
          -
          <p>
            max price <br /><span>${{ filterBy.priceRange[1] }}</span>
          </p>
        </div>
      </div>
    </div>
    <!-- Property Type -->
    <div class="dropdown">
      <button
        class="secondary-filter-btn"
        @click="toggleModal('propertyType')"
        v-bind:class="{ active: propertyType.shouldShow }"
      >
        Property Type
      </button>
      <div
        v-bind:class="{ show: propertyType.shouldShow }"
        class="dropdown-content"
      >
        <p
          v-for="type in propertyType.types"
          :key="type"
          @click="setPropertyType(type)"
          class="pointer"
        >
          {{ type }}
        </p>
      </div>
    </div>
    <!-- Amenities -->
    <div class="dropdown">
      <button
        class="secondary-filter-btn"
        @click="toggleModal('amenities')"
        v-bind:class="{ active: amenities.shouldShow }"
      >
        Amenities
      </button>
      <div
        v-bind:class="{ show: amenities.shouldShow }"
        class="dropdown-content amenities"
      >
        <button
          class="secondary-filter-btn"
          v-if="amenities.shouldShow"
          @click="setAmenities"
        >
          Show results
        </button>
        <div v-for="(type, idx) in amenities.types" :key="idx">
          <input
            type="checkbox"
            :id="type"
            :value="type"
            v-model="filterBy.amenities"
          />
          <label :for="type"
            ><p>{{ type }}</p>
          </label>
        </div>
      </div>
    </div>
    <div class="dropdown">
      <button class="secondary-filter-btn" @click="clearSearch">
        Clear search
      </button>
    </div>
  </section>
</template>

<script>
import { stayService } from '../../services/stay.service';
export default {
  name: 'secondary-filter',
  data() {
    return {
      filterBy: null,
      previousBtn: '',
      price: {
        shouldShow: false,
      },
      propertyType: {
        types: stayService.getPropertyTypesList(),
        shouldShow: false,
      },
      amenities: {
        types: stayService.getAmenitiesList(),
        shouldShow: false,
      },
    };
  },
  created() {
    this.loadFilter();
  },
  methods: {
    toggleModal(currBtn) {
      if (this.previousBtn && this.previousBtn !== currBtn) {
        this[this.previousBtn].shouldShow = false;
        this[currBtn].shouldShow = true;
        this.previousBtn = currBtn;
      } else if (this.previousBtn === currBtn) {
        this[currBtn].shouldShow = false;
        this.previousBtn = '';
      } else {
        this[currBtn].shouldShow = true;
        this.previousBtn = currBtn;
      }
    },
    loadFilter() {
      const filterBy = this.$store.getters.filterBy;
      this.filterBy = JSON.parse(JSON.stringify(filterBy));
    },
    dispatchToStore() {
      this.$store.dispatch({ type: 'setFilter', filterBy: this.filterBy });
      this.loadFilter();
    },
    setPropertyType(type) {
      this.filterBy.propertyType = type;
      this.dispatchToStore();
      this.closeModal();
    },
    setAmenities() {
      this.closeModal();
      this.dispatchToStore();
    },
    clearSearch() {
      this.filterBy.priceRange = [15, 850];
      this.filterBy.amenities = [];
      this.filterBy.propertyType = '';
      this.dispatchToStore();
    },
    closeModal() {
      if (this[this.previousBtn]) {
        this[this.previousBtn].shouldShow = false;
        this.previousBtn = '';
      }
    },
  },
};
</script>
