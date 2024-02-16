<template>
  <div class="page-wrapper">
      <div class="side-bar">
              <div class="side-bar-container">

                  <div class="menu-1">
                      <div class="avatar-container">
                          <img src="/img/images/avatar-svgrepo-com.svg" class="avatar-icon" alt="">
                      </div>
                      <div class="menu-1_link-container">
                        <a href="#" @click="activeMenu1" class="menu-1_link" :class = "{ selectedLink: selectedLink1 }"><img src="/img/images/invitations-list-icon.svg" alt="invitation list icon"></a>
                          <a href="#" class="menu-1_link"><img src="/img/images/two_men.svg" alt="two men icon"></a>
                          <a href="#"  @click="activeMenu2" :class = "{ selectedLink: selectedLink2 }" class="menu-1_link { selected-link: selectedLink2 }"><img src="/img/images/message-icon.svg" alt="message icon"></a>
                          <a href="#" :class = "{ selectedLink: selectedLink3 }" class="menu-1_link" @click="activeMenu3"><img src="/img/images/one-man.svg" alt="one man icon"></a>
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
          <div v-if="selectedLink3">
          <div class="main-contact_list">
              <div class="contact_list-title">
                <select class="form-select" v-model="selectedOption">
                    <option value = "all">Tous les contacts</option>
                     <option value="requests_validated">Mes contacts</option>
                </select>
              </div>
      <div class="contact_list" v-if="allcontacts">
          <div v-for="user in allUsers" :key="user._id" class="contact_list-item">
            <!--<div v-if="!usersSendMeRequestId.includes(user._id) && !usersValidatedId.includes(user_id)">-->
              <div class="contact_list-item_infos">
              <div class="contact_list-item_avatar"></div>
              <p class="contact_list-item_name">{{ user.firstname }} {{ user.lastname }}</p>
              </div>
              <img v-if="!sentInvitations.includes(user._id)" @click="openModal(user)" src="/img/images/plus-icon.svg" alt="plus icon" class="contact_list-item_add_icon unadd">
              <span v-else>Invitation envoyée</span>
            <!--</div>-->
          </div>
       </div>

       <div class="contact_list" v-if="mycontacts">
          <div v-for="requestValidated in requestsValidated" :key="requestValidated._id" class="contact_list-item">
            <!--<div v-if="!usersSendMeRequestId.includes(user._id) && !usersValidatedId.includes(user_id)">-->
              <div class="contact_list-item_infos">
              <div class="contact_list-item_avatar"></div>
              <p class="contact_list-item_name">{{ requestValidated.user1.firstname }} {{ requestValidated.user1.lastname }}</p>
              </div>
              <button>Démarrer discussion</button>
            <!--</div>-->
          </div>
       </div>
       </div>
  </div>
  <div v-if="selectedLink1">
  <div class="main-invitations_section">
                <div class="invitations_section-title">
                    <p class="invitations_section-title_p">Invitations de contact</p>
                    <img src="/img/images/arrow-down.svg" alt="" class="invitations_section-title_icon">
                </div>
                <div class="invitations_list">
                    <div v-for="request in requests" :key="request._id" class="invitations_list-item">
                     
                        <div class="invitations_list-item_avatar"></div>
                        <p class="invitations_list-item_name">{{ request.user1.firstname }} {{ request.user1.lastname }}</p>
                        <div class="invitations_list-item_actions">
                            <button class="invitation_accept" @click="openAcceptModal(request)"><img src="/img/images/check-icon.svg" alt="Accepter"></button>
                            <button class="invitation_decline"><img src="/img/images/cross-icon.svg" alt="Refuser"></button>
                        </div>
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

      <div v-if="showAcceptModal" class="modal">
              <div class="modal-content">
              <span class="close" @click="closeAcceptModal">&times;</span>
              <img src="/img/images/contact-add.svg" alt="">
              <p>Voulez-vous vraiment accepter cette invitation ?</p>
              <div class="button-wrapper">
                  <button @click="acceptInvitation" class="modal-button button-1">Oui</button>
                  <button @click="showAcceptModal = false" class="modal-button button-2">Non</button>
              </div>
              </div>
      </div>

      <div v-if="showDeclinedModal" class="modal">
              <div class="modal-content">
              <span class="close" @click="closeDeclinedModal">&times;</span>
              <img src="/img/images/contact-add.svg" alt="">
              <p>Voulez-vous vraiment rejeter cette invitation ?</p>
              <div class="button-wrapper">
                  <button @click="declinedInvitation" class="modal-button button-1">Oui</button>
                  <button @click="showDeclinedModal = false" class="modal-button button-2">Non</button>
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
    allUsers: [],
    requests: [],
    authUserId: 'null',
    selectedOption: 'null',
    showModal: false,
    showAcceptModal: false,
    showDeclinedModal: false,
    selectedUser: null,
    selectedRequest: null,
    error: null,
    selectedLink1: false,
    selectedLink2: false,
    sentInvitations: [],
    requestsValidated: [],
    requestsDeclined: [],
    usersValidated: [],
    usersValidatedId: [],
    usersDeclined: [],
    requestsSent: [],
    usersRefused: [],
    usersSendMeRequestId: [],
    validatedUsers: [],
    validatedUserIds: [],
    selectedLink3: true,
    allcontacts: true,
    mycontacts: false
  };
},

