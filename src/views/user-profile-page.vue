<template>
  <section
    v-if="loggedInUser"
    class="user-page-container main-container flex column"
  >
    <nav class="user-profile-nav flex">
      <ul class="nav_profile clean-list flex">
        <li
          class="nav_user"
          :class="currSection === 'My Listings' ? 'active' : ''"
          @click="showSection('My Listings')"
        >
          My Listings
        </li>
        <li
          class="nav_user"
          :class="currSection === 'Hosted Stays' ? 'active' : ''"
          @click="showSection('Hosted Stays')"
        >
          Hosted Stays
        </li>
        <li
          class="nav_user"
          :class="currSection === 'My Trips' ? 'active' : ''"
          @click="showSection('My Trips')"
        >
          My Trips
        </li>
        <router-link to="/stay/edit">
          <li class="nav">Add Listing</li>
        </router-link>
      </ul>
    </nav>
    <hr />
    <!-- ### My Listings SECTION ### ####################################-->
    <div class="user-page-content flex space-between">
      <section v-show="currSection === 'My Listings'" class="user-section-cont">
        <template v-if="loggedInUser.isHost">
          <order-list
            @approveOrder="approveOrder"
            :orders="pendingListings"
            :sectionName="'Pending'"
          />
          <!-- <hr /> -->
          <order-list :orders="approvedListings" :sectionName="'Approved'" />
        </template>
        <div class="try-hosting" v-else>
          <try-hosting />
        </div>
      </section>
      <!-- ### HOSTED STAYS SECTION ### ####################################-->
      <section
        v-show="currSection === 'Hosted Stays'"
        class="user-section-cont"
      >
        <div v-if="loggedInUser.isHost">
          <hosted-stays-list
            :stays="hostedStays"
            :sectionName="'Hosted stays'"
          />
        </div>
        <div class="try-hosting" v-else>
          <try-hosting />
        </div>
      </section>
      <!-- ### My Trips SECTION ### ####################################-->
      <section v-show="currSection === 'My Trips'" class="user-section-cont">
        <trips-page :ordersFromParent="ordersToShow" />
      </section>
      <section
        v-if="loggedInUser.isHost && currSection !== 'My Trips'"
        class="hosting-summary"
      >
        <div>
          <h1>Hosting summary</h1>
          <h4>Fantastic job!</h4>
          <span>Guests love what you're doing.</span>
          <span>Keep up the great work!</span>
        </div>
        <font-awesome-icon :icon="['far', 'check-circle']" />
      </section>
    </div>
  </section>
</template>

<script>
import HostedStaysList from '../cmps/user-profile/hosted-stays-list.vue';
import OrderList from '../cmps/user-profile/order-list.vue';
import TryHosting from '../cmps/user-profile/try-hosting.vue';
import TripsPage from './trips-page.vue';
import { utilService } from '../services/util.service';
export default {
  name: 'user-profile',
  data() {
    return {
      loggedInUser: null,
      currSection: 'My Listings',
      onUserProfile: true,
    };
  },
  created() {
    this.loadUser();
    if (this.loggedInUser.isHost) {
      this.loadOrders('host');
      this.loadHostStays();
    }
  },
  destroy() {
    this.$store.commit({ type: 'clearAllFilters' });
  },
  methods: {
    async loadUser() {
      this.loggedInUser = this.$store.getters.loggedInUser;
    },

    async loadOrders(userType) {
      const user = {
        userId: this.loggedInUser._id,
        userType,
      };
      await this.$store.dispatch({ type: 'loadOrders', user });
    },

    async loadHostStays() {
      if (!this.loggedInUser.isHost) return;
      await this.$store.dispatch({
        type: 'loadHostStays',
        hostId: this.loggedInUser._id,
      });
    },

    showSection(section) {
      const userType = section === 'My Listings' ? 'host' : 'user';

      this.loadOrders(userType);
      this.currSection = section;
    },

    handleAction({ action, order }) {
      if (action === 'Approve') {
        this.approveOrder(order);
      } else if (action === 'Cancel') {
        this.cancelOrder(order._id);
      } else {
        return;
      }
    },

    approveOrder(orderToUpdate) {
      if (!this.loggedInUser.isHost) return;
      const order = JSON.parse(JSON.stringify(orderToUpdate));
      order.status = 'approved';
      this.$store.dispatch({ type: 'updateOrder', order });
    },
    filterAndSortOrders(orders, filterBy) {
      const filteredOrders = orders.filter((order) => {
        return (
          order.buyer._id !== this.loggedInUser._id && order.status === filterBy
        );
      });
      return utilService.sortByDate(filteredOrders);
    },
  },

  computed: {
    ordersToShow() {
      return this.$store.getters.ordersToShow;
    },

    pendingListings() {
      const allOrders = this.$store.getters.ordersToShow;
      return this.filterAndSortOrders(allOrders, 'pending');
    },

    approvedListings() {
      const allOrders = this.$store.getters.ordersToShow;
      return this.filterAndSortOrders(allOrders, 'approved');
    },

    hostedStays() {
      if (!this.loggedInUser.isHost) return [];
      return this.$store.getters.hostStays;
    },
  },

  mounted() {
    window.scrollTo(0, 0);
  },

  components: {
    OrderList,
    HostedStaysList,
    TryHosting,
    TripsPage,
  },
};
</script>
