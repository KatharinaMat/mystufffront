<template>

  <div v-if="isLoggedIn" class="header-bar">
    <div  class="welcome-text">
      Welcome, {{ this.username}}!
    </div>
    <font-awesome-icon
        @click="startLogOutProcess"
        class="logout-icon cursor-pointer"
        icon="fa-solid fa-arrow-right-from-bracket"
    />
  <LogOutModal
      :log-out-modal-is-open="logOutModalIsOpen"
      @event-close-modal="closeLogOutModal"
      @event-log-out-executed="executeLogOut"
  />
  </div>
  <router-view @event-user-logged-in="updateNavMenu"/>
</template>

<style>
html, body {
  margin: 0;
  height: 100%;
  background-color: #050811; /* dark background for whole page */
}

@import url('https://fonts.googleapis.com/css2?family=Comic+Relief&display=swap');

#app {
  min-height: 100vh;
  font-family: "Comic Relief", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fc9d0d;
}

/* Optional: update nav colors too */
nav a {
  font-weight: bold;
  color: #fc9d0d;
}

nav a.router-link-exact-active {
  color: #869770; /* or change this if you like */
}
</style>
<script>
import {defineComponent} from "vue";
import LogOutModal from "@/modal/LogOutModal.vue";
import NavigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";

export default defineComponent({
  name: 'App',
  components: {LogOutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
      username: '',
      logOutModalIsOpen: false
    }
  },
  methods: {

    startLogOutProcess() {
      this.openLogOutModal()
    },

    openLogOutModal() {
      this.logOutModalIsOpen = true
    },

    closeLogOutModal() {
      this.logOutModalIsOpen = false
    },

    executeLogOut() {
      this.closeLogOutModal()
      sessionStorage.clear()
      this.updateNavMenu()
      NavigationService.navigateToHomeView();
    },

    updateNavMenu() {
      this.isLoggedIn = SessionStorageService.isLoggedIn()
      this.isAdmin = SessionStorageService.isAdmin()
      this.username = SessionStorageService.getUsername()
    },

  },
  beforeMount() {
    this.updateNavMenu()
  }
})
</script>