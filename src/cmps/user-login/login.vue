<template>
  <section class="login-signup" @click.stop>
    <div class="login-signup-header flex">
      <button class="close-btn" @click="closeModal">✕</button>
      <h5>Log in</h5>
    </div>
    <div class="user-inputs">
      <h3>Welcome to Rentme</h3>
      <form action="" @submit.prevent="login">
        <input
          ref="username"
          type="text"
          placeholder="Username"
          v-model="userCred.username"
        />
        <input
          type="password"
          placeholder="Password"
          v-model="userCred.password"
        />
        <button class="special-hover-btn" @mousemove="changeBtnColor">
          <span>Continue</span>
        </button>
      </form>
      <small
        >Don't have an account?
        <button @click.stop="showSignup">Sign up</button>
        <span><br />or Log in as</span>
        <button @click.stop="connectDemoUser">Demo-User</button>
      </small>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service.js';
export default {
  name: 'login',
  data() {
    return {
      userCred: {
        username: '',
        password: '',
      },
      msg: '',
      isLoading: false,
    };
  },
  created() {
    this.$nextTick(() => this.$refs.username.focus());
  },
  methods: {
    async login() {
      try {
        if (!this.userCred.username || !this.userCred.password)
          return (this.msg = 'Please enter username/password');
        await this.$store.dispatch({ type: 'login', userCred: this.userCred });
        // if (this.$route.name === 'BecomeHost') this.$router.push('/stay/edit');
        // else if (this.$route.name !== 'Home') this.$router.push('/');
        this.$store.commit('closeModal');
        showMsg('Logged in successfully');
        this.userCred = {};
      } catch (err) {
        showMsg('Logged in failed', 'error');
        console.log('err', err);
      }
    },
    showSignup() {
      this.$emit('showSignup');
    },
    closeModal() {
      this.$store.commit('closeModal');
    },
    changeBtnColor(e) {
      const x = e.offsetX - e.target.offsetLeft;
      const y = e.offsetY - e.target.offsetLeft;
      e.target.style.setProperty('--x', `${x}px`);
      e.target.style.setProperty('--y', `${y}px`);
    },
    async connectDemoUser() {
      this.userCred.username = '***';
      // this.userCred.password = '123';
      this.userCred.password = '***';
      await this.$store.dispatch({ type: 'login', userCred: this.userCred });
      this.$store.commit('closeModal');
    },
  },

  computed: {},
};
</script>
