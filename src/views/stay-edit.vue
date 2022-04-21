<template>
  <section v-if="stay" class="stay-details edit main-container">
    <div class="flex space-between">
      <h2>
        <input
          class="stay-name"
          type="text"
          v-model="stay.name"
          placeholder="Enter title"
        />
      </h2>
      <button
        class="delete-btn"
        v-if="stay._id"
        @click="displayConfirmModal"
        title="Delete"
      >
        <font-awesome-icon :icon="['far', 'trash-alt']" />
      </button>
    </div>
    <div class="review-details">
      <template>
        <font-awesome-icon icon="star" />
        <span class="rate">{{ stay.avgRate }}</span>
        <span class="reviews">{{ formattedReviews }}</span
        >&#183;
      </template>
      <select v-model="stay.loc.city">
        <option value="" selected disabled hidden>Choose city</option>
        <option v-for="city in citiesList" :value="city.name" :key="city.name">
          {{ city.name === 'flexible' ? 'Other' : city.name }}
        </option>
      </select>
      <a class="details-location">
        <input
          class=""
          type="text"
          v-model="stay.loc.address"
          placeholder="Enter address"
        />
      </a>
    </div>
    <img-upload :imgUrls="stay.imgUrls" @imagesUpdated="updateStayImages" />
    <div class="details-main-container flex">
      <div class="stay-details-left-container">
        <div class="info-header">
          <div class="info">
            <h2 v-if="stay._id">
              {{ stay.type }} hosted by
              {{ loggedInUser.fullname }}
            </h2>
            <p>
              <input class="" type="number" v-model="stay.capacity" />
              guests <span> &#183; </span>
              StayType:
              <select v-model="stay.type">
                <option v-for="type in propertyTypes" :value="type" :key="type">
                  {{ type }}
                </option>
              </select>
              price:
              <input class="" type="number" v-model="stay.price" />

              <span>/night </span>
            </p>
          </div>

          <img :src="loggedInUser.imgUrl" alt="" />
        </div>
        <hr />
        <div class="assets-container">
          <div class="assets-content">
            <div class="icon"><font-awesome-icon icon="home" /></div>
            <div class="asset-details">
              <h4>Entire home</h4>
              <p>You’ll have the loft to yourself.</p>
            </div>
          </div>
          <div class="assets-content">
            <div class="icon"><font-awesome-icon icon="broom" /></div>
            <div class="asset-details">
              <h4>Enhanced Clean</h4>
              <p>
                This Host committed to Airbnb's 5-step enhanced cleaning
                process. Show more
              </p>
            </div>
          </div>
          <div class="assets-content">
            <div class="icon"><font-awesome-icon icon="door-closed" /></div>
            <div class="asset-details">
              <h4>Self check-in</h4>
              <p>Check yourself in with the lockbox.</p>
            </div>
          </div>
          <div class="assets-content">
            <div class="icon"><font-awesome-icon icon="map-marker-alt" /></div>
            <div class="asset-details">
              <h4>Great location</h4>
              <p>100% of recent guests gave the location a 5-star rating.</p>
            </div>
          </div>
        </div>
        <hr />
        <div class="details-summary-container">
          <textarea
            name="summary"
            id=""
            cols="100"
            rows="10"
            v-model="stay.summary"
            placeholder="Add description"
          ></textarea>
        </div>
        <hr />
        <div class="stay-details-amenities">
          <h2>What this place offers</h2>
          <div class="amenities-content">
            <div v-for="(amenity, idx) in amenities" :key="idx">
              <input
                type="checkbox"
                :id="amenity"
                :value="amenity"
                v-model="stay.amenities"
              />
              {{ amenity }}
            </div>
          </div>
        </div>
      </div>
      <div id="right" class="stay-details-right-container flex">
        <button class="simple-btn pink" @click="saveEditedStay">Save</button>
      </div>
    </div>
    <confirm-modal
      :message="'Delete this stay?'"
      @confirm="removeStay"
      @closeModal="closeConfirmModal"
      :shouldShow="showConfirmModal"
    />
  </section>
</template>

<script>
import longText from '../cmps/details/long-text.vue';
import imgUpload from '../cmps/edit-stay/img-upload.vue';
import imgList from '../cmps/edit-stay/img-list.vue';
import { stayService } from '../services/stay.service';
import ConfirmModal from '../cmps/confirm-modal.vue';

export default {
  name: 'edit-stay',
  data() {
    return {
      loggedInUser: null,
      stay: null,
      citiesList: stayService.getCitiesList(),
      propertyTypes: stayService.getPropertyTypesList(),
      amenities: stayService.getAmenitiesList(),
      emptyImgUrl:
        'https://www.survivorsuk.org/wp-content/uploads/2017/01/no-image.jpg',
      showConfirmModal: false,
    };
  },
  async created() {
    this.loggedInUser = this.$store.getters.loggedInUser;
    const { stayId } = this.$route.params;
    let stay;
    if (stayId) {
      stay = await this.$store.dispatch({
        type: 'getStayById',
        stayId: stayId,
      });
      this.stay = JSON.parse(JSON.stringify(stay));
    } else {
      this.stay = stayService.getEmptyStay();
    }
    this.setStayImages();
  },
  computed: {
    beds() {
      return this.stay.capacity === 1
        ? this.stay.capacity + ' bed'
        : this.stay.capacity + ' beds';
    },
    formattedReviews() {
      if (!this.stay.reviews.length) return 'New';
      if (this.stay.reviews.length === 1)
        return `(${this.stay.reviews.length} review)`;
      else if (this.stay.reviews.length > 1)
        return `(${this.stay.reviews.length} reviews)`;
    },
  },
  methods: {
    updateStayImages({ newImg, prevImg }) {
      if (!this.stay._id) prevImg = this.emptyImgUrl;
      const prevImgIdx = this.stay.imgUrls.indexOf(prevImg.replace(/'/g, ''));
      this.stay.imgUrls.splice(prevImgIdx, 1, newImg);
    },

    setStayImages() {
      let images = this.stay.imgUrls.slice();
      if (this.stay._id) {
        images = images.length > 5 ? images.splice(0, 5) : images;
      } else {
        for (let i = 0; i < 5; i++) {
          images.push(this.emptyImgUrl);
        }
      }
      this.stay.imgUrls = images;
    },
    mounted() {
      window.scrollTo(0, 0);
    },
    async saveEditedStay() {
      if (!this.loggedInUser.isHost) {
        this.loggedInUser.isHost = true;
        this.$store.dispatch({ type: 'updateUser', user: this.loggedInUser });
      }
      this.stay.host = {
        _id: this.loggedInUser._id,
        fullname: this.loggedInUser.fullname,
        imgUrl: this.loggedInUser.imgUrl,
      };
      const editedStay = await this.$store.dispatch({
        type: 'saveStay',
        stay: this.stay,
      });
      this.stay = editedStay;
      this.$router.push('/user-profile');
    },
    removeStay() {
      this.closeConfirmModal();
      const stayId = this.stay._id;
      this.$store.dispatch('removeStay', stayId);
      this.$router.push('/user-profile');
    },
    displayConfirmModal() {
      this.showConfirmModal = true;
    },
    closeConfirmModal() {
      this.showConfirmModal = false;
    },
  },

  components: {
    longText,
    imgUpload,
    imgList,
    ConfirmModal,
  },
};
</script>
