<template>
  <section class="review-add" v-if="stay && loggedInUser">
    <button class="simple-btn grey" @click="toggleAddReview">
      {{ this.reviewToggle ? 'Cancel' : 'Add a review' }}
    </button>

    <form
      class="form-review flex column"
      v-if="reviewToggle"
      @submit.prevent="save"
    >
      <div class="add-review-container">
        <div class="rate-category">
          <span>Cleanliness</span>
          <el-rate v-model="stayReview.categories.Cleanliness"></el-rate>
        </div>
        <div class="rate-category">
          <span>Communication</span>
          <el-rate v-model="stayReview.categories.Communication"></el-rate>
        </div>
        <div class="rate-category">
          <span>Check-in</span>
          <el-rate v-model="stayReview.categories['Check-in']"></el-rate>
        </div>
        <div class="rate-category">
          <span class="rate-category">Accuracy</span>
          <el-rate v-model="stayReview.categories.Accuracy"></el-rate>
        </div>
        <div class="rate-category">
          <span class="rate-category">Location</span>
          <el-rate v-model="stayReview.categories.Location"></el-rate>
        </div>
        <div class="rate-category">
          <span class="rate-category">Value</span>
          <el-rate v-model="stayReview.categories.Value"></el-rate>
        </div>
      </div>

      <label>
        <textarea
          v-model.trim="stayReview.txt"
          cols="40"
          rows="5"
          placeholder="Write your opinion about this stay..."
        >
        </textarea>
      </label>
      <button class="simple-btn pink">Submit Review</button>
    </form>
  </section>
</template>

<script>
import { utilService } from '@/services/util.service';
import { stayService } from '@/services/stay.service';

export default {
  props: ['stay'],
  data() {
    return {
      stayReview: null,
      reviewToggle: false,
    };
  },
  mounted() {},
  created() {
    this.resetReview();
  },
  methods: {
    resetReview() {
      this.stayReview = stayService.getEmptyReview();
    },

    save() {
      let avg = 0;
      for (const key in this.stayReview.categories) {
        avg += this.stayReview.categories[key];
      }
      this.stayReview.rate = avg / 6;
      this.stayReview._id = utilService.makeId();
      this.stayReview.createdAt = this.formattedDate();
      const loggedInUser = this.$store.getters.loggedInUser;
      if (loggedInUser) {
        this.stayReview.by = {
          _id: loggedInUser._id,
          imgUrl: loggedInUser.imgUrl,
          fullname: loggedInUser.fullname,
        };
      }
      this.$emit('saveReview', this.stayReview);
      this.resetReview();
      this.toggleAddReview();
    },

    toggleAddReview() {
      this.reviewToggle = !this.reviewToggle;
    },
    formattedDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.toLocaleString('default', { month: 'long' });
      return `${month} ${year}`;
    },
  },
  computed: {
    stayId() {
      return this.$route.params.stayId;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
  },
};
</script>
