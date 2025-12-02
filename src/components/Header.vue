<template>
  <div class="header-bar">
    <div class="welcome-text">
      Welcome, username!
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
</template>



<script>
import NavigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";
import LogOutModal from "@/modal/LogOutModal.vue";

export default {
  name: "HeaderComponent",
  components: {LogOutModal},
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false,
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
    },

  },
  beforeMount() {
    this.updateNavMenu()
  }

}

</script>