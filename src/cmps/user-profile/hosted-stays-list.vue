<template>
  <section class="hosted-stays-list">
    <h1>
      {{ stays.length ? sectionName : `No ${sectionName.toLowerCase()}` }}
    </h1>
    <ul class="clean-list">
      <li v-for="stay in stays" :key="stay._id">
        <section
          @click="goToDetails(stay._id)"
          class="hosted-stay-preview flex pointer"
        >
          <div class="img-container">
            <img :src="stay.imgUrls[0]" alt="" />
          </div>

          <div class="info flex column">
            <h2>{{ stay.name }}</h2>
            <span>
              <p>{{ stay.loc.address }}</p>
              <p>${{ stay.price }} / night</p>
              <p v-if="stay.avgRate">
                Average rating: {{ stay.avgRate }}
                <font-awesome-icon icon="star" />
              </p>
              <p v-else>No rating yet</p>
            </span>
          </div>

          <button class="simple-btn grey" @click.stop="editStay(stay._id)">
            Edit
          </button>
        </section>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'hosted-stays-list',
  props: {
    stays: Array,
    sectionName: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },
    editStay(stayId) {
      this.$router.push(`/stay/${stayId}/edit`);
    },
    goToDetails(stayId) {
      this.$router.push(`/stay/${stayId}`);
    },
  },
  computed: {},
  components: {},
};
</script>
