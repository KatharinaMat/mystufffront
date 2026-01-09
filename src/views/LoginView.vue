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
          <LoginCreateAccountMenu/>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-6 col-lg-4">
          <UsernameInput
              :username="username"
              :username-error="usernameError"
              @event-username-updated="setUsername"/>

            <PasswordInput
                :password="password"
                :password-error="passwordError"
                @event-password-updated="setPassword"
            />
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
</style>

<script>
import LoginService from "@/services/LoginService";
import AlertDanger from "@/modal/AlertDanger.vue";
import NavigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";
import LoginCreateAccountMenu from "@/components/LoginCreateAccountMenu.vue";
import UsernameInput from "@/components/inputs/UsernameInput.vue";
import PasswordInput from "@/components/inputs/PasswordInput.vue";
import UsernameService from "@/services/UsernameService";
import PasswordService from "@/services/PasswordService";

export default {
  name: 'LoginView',
  components: {PasswordInput, UsernameInput, LoginCreateAccountMenu, AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      alertMessage: '',
      usernameError: '',
      passwordError: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      },
    }
  },
  methods: {
    setUsername(username) {
      this.username = username
    },
    setPassword(password) {
      this.password = password
    },
    processLogin() {
      this.resetValidationErrors()
      this.usernameError = UsernameService.validateLoginUsername(this.username)
      this.passwordError = PasswordService.validateLoginPassword(this.password)

      if (this.usernameError || this.passwordError) return
      this.executeLogin()
    },
    resetValidationErrors() {
      this.usernameError = ''
      this.passwordError = ''
    },
    executeLogin() {
      const trimmedUsername = this.username.trim()
      LoginService.login(trimmedUsername, this.password)
          .then(response => this.handleLoginResponse(response, trimmedUsername))
          .catch(error => this.handleLoginError(error))
    },
    handleLoginResponse(response, trimmedUsername) {
      this.loginResponse = response.data
      this.setSessionStorageItems(trimmedUsername);
      this.updateNavMenuUserIsLoggedIn();
      NavigationService.navigateToItemsView();
    },
    setSessionStorageItems(trimmedUsername) {
      sessionStorage.setItem('userId', this.loginResponse.userId)
      sessionStorage.setItem('roleName', this.loginResponse.roleName)
      SessionStorageService.setUsername(trimmedUsername)
    },
    updateNavMenuUserIsLoggedIn() {
      this.$emit('event-user-logged-in')
    },
    handleLoginError(error) {
      const status = error?.response?.status
      this.errorResponse = error?.response?.data || { message: 'Unknown error', errorCode: 0 }
      if ( status === 403 && this.errorResponse.errorCode === 111) {
        this.password = ''
        this.showAlert(this.errorResponse.message)
        return
      }
      if (status === 400) {
        this.showAlert(this.errorResponse.message || 'Please check your input')
        return
      }
      NavigationService.navigateToErrorView()
    },
    showAlert(message) {
      this.alertMessage = message
      setTimeout(this.resetAlertMessage, 4000)
    },
    resetAlertMessage() {
      this.alertMessage = ''
    },
  }
}
</script>
