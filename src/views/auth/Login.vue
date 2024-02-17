<template>
  <div>
    <input v-model="email" type="email" placeholder="Email">
    <input v-model="password" type="password" placeholder="Password">
    <button @click="login">Login</button>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import client from '@/feathers-client';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null
    };
  },
  methods: {
    login() {
      client.authenticate({
        strategy: 'local',
        email: this.email,
        password: this.password
      })
      .then(response => { 
          const userId = response.user._id;

        localStorage.setItem('userId', userId);

        this.$router.push({ name: 'contacts' }); // Redirige vers la liste des contacts
      })
  .catch(error => {
this.error = error.message;
});
    }
  }
};
</script>