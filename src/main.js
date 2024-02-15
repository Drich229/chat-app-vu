import { createApp } from 'vue';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import { createMetaManager } from 'vue-meta';

// Configuration par défaut d'Axios
Axios.defaults.baseURL = 'http://localhost:3030';

// Ajouter un intercepteur de requête pour insérer l'en-tête Authorization
Axios.interceptors.request.use(function (config) {
  // Récupérer le jeton du localStorage ou d'une autre source de stockage
  const token = localStorage.getItem('feathers-jwt');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, function (error) {
  // Faire quelque chose avec l'erreur de requête
  return Promise.reject(error);
});

// Créez une instance de l'application Vue
const app = createApp(App);

// Rendre Axios disponible dans toutes les composantes via this.$http
// En Vue 3, vous devez utiliser app.config.globalProperties pour ajouter des propriétés globales
app.config.globalProperties.$http = Axios;

// Utilisez le routeur avec l'application
app.use(router);

const metaManager = createMetaManager();

// Utilisez metaManager dans votre application
app.use(metaManager);

// Montez l'application
app.mount('#app');
