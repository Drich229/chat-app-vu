<template>
    <div>
      <h2>Inscription</h2>
      <input v-model="firstname" type="text" placeholder="Firstname">
      <input v-model="lastname" type="text" placeholder="Lastname">
      <input v-model="email" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Mot de passe">
      <button @click="signup">S'inscrire</button>
      <div v-if="error">{{ error }}</div>
    </div>
  </template>

  <script>
  import client from '@/feathers-client';
  
  export default {
    data() {
      return {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        error: null
      };
    },
    methods: {
      signup() {
        client.service('users').create({
          firstname: this.firstname,
          lastname: this.lastname,
          email: this.email,
          password: this.password
        })
        .then(() => {
          // Après une inscription réussie, vous pouvez soit connecter l'utilisateur directement,
          // soit le rediriger vers la page de connexion pour qu'il se connecte manuellement.
          this.$router.push({ name: 'login' });
        })
        .catch(error => {
          this.error = error.message;
        });
      }
    }
  };
  </script>