<template>
  <div class="img-list-container">
    <img
      v-for="(imgUrl, idx) in imgUrls"
      :src="imgUrl"
      :key="idx"
      alt="img..."
    />
  </div>
</template>

<script>
export default {
  name: 'img-list',
  props: {
    imgUrls: Array,
  },
  computed: {
    listHeader() {
      return this.imgUrls && this.imgUrls.length
        ? '<h2></h2><h3></h3>'
        : '<h2>No images</h2>';
    },
  },
  methods: {},
};
</script>