watch: {
    selectedOption(newValue) {
      if (newValue === 'all') {
        this.allcontacts = true;
        this.mycontacts = false;
      }
      else{
        this.allcontacts = false;
        this.mycontacts = true;
      }
      // Vous pouvez également gérer d'autres valeurs ici si nécessaire
    }
  },
methods: {
async listRequestsValidated() {
  this.authUserId = localStorage.getItem('userId');
try {
  const params = {
      status: 'VALIDATED',
      user2Id: this.authUserId
    };
  const response = await this.$http.get('/contacts', { params });
  this.requestsValidated = response.data.data;
  /*for (const requestValidated of this.requestsValidated) {
    this.usersValidated.push(requestValidated.user1);
    this.usersValidatedId.push(requestValidated.user1Id);
  }*/
  console.log(this.requestsValidated);
} catch (error) {
    console.error(error);
  }
},

async listRequestsDeclined() {
  this.authUserId = localStorage.getItem('userId');
try {
  const params = {
      status: 'DECLINED',
      user2Id: this.authUserId
    };
  const response = await this.$http.get('/contacts', { params });
  this.requestsDeclined = response.data.data;
  /*for (const requestValidated of this.requestsValidated) {
    this.usersValidated.push(requestValidated.user1);
    this.usersValidatedId.push(requestValidated.user1Id);
  }*/
  console.log(this.requestsDeclined);
} catch (error) {
    console.error(error);
  }
},

async usersValidatedMe() {
  this.authUserId = localStorage.getItem('userId');
    for (const user of this.users) {

      if (user._id === authUserId) {
      continue;
      }
      try {
        const params = {
          status: 'VALIDATED',
          user2Id: user._id
        };
        const response = await this.$http.get('/contacts', { params });
        this.requestsSent=response.data.data.filter(requestSent => requestSent.user1Id == this.authUserId);
        this.usersValidatedId.push(requestsSent.user2Id);
        this.usersValidated.push(requestsSent.user2);

        

          /*for (const requestSent of this.requestsSent) {
            if (requestSent.user1Id == this.authUserId) {
              this.usersValidated.push(this.requestSent.user2);
              this.usersValidatedId.push(this.requestSent.user2Id);
            }
          }*/
      } catch (error) {
        console.error(`An error occurred while fetching requests for user ${user._id}:`, error);
      }
    }
  },

  async listRequests() {
  this.authUserId = localStorage.getItem('userId');
try {
  const params = {
      status: 'PENDING',
      user2Id: this.authUserId
    };
    await this.listRequestsValidated();
    const validatedUserIds = new Set(this.requestsValidated.map(requestValidated => requestValidated.user1Id));

    await this.listRequestsDeclined();
    const declinedUserIds = new Set(this.requestsDeclined.map(requestDeclined => requestDeclined.user1Id));
    
  const response = await this.$http.get('/contacts', { params });
  this.requests = response.data.data.filter(request => !validatedUserIds.has(request.user1Id) || !declinedUserIds.has(request.user1Id));
  /*for (const request of this.requests) {
    this.usersSendMeRequestId.push(request.user1Id);
  }*/
  console.log(this.requests);
} catch (error) {
    console.error(error);
  }
},

  async fetchUsers() {
    this.authUserId = localStorage.getItem('userId');
      try {
        await this.listRequests();
        const requestUserIds = new Set(this.requests.map(request => request.user1Id));

        await this.listRequestsValidated();
        const validatedUserIds = new Set(this.requestsValidated.map(requestValidated => requestValidated.user1Id));

        const response = await this.$http.get('/users');
        this.allUsers = response.data.data.filter(user =>
          user._id !== this.authUserId && !requestUserIds.has(user._id) && !validatedUserIds.has(user._id) && !this.usersValidatedId.includes(user._id)
        );
} catch (error) {
  console.error('An error occurred while fetching contacts:', error);
  this.error = error.message;
}
  },

  activeMenu1(){
    this.selectedLink1=true;
    this.selectedLink2=false;
    this.selectedLink3=false;
  },

  activeMenu2(){
    this.selectedLink1=false;
    this.selectedLink2=true;
    this.selectedLink3=false;
  },

  activeMenu3(){
    this.selectedLink1=false;
    this.selectedLink2=false;
    this.selectedLink3=true;
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
if (!this.selectedUser) return; // Assurez-vous qu'un contact est sélectionné
console.log('Sending contact request to:', this.selectedUser.firstname);
const bodyData = {
  user2Id: this.selectedUser._id
};
try {
  const response = await this.$http.post('/contacts/', bodyData);
    this.sentInvitations.push(this.selectedUser._id);
    this.closeModal(); // Fermez la modale après l'envoi de la demande
} catch (error) {
  console.error('An error occurred while sending contact request:', error.response.data);
}
},

  closeAcceptModal() {
  this.showAcceptModal = false;
  this.selectedRequest = null;
},

  openAcceptModal(request) {
    this.selectedRequest = request;
    this.showAcceptModal = true;
  },

async acceptInvitation (){
  const bodyData = {
  action: "ANSWER_TO_REQUEST",
  status: "VALIDATED"
};

try {
  const response = await this.$http.patch(`/contacts/${this.selectedRequest._id}`, bodyData);
 /* this.usersValidatedId.push(selectedRequest.user1Id);
  this.usersValidated.push(selectedRequest.user1);*/
  this.closeAcceptModal();
} catch (error) {
  console.error(error);
}
},

closeDeclinedModal() {
  this.showDeclinedModal = false;
  this.selectedRequest = null;
},

  openDeclinedModal(request) {
    this.selectedRequest = request;
    this.showDeclinedModal = true;
  },

async declinedInvitation (){
  const bodyData = {
  action: "ANSWER_TO_REQUEST",
  status: "DECLINED"
};

try {
  const response = await this.$http.patch(`/contacts/${this.selectedRequest._id}`, bodyData);
  this.closeAcceptModal();
  //this.usersDeclined.push(selectedRequest.user1Id);
} catch (error) {
  console.error(error);
}
}

},
mounted() {
  this.fetchUsers();
  this.listRequests();
  this.usersValidatedMe();
  this.listRequestsValidated();
  this.listRequestsDeclined()
},
}
;
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

.selectedLink {
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

.main-invitations_section {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
}

.invitations_section-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 1rem;
    border-bottom: solid 1px var(--secondary-color);
}

.invitations_section-title_p {
    font-weight: 700;
    color: var(--primary-color);
}

.invitations_list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: solid 1px rgba(128, 128, 128, 0.425);
}

.invitations_list-item_avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 100%;
    background-color: var(--secondary-color);
}

.invitations_list-item_name {
    flex-grow: 1;
    padding-left: 1rem;
}

.invitations_list-item_actions {
    display: flex;
    gap: 0.5rem;
}

.invitation_accept, .invitation_decline {
    border: none;
    background: none;
    cursor: pointer;
}

.invitation_accept img, .invitation_decline img {
    width: 1.5rem;
    height: 1.5rem;
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