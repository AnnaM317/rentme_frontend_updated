import { userService } from '../services/user.service.js';

export const userStore = {
  state: {
    loggedInUser: userService.getLoggedInUser(),
    watchedUser: null,
    ownedStays: null,
    notifications: [],
    trips: [],
  },
  getters: {
    miniUser(state) {
      const _id = state.user._id;
      const fullname = state.user.fullname;
      const imgUrl = state.user.imgUrl;
      return {
        _id,
        fullname,
        imgUrl,
      };
    },
    loggedInUser(state) {
      return state.loggedInUser;
    },
    reviewsByUser(state) {
      return state.reviewsByUser;
    },
    watchedUser({ watchedUser }) {
      return watchedUser;
    },
    notification(state) {
      return state.notification;
    },
    trips(state) {
      return state.trips;
    },
  },
  mutations: {
    setLoggedInUser(state, { user }) {
      state.loggedInUser = user ? { ...user } : null;
    },
    setWatchedUser(state, { user }) {
      state.watchedUser = user;
    },
    setUsers(state, { users }) {
      state.users = users;
    },
    removeUser(state, { userId }) {
      state.users = state.users.filter((user) => user._id !== userId);
    },
    addNotification(state, notification) {},
    addTrip(state, { trip }) {
      state.trips.unshift(trip);
    },
  },
  actions: {
    async login({ commit }, { userCred }) {
      try {
        const user = await userService.login(userCred);
        commit({ type: 'setLoggedInUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in login', err);
        throw err;
      }
    },
    async signup({ commit }, { userCred }) {
      try {
        const user = await userService.signup(userCred);
        commit({ type: 'setLoggedInUser', user });
        return user;
      } catch (err) {
        console.log('userStore: Error in signup', err);
        throw err;
      }
    },
    async logout({ commit }) {
      try {
        await userService.logout();
        commit({ type: 'setLoggedInUser', user: null });
      } catch (err) {
        console.log('userStore: Error in logout', err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        await userService.update(user);
        commit({ type: 'setLoggedinUser', user });
      } catch (err) {
        console.log('userStore: Error updating user', err);
        throw err;
      }
    },

    async loadUsers({ commit }) {
      try {
        const users = await userService.getUsers();
        commit({ type: 'setUsers', users });
      } catch (err) {
        console.log('userStore: Error in loadUsers', err);
        throw err;
      }
    },
    async loadAndWatchUser({ commit }, { userId }) {
      try {
        const user = await userService.getById(userId);
        commit({ type: 'setWatchedUser', user });
      } catch (err) {
        console.log('userStore: Error in loadAndWatchUser', err);
        throw err;
      }
    },
    async removeUser({ commit }, { userId }) {
      try {
        await userService.remove(userId);
        commit({ type: 'removeUser', userId });
      } catch (err) {
        console.log('userStore: Error in removeUser', err);
        throw err;
      }
    },
    async updateUser({ commit }, { user }) {
      try {
        user = await userService.update(user);
        commit({ type: 'setUser', user });
      } catch (err) {
        console.log('userStore: Error in updateUser', err);
        throw err;
      }
    },
    async loadOwnedStays({ commit }, { hostId }) {
      try {
        dispatch({ type: 'setFilter', filterBy: hostId });
      } catch (err) {
        console.log('userStore: Error in loadOwnedStays', err);
        throw err;
      }
    },
  },
};
