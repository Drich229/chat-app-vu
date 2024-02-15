// src/socket.js
import io from 'socket.io-client';

// Connectez-vous à l'URL de votre serveur Feather.js
const socket = io('http://localhost:3000');

export default socket;
