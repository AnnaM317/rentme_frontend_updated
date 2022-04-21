<template>
  <section>
    <ul class="stay-list" v-if="likedStays.length">
      <li
        class="clear-list stay-list"
        v-for="stay in likedStays"
        :key="stay._id"
      >
        <stay-preview @click.stop :stay="stay"></stay-preview>
      </li>
    </ul>
    <h2 v-else>No items in your wishlist</h2>
  </section>
</template>

<script>
import stayPreview from '@/cmps/stay-preview.vue';
export default {
  components: { stayPreview },
  props: { stays: Array },

  computed: {
    likedStays() {
      return this.stays.filter((stay) => {
        if (stay.likedByUsers) {
          return stay.likedByUsers.includes(
            this.$store.getters.loggedInUser._id
          );
        }
      });
    },
  },
};
</script>
