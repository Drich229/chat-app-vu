import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import auth from '@feathersjs/authentication-client';

const client = feathers(); 
// Établir la connexion WebSocket avec le serveur
const socket = io('http://localhost:3030', {
  transports: ['websocket'] // Utiliser les WebSockets
});

client.configure(socketio(socket));// Configurer le client pour utiliser Socket.io
client.configure(auth({
    storage: window.localStorage // Utiliser le stockage local pour stocker le token
  }));

export default client;