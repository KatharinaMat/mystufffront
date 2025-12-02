<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>

    <div class="row justify-content-center mb-3">
      <div class="col col-6">
        <AlertDanger :alert-message="alertMessage" @event-alert-box-closed="resetAlertMessage"/>
      </div>
    </div>

    <div class="container text-center">
      <div class="row">
        <div>
          <nav class="home-links">
            <h3>
              <router-link to="/login">Login</router-link>
            </h3>
            <h3>
              <router-link to="/new-account">Create account</router-link>
            </h3>
          </nav>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-lg-4">
          <div class="form-floating mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username">
            <label>Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <label>Password</label>
          </div>
          <div class="form-floating">
            <button @click="processLogin" type="button" class="btn btn-custom btn-large">Go!</button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<style scoped>
h1 {
  margin-top: 30px; /* to push the h1 lower */
  margin-bottom: 40px; /*to push the next block lower*/
}

.home-links {
  display: flex; /*Makes the children ("LogIn" & "Create account") sit next to each other horizontally by default.*/
  justify-content: center;
  gap: 40px; /*gap between links*/
  margin-bottom: 40px; /*to push the next block lower*/
}


</style>

<script>
import LoginService from "@/services/LoginService";
import AlertDanger from "@/modal/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";

export default {
  name: 'LoginView',
  components: {AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      alertMessage: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
      message: '',
      errorCode: 0
    }
      }
    },
  methods: {

    processLogin() {
      if (this.allFieldsHaveCorrectInput()) {
        this.executeLogin();
      } else {
        this.displayIncorrectInputAlert();
      }
    },

    allFieldsHaveCorrectInput() {
      return this.username !== '' && this.password !== '';
    },

    executeLogin() {
      LoginService.sendGetLoginRequest(this.username, this.password)
          .then(response => this.handleLoginResponse(response))
          .catch(error => this.handleLoginError(error))
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      this.setSessionStorageItems();
      this.updateNavMenuUserIsLoggedIn();
      NavigationService.navigateToItemsView();
    },

    setSessionStorageItems() {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
    },

    updateNavMenuUserIsLoggedIn() {
      this.$emit('event-user-logged-in')
    },


    handleLoginError(error) {
      this.errorResponse = error.response.data
      if (this.incorrectCredentialsInput(error)) {
        this.displayIncorrectCredentialsAlert();
      } else {
        NavigationService.navigateToErrorView();
      }
    },

    incorrectCredentialsInput(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === 111;
    },

    displayIncorrectCredentialsAlert() {
      this.alertMessage = this.errorResponse.message
      setTimeout(this.resetAlertMessage, 4000)
    },

    displayIncorrectInputAlert() {
      this.alertMessage = 'Please fill out all fields'
      setTimeout(this.resetAlertMessage, 4000)
    },

    resetAlertMessage() {
      this.alertMessage = ''
    },

  }

}
</script>
