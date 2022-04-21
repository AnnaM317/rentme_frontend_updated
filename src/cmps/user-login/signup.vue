<template>
  <section @click.stop class="login-signup">
    <div class="login-signup-header flex">
      <button class="close-btn" @click.stop="closeModal">✕</button>
      <h5>Sign up</h5>
    </div>
    <div class="user-inputs">
      <h3>Welcome to Rentme</h3>
      <form @submit.prevent="signup">
        <input
          ref="fullname"
          type="text"
          placeholder="Full name"
          v-model="userCred.fullname"
        />
        <input type="text" placeholder="Username" v-model="userCred.username" />
        <input type="email" placeholder="Email" v-model="userCred.email" />
        <input
          type="password"
          placeholder="Password"
          v-model="userCred.password"
        />
        <button
          class="special-hover-btn"
          @mousemove="changeBtnColor"
          ref="myBtn"
        >
          <span>Continue</span>
        </button>
      </form>
      <small>
        Already have an account?
        <button @click.stop="showLogin">Log in</button>
      </small>
    </div>
  </section>
</template>

<script>
import { showMsg } from '@/services/event-bus.service';
export default {
  name: 'signup',
  data() {
    return {
      userCred: {
        username: '',
        fullname: '',
        email: '',
        password: '',
      },
      msg: '',
      isLoading: false,
    };
  },
  created() {
    this.$nextTick(() => this.$refs.fullname.focus());
  },
  methods: {
    async signup() {
      try {
        this.isLoading = true;
        if (
          !this.userCred.email ||
          !this.userCred.fullname ||
          !this.userCred.password ||
          !this.userCred.username
        )
          return (this.msg = 'Please fill up the form');
        await this.$store.dispatch({ type: 'signup', userCred: this.userCred });
        this.closeModal();

        showMsg('Signed up successfully!');
      } catch (err) {
        showMsg('Sign up failed!', 'error');
      }
    },
    showLogin() {
      this.$emit('showLogin');
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
  },
};
</script>
