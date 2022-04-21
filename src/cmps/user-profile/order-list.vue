<template>
  <div class="order-list-cont">
    <h1>
      {{
        orders.length
          ? `${sectionName} requests`
          : `No ${sectionName.toLowerCase()} requests`
      }}
    </h1>
    <order-preview
      v-for="order in orders"
      :key="order._id"
      :order="order"
      @approveOrder="approveOrder"
    />
  </div>
</template>

<script>
import OrderPreview from './order-preview.vue';
export default {
  name: 'order-list',
  props: {
    orders: Array,
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
    approveOrder(order) {
      this.$emit('approveOrder', order);
    },
  },
  computed: {},
  components: { OrderPreview },
};
</script>
