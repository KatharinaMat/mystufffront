<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-6">
        <AlertSuccess :alert-message="alertSuccessMessage"/>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <LoginCreateAccountMenu/>
      </div>
    </div>
    <div v-if="displayAddUserForm" class="row justify-content-center">
      <div class="col col-4">
        <UsernameInput :username="user.username" :username-error="usernameError"
                       @event-username-updated="setUserUsername"/>
        <PasswordInput :password="user.password" :password-error="passwordError"
                       @event-password-updated="setUserPassword"/>
        <EmailInput :email="user.email" :email-error="emailError"
                      @event-email-updated = "setUserEmail"/>

        <div class="form-floating">
          <button @click="addNewUser" type="button" class="btn btn-custom btn-large">Sign up!</button>
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
import AlertSuccess from "@/modal/AlertSuccess.vue";
import LoginCreateAccountMenu from "@/components/LoginCreateAccountMenu.vue";
import UserService from "@/services/UserService";
import NavigationService from "@/services/NavigationService";
import UsernameInput from "@/views/UsernameInput.vue";
import PasswordInput from "@/views/PasswordInput.vue";
import PasswordService from "@/services/PasswordService";
import UsernameService from "@/services/UsernameService";
import EmailService from "@/services/EmailService";
import EmailInput from "@/views/EmailInput.vue";


export default {
  name: 'NewAccountView',
  components: {EmailInput, PasswordInput, UsernameInput, LoginCreateAccountMenu, AlertSuccess},
  data() {
    return {
      alertSuccessMessage: '',

      displayAddUserForm: true,
      showPassword: false,

      usernameError: '',
      passwordError: '',
      emailError: '',

      user: {
        username: '',
        password: '',
        email: ''
      },

      errorResponse: {
        message: '',
        errorCode: 0
      }

    }
  },
  methods: {
    addNewUser() {
      this.resetValidationErrors()
      this.validateFromInput()

      if (this.formInputIsCorrect()) {
        UserService.sendPostUserRequest(this.user)
            .then(() => this.handleAddNewUserResponse())
            .catch(error => this.handleAddNewUserError(error));
      }

    },

    handleAddNewUserResponse() {
      this.hideAddUserForm()
      this.alertSuccessMessage = 'New user "' + this.user.username + '"  added! You can now login'
      setTimeout(NavigationService.navigateToLoginView, 4000)
    },

    hideAddUserForm() {
      this.displayAddUserForm = false
    },

    formInputIsCorrect() {
      return this.usernameError === '' && this.passwordError === '' && this.emailError === ''
    },

    validateFromInput() {
      this.usernameError = UsernameService.handleUsernameValidationError(this.user.username)
      this.passwordError = PasswordService.handlePasswordValidationError(this.user.password)
      this.emailError = EmailService.handleEmailValidationError(this.user.email)
      },

    handleAddNewUserError(error) {
      this.errorResponse = error.response.data

      if (error.response.status === 403 && this.errorResponse.errorCode === 222) {
        this.usernameError = this.errorResponse.message

      } else {
        NavigationService.navigateToErrorView()
      }
    },

    resetValidationErrors() {
      this.usernameError = ''
      this.passwordError = ''
      this.emailError = ''
    },

    setUserUsername(username) {
      this.user.username = username
    },

    setUserPassword(password) {
      this.user.password = password
    },

    setUserEmail(email) {
      this.user.email = email
    }
  },
  mounted() {
  }
}
</script>