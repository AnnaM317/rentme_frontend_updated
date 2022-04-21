<template>
  <section v-if="order.stay.imgUrls" class="trip-preview flex column">
    <div class="imgs-container">
      <img v-for="(img, idx) in order.stay.imgUrls" :src="img" :key="idx" />
    </div>

    <section class="info">
      <div>
        <strong>{{ order.stay.name }}</strong>
        <span>{{ formateDate(order.dates.checkInDate) }}</span>
      </div>
      <div>
        <span>${{ formattedPrice }}</span>
        <span>{{ formateDate(order.dates.checkOutDate) }}</span>
      </div>
      <div>
        <span :class="status">{{ capitalCharStatus }}</span>
        <span @click="cancelOrder(order._id)" class="btn">Cancel order</span>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'trip-preview',
  props: { order: Object },
  data() {
    return {};
  },
  created() {},
  methods: {
    cancelOrder(orderId) {
      this.$emit('cancelOrder', orderId);
    },
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  computed: {
    capitalCharStatus() {
      const status = this.order.status;
      return status.charAt(0).toUpperCase() + status.slice(1);
    },
    formattedPrice() {
      const price = this.order.totalPrice;
      return price.toLocaleString();
    },
    status() {
      if (this.order.status === 'pending') return 'pending';
      if (this.order.status === 'approved') return 'approved';
    },
  },
  components: {},
};
</script>
