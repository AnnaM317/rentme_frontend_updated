<template>
  <section class="order-preview">
    <span class="img-container">
      <img :src="order.buyer.imgUrl" alt="" />
    </span>
    <div class="info flex column">
      <span v-if="order.status === 'pending'">Request</span>
      <h3 :class="order.status === 'pending' ? 'orange' : ''">
        {{ order.buyer.fullname }}
      </h3>
      <div>
        <span>{{ numOfGuests }}</span>
        <div>
          {{ formateDate(order.dates.checkInDate) }} -
          {{ formateDate(order.dates.checkOutDate) }}
        </div>

        <p>{{ order.stay.name }}</p>
      </div>
    </div>
    <div class="btn-container flex columns">
      <button
        class="simple-btn grey"
        @click="onApproveOrder()"
        v-if="order.status === 'pending'"
      >
        Approve
      </button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'order-preview',
  props: { order: Object },
  data() {
    return {};
  },
  created() {},
  methods: {
    onApproveOrder() {
      this.$emit('approveOrder', this.order);
    },
    formateDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  computed: {
    numOfGuests() {
      const num = this.order.totalGuests;
      return num > 1 ? num + ' Guests' : num + ' Guest';
    },
  },
  components: {},
};
</script>
