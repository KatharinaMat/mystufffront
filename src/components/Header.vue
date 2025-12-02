<template>
  <div class="container text-center">
    <div class="row">

      <div class="col">
        Welcome, username!
      </div>
      <div class="col">
        <font-awesome-icon @click="startLogOutProcess" class="cursor-pointer" icon="fa-solid fa-arrow-right-from-bracket"/>
      </div>
    </div>
    <LogOutModal :log-out-modal-is-open="logOutModalIsOpen"
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