<template>
  <section class="trips-page main-container">
    <h1>Trips</h1>
    <section v-if="!loggedInUser">
      <h2>Log in to view your Trips</h2>
      <p>You can create, view, or cancel trips</p>
      <button @click="showLogin" class="simple-btn pink">Log in</button>
    </section>
    <section class="flex column" v-else-if="!ordersToShow.length">
      <h2>No trips booked...yet!</h2>
      <p>Time to dust off your bags and start planning your next adventure</p>
      <router-link class="simple-btn pink" to="/explore">
        Start searching
      </router-link>
    </section>
    <section v-else>
      <ul class="clean-list flex">
        <li :class="{ active: showUpcoming }">Upcoming</li>
        <li :class="{ active: showPast }">Past</li>
      </ul>
      <section class="trip-list-container">
        <trip-preview
          @cancelOrder="confirmCancellation"
          v-for="(order, idx) in ordersToShow"
          :order="order"
          :key="order._id"
        />
      </section>
    </section>
    <confirm-modal
      :message="'Cancel order?'"
      @confirm="cancelOrder"
      @closeModal="closeConfirmModal"
      :shouldShow="showConfirmModal"
    />
  </section>
</template>

<script>
import tripPreview from '../cmps/trip-preview.vue';
import confirmModal from '../cmps/confirm-modal.vue';
import { utilService } from '../services/util.service';

export default {
  name: 'trips-page',
  props: { ordersFromParent: Array },
  data() {
    return {
      trips: [],
      showUpcoming: true,
      showPast: false,
      stay: null,
      showConfirmModal: false,
      orderIdToCancel: '',
      onTripsPage: true,
    };
  },
  watch: {
    loggedInUser: {
      handler() {
        if (this.$route.name === 'trips') {
          this.loadOrders();
        } else return;
      },
      immediate: true,
    },
  },
  async created() {
    if (!this.ordersFromParent) this.loadOrders();
  },
  methods: {
    async loadOrders() {
      if (!this.loggedInUser) return;
      const user = {
        userId: this.loggedInUser._id,
        userType: 'user',
      };
      await this.$store.dispatch({ type: 'loadOrders', user });
    },
    showLogin() {
      this.$store.commit('toggleLoginModal');
    },
    confirmCancellation(orderId) {
      this.orderIdToCancel = orderId;
      this.showConfirmModal = true;
    },

    closeConfirmModal() {
      this.showConfirmModal = false;
    },

    cancelOrder() {
      this.showConfirmModal = false;
      this.$store.dispatch({
        type: 'removeOrder',
        orderId: this.orderIdToCancel,
      });
      const orderId = this.orderIdToCancel;
      const tripIdx = this.trips.findIndex((trip) => {
        return trip.orderId === orderId;
      });
      if (tripIdx > -1) {
        this.trips.splice(tripIdx, 1);
      }
      this.orderIdToCancel = '';
    },

    upperCaseFirstChar(str) {
      if (typeof str === 'string') {
        return str[0].toUpperCase() + str.substring(1);
      } else {
        return str;
      }
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    tripsToShow() {
      return this.trips;
    },
    ordersToShow() {
      const allOrders = JSON.parse(
        JSON.stringify(this.$store.getters.ordersToShow)
      );
      const orders = allOrders.filter(
        (order) => order.hostId !== this.loggedInUser._id
      );
      return utilService.sortByDate(orders);
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  components: {
    tripPreview,
    confirmModal,
  },
};
</script>
