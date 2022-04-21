import { stayService } from '../services/stay.service.js';

export const stayStore = {
  strict: true,
  state: {
    stays: [],
    hostStays: [],
    filterBy: stayService.getInitialFilterBy(),
    currStay: null,
    isLoading: false,
  },
  getters: {
    filterBy(state) {
      return state.filterBy;
    },
    staysToShow(state) {
      return state.stays;
    },
    avgPrice(state) {
      return state.stays.reduce((acc, stay) => {
        (acc + stay.price) / state.stays.length;
      });
    },
    imgsToShow(state) {
      return state.currStay.imgUrls.slice(0, 5);
    },
    hostStays(state) {
      return state.hostStays;
    },
    isLoading({ isLoading }) {
      return isLoading;
    },
  },
  mutations: {
    setLoading(state, { isLoading }) {
      state.isLoading = isLoading;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = Object.assign(state.filterBy, filterBy);
    },
    setStays(state, { stays }) {
      state.stays = stays;
    },
    setStay(state, { stay }) {
      state.currStay = stay;
    },
    addStay(state, { stay }) {
      state.stays.push(stay);
    },
    removeStay(state, { stayId }) {
      const idx = state.stays.findIndex((stay) => stay._id === stayId);
      state.stays.splice(idx, 1);
    },
    updateStay(state, { stay }) {
      const idx = state.stays.findIndex((stay1) => stay1._id === stay._id);

      state.stays.splice(idx, 1, stay);
    },
    clearAllFilters(state) {
      state.filterBy = stayService.getInitialFilterBy();
    },
    setHostStays(state, { hostStays }) {
      state.hostStays = hostStays;
    },
    addReview(state, { stay, review }) {
      const idx = state.stays.findIndex((s) => s._id === stay._id);
      state.stays[idx].reviews.unshift(review);
      state.stays.splice(idx, 1, state.stays[idx]);
    },
  },
  actions: {
    async loadStays({ commit, state }) {
      commit({ type: 'setLoading', isLoading: true });
      try {
        const stays = await stayService.query(state.filterBy);
        commit({ type: 'setStays', stays });
      } catch (err) {
        console.log('stayStore: Error in loadStays', err);
        throw err;
      } finally {
        commit({ type: 'setLoading', isLoading: false });
      }
    },
    async loadHostStays({ commit }, { hostId }) {
      try {
        const hostStays = await stayService.getHostStays(hostId);
        commit({ type: 'setHostStays', hostStays });
      } catch (err) {
        console.log('stayStore: Error in loadHostStays', err);
      }
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadStays' });
    },
    async getStayById({ commit }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);
        commit({ type: 'setStay', stay });
        return stay;
      } catch (err) {
        console.log('stayStore: Error in get stay', err);
        throw err;
      }
    },
    getEmptyStay() {
      return stayService.getEmptyStay();
    },
    async toggleLikedStay({ commit, rootGetters }, { stayId }) {
      try {
        const stay = await stayService.getById(stayId);

        const idxLikedBy = stay.likedByUsers.findIndex(
          (userId) => userId === rootGetters.loggedInUser._id
        );
        if (idxLikedBy < 0)
          stay.likedByUsers.push(rootGetters.loggedInUser._id);
        else stay.likedByUsers.splice(idxLikedBy, 1);
        const updatedStay = await stayService.save(stay);

        commit({ type: 'updateStay', stay: updatedStay });
      } catch (err) {
        console.log('stay Store: Error in toggling wishList', err);
        throw err;
      }
    },
    async addReview({ commit }, { stay, review }) {
      try {
        commit({ type: 'addReview', stay, review });
        stay.reviews.unshift(review);
        const savedStay = await stayService.save(stay);
        commit({ type: 'updateStay', stay: savedStay });
        return savedStay;
      } catch (err) {
        console.log('Adding Error (Store):', err);
        throw err;
      }
    },
    async saveStay({ commit }, { stay }) {
      try {
        const type = stay._id ? 'updateStay' : 'addStay';
        const savedStay = await stayService.save(stay);
        commit({ type, stay: savedStay });
        return savedStay;
      } catch (err) {
        console.log('err in saving stay-store', err);
        throw err;
      }
    },
    async removeStay({ commit }, stayId) {
      try {
        const msg = await stayService.remove(stayId);
        commit({ type: 'removeStay', stayId });
      } catch (err) {
        console.log('err in removing stay-store', err);
        throw err;
      }
    },
  },
};
