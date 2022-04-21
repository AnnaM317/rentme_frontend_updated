<template>
  <div @click="closeModal" class="dark-screen"></div>
</template>

<script>
export default {
  name: 'dark-screen',
  props: {},
  computed: {},
  methods: {
    closeModal() {
      this.$store.commit('closeModal');
    },
  },
};
</script>
