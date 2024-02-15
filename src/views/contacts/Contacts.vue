<template>
    <div class="page-wrapper">
        <div class="side-bar">
                <div class="side-bar-container">

                    <div class="menu-1">
                        <div class="avatar-container">
                            <img src="/img/images/avatar-svgrepo-com.svg" class="avatar-icon" alt="">
                        </div>
                        <div class="menu-1_link-container">
                            <a href="#" class="menu-1_link"><img src="/img/images/two_men.svg" alt="two men icon"></a>
                            <a href="#" class="menu-1_link"><img src="/img/images/message-icon.svg" alt="message icon"></a>
                            <a href="#" class="menu-1_link selected-link"><img src="/img/images/one-man.svg" alt="one man icon"></a>
                        </div>
                    </div>
                    <div class="menu-2">
                        <a href="" class="menu-2_link"><img src="/img/images/bin-icon.svg" alt=""></a>
                        <a href="" class="menu-2_link"><img src="/img/images/help-icon.svg" alt=""></a>
                        <a href="" class="menu-2_link"><img src="/img/images/setting-icon.svg" alt=""></a>
                    </div>

                </div>
        </div>
        <div class="main">
            <div class="main-title">
                <p class="main-title_p">Contacts</p>
                <img src="/img/images/bell-icon.svg" alt="icon notification" class="main-bell">
            </div>
            <div class="main-search_section">
                <input type="search" name="search" id="search" placeholder="Search">
                <label for="search"><img src="/img/images/search-icon.svg" alt="search icon"></label>
            </div>
            <div class="main-contact_list">
                <div class="contact_list-title">
                  <select class="form-select" v-model="selectedOption" @change="updateContactList">
                      <option value = "all">Tous les contacts</option>
                       <option value="requests">Mes demandes de contact</option>
                  </select>
                </div>
        <div class="contact_list">
            <div v-for="user in usersToShow" :key="user.id" class="contact_list-item">
                <div class="contact_list-item_infos">
                <div class="contact_list-item_avatar"></div>
                <p class="contact_list-item_name">{{ user.firstname }}</p>
                </div>
                <button class="btn-custom" v-if="!user.requestSent" @click="openModal(user)">Envoyer demande</button>
            </div>
        
         </div>
    </div>
    <div id="invitations-section" class="main-invitations_section">
                <div class="invitations_section-title">
                    <p class="invitations_section-title_p">Invitations de contact</p>
                    <img src="/img/images/arrow-down.svg" alt="" class="invitations_section-title_icon">
                </div>
                <div class="invitations_list">
                    <!-- Invitation Item 1 -->
                    <div class="invitations_list-item">
                        <div class="invitations_list-item_avatar"></div>
                        <p class="invitations_list-item_name">Nom du Contact 1</p>
                        <div class="invitations_list-item_actions">
                            <button class="invitation_accept"><img src="/img/images/check-icon.svg" alt="Accepter"></button>
                            <button class="invitation_decline"><img src="/img/images/cross-icon.svg" alt="Refuser"></button>
                        </div>
                    </div>
                  </div>
    </div>
</div>
<div class="right">
            <div class="right-container">
                <img src="/img/images/Message sent.svg" alt="image principale">
                <p class="right-title">
                    GlowChat
                </p>
                <p class="right-text">
                    Lorem ipsum dolor sit amet. Eos similique alias est voluptas galisum in eligendi
                </p>
            </div>
        </div>
  </div>
  <div v-if="showModal" class="modal">
                <div class="modal-content">
                <span class="close" @click="closeModal">&times;</span>
                <img src="/img/images/contact-add.svg" alt="">
                <p>Voulez-vous vraiment ajouter ce contact ?</p>
                <div class="button-wrapper">
                    <button @click="sendContactRequest" class="modal-button button-1">Oui</button>
                    <button @click="showModal = false" class="modal-button button-2">Non</button>
                </div>
                </div>
        </div>

      <div v-if="error">{{ error }}</div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedOption: 'all',
      showModal: false,
      selectedUser: null,
      error: null,
    };
  },
  computed: {
    usersToShow() {
      if (this.selectedOption === 'all') {
        return this.users;
      } else {
        return this.users.filter(user => user.status === 'PENDING');
      }
    },
  },
  methods: {
    async fetchUsers() {
        try {
    const response = await this.$http.get('/users');
    console.log(response.data); // Pour déboguer et voir la structure de la réponse
    if (response.data && Array.isArray(response.data.data)) { // Vérifiez si response.data.data est un tableau
      this.users = response.data.data.map(user => ({
        ...user,
        isFriend: user.status === 'VALIDATED',
        requestSent: user.status === 'PENDING'
      }));
    } else {
      console.error('Expected an array but got:', response.data);
      // Gérez le cas où response.data.data n'est pas un tableau
    }
  } catch (error) {
    console.error('An error occurred while fetching contacts:', error);
    this.error = error.message; // Stockez le message d'erreur pour l'afficher dans le template
  }
    },

    closeModal() {
    this.showModal = false;
    this.selectedUser = null; // Réinitialiser l'utilisateur sélectionné si nécessaire
  },

    openModal(user) {
      this.selectedUser = user;
      this.showModal = true;
    },

   async sendContactRequest() {
  // Logique pour envoyer une demande de contact à un non-ami
  if (!this.selectedContact) return; // Assurez-vous qu'un contact est sélectionné
  console.log('Sending contact request to:', this.selectedUser.firstname);
  try {
    // Remplacez 'your-api-endpoint' par l'URL réelle de votre API
    const response = await this.$http.post(`/contacts/${this.selectedUser.id}`);
    if (response.status === 200) {
      // Mettez à jour le statut de la demande pour ce contact
      this.selectedUser.requestSent = true;
      this.closeModal(); // Fermez la modale après l'envoi de la demande
    }
  } catch (error) {
    console.error('An error occurred while sending contact request:', error);
    // Gérez l'erreur comme vous le jugez approprié
  }
},
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<style>
  :root {

--font : 'Lato', sans-serif;

--primary-color : #329993;
--secondary-color : #758A88;
--ternary-color : #EEF1F1;

}

* {
margin: 0;
padding: 0;
box-sizing: border-box;
}

p {
margin: 0;
}

body {
font-size: 1rem;
font-family: var(--font);
position: relative;
}

a {
text-decoration: none;
display: inline-block;
}

.container {
margin: 0 auto;
max-width: 80rem;
width: 100%;
}

.padding-global {
padding: 0 2.5rem;
}

.padding-global-mobile {
padding: 0 1.25rem;
}

.padding-section-small {
padding: 1rem 0;
}

.padding-section-medium {
padding: 2rem 0;
}

.padding-section-large {
padding: 3rem 0;
}

div.page-wrapper {
width: 100vw;
height: 100vh;
display: grid;
grid-template-columns: 0.25fr 1fr 2fr;
}

div.side-bar-container {
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding: 1rem 0;
height: 100%;
border-right: solid 1px var(--secondary-color) ;
}

.avatar-container {
margin-bottom: 2.5rem;
}

.avatar-icon {
width: 4rem;
height: 4rem;
}

.menu-1_link-container, .menu-2 {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
}

.selected-link {
background-color: #26736e3a;
border-radius: 100%;
padding: 1rem;
display: flex;
align-items: center;
justify-content: center;
border-radius: 100%;
}

.main {
overflow: hidden;
}

.menu-2 {
gap: 1.5rem;
}

.main-title {
display: flex;
justify-content: space-between;
padding: 1rem 2rem;
align-items: center;
}

.main-title_p {
font-size: 2rem;
font-weight: 700;
}

.main-search_section {
display: flex;
gap: 1rem;
margin: 0 auto;
max-width: 60%;
justify-content: space-between;
padding: 1rem;
border: solid 1px white;
border-radius: 15px;
box-shadow: 8px 5px 10px rgba(0, 0, 0, 0.275);
margin-bottom: 2rem;
}

input[type="search"] {
border: none;
outline: none;
}

.contact_list {
max-height: calc(100vh - 162px);
overflow-y: auto;
}

.contact_list-item_add_icon {
cursor: pointer;
}


.contact_list-title {
display: flex;
align-items: center;
gap: 1rem;
padding-left: 2rem;
}

.contact_list-title_p {
font-weight: 700;
}

.contact_list-item {
display: flex;
align-items: center;
justify-content: space-between;
padding: 1rem 2rem;
border-bottom: solid 1px rgba(128, 128, 128, 0.425);
}

.contact_list-item_infos {
display: flex;
gap: 1rem;
align-items: center;
}

.contact_list-item_avatar {
width: 3rem;
height: 3rem;
border-radius: 100%;
background-color: var(--secondary-color);
}


.contact_list::-webkit-scrollbar {
width: 5px; 
}

.contact_list::-webkit-scrollbar-track {
background: #f1f1f1; 
}


.contact_list::-webkit-scrollbar-thumb {
background: #888;
}

.contact_list::-webkit-scrollbar-thumb:hover {
background: #555;
}

.right {
display: flex;
justify-content: center;
align-items: center;
background-color: var(--ternary-color);
}

.right-container {
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
gap: 1rem;
}

.right-title {
font-size: 2rem;
font-weight: 900;
}

.right-text {
text-align: center;
}

.unadd {
filter: grayscale(100%);
}

.modal {
display: block;
position: fixed; 
z-index: 1; 
left: 0;
top: 0;
width: 100%; 
height: 100%; 
overflow: auto; 
background-color: rgb(0,0,0); 
background-color: rgba(0,0,0,0.4); 
}

.modal-content {
background-color: #fefefe;
margin: 15% auto; 
padding: 20px;
border: 1px solid #888;
width: 30%; 
display: flex;
flex-direction: column;
gap: 1rem;
justify-content: center;
align-items: center;
}

.button-wrapper {
display: flex;
justify-content: space-evenly;
width: 100%;
}

.modal-button {
border: none;
padding: 0.5rem 1rem;
border-radius: 20px;
cursor: pointer;
color: white;
}

.button-1 {
background-color: var(--primary-color);

}

.button-2 {
background-color: rgb(192, 36, 36);
}

.btn-custom {
  background-color: #083e4a; /* Vert foncé */
  color: white; /* Texte blanc */
  border: none; /* Pas de bordure */
  padding: 10px 20px; /* Padding intérieur */
  text-align: center; /* Alignement du texte */
  text-decoration: none; /* Pas de soulignement du texte */
  display: inline-block; /* Type d'affichage */
  font-size: 16px; /* Taille de la police */
  border-radius: 10px; /* Bords arrondis (25px pour un arrondi prononcé) */
  cursor: pointer; /* Curseur en forme de main au survol */
}

.btn-custom:hover {
  background-color: #004d00; /* Vert foncé plus intense au survol */
}


.close {
color: #aaa;
float: right;
font-size: 28px;
font-weight: bold;
}

.close:hover,
.close:focus {
color: black;
text-decoration: none;
cursor: pointer;
}


@media screen and (max-width : 1025px) {
.main-search_section{
    width: 70%;
}

input[type="search"] {
    width: 50%;
}

.modal-content {
    width: 50%;
}
}

@media screen and (max-width : 769px) {
.avatar-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar-icon {
    width: 3rem;
    height: 3rem;
}

.selected-link {
    padding: 0.5rem;
}

.contact_list-item {
    padding: 1rem 1rem;
}

.main-search_section {
    width: 90%;
    padding: 0.5rem;
}

.main-title_p {
    font-size: 1.5rem;
}

.right-container {
    padding: 0 1rem;
}
}

</style>