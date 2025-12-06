<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
    <div class="row justify-content-center mb-3">
        <div class="col col-6">
          <AlertDanger :alert-message="alertMessage" @event-alert-box-closed="resetAlertMessage"/>
          <AlertSuccess :alert-message="successMessage" @event-alert-box-closed="resetSuccessMessage"/>
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
            <input
                v-model="username"
                type="text"
                class="form-control"
                :class="{ 'is-invalid': validationErrors.username }"
                placeholder=" Enter Username" @input="clearFieldError('username')"
            >
            <label>Username</label>
            <div v-if="validationErrors.username" class="invalid-feedback">
              {{ validationErrors.username }}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': validationErrors.password }"
                placeholder="Enter Password"
                @input="clearFieldError('password')"
            >
            <label>Password</label>
            <font-awesome-icon
                :icon="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
                class="password-toggle-icon"
                @click="togglePassword"
            />
            <div v-if="validationErrors.password" class="invalid-feedback">
              {{ validationErrors.password }}
            </div>
          </div>
          <div class="form-floating mb-3">
            <input
                v-model="email"
                type="email"
                class="form-control"
                :class="{ 'is-invalid': validationErrors.email }"
                placeholder="Enter E-mail"
                @input="clearFieldError('email')"
            >
            <label>E-mail</label>
            <div v-if="validationErrors.email" class="invalid-feedback">
              {{ validationErrors.email }}
            </div>
          </div>
          <div class="form-floating">
            <button
                type="button"
                class="btn btn-custom btn-large"
                :disabled="isLoading"
                @click="createAccount"
            >
              {{ isLoading ? 'Creating account...' : 'Sign up!' }}
            </button>
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

.password-toggle-icon {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #6c757d;
}

.password-toggle-icon:hover {
  color: #495057;
}

</style>

<script>
import AlertDanger from "@/modal/AlertDanger.vue";
import AlertSuccess from "@/modal/AlertSuccess.vue";

export default {
  name: 'NewAccountView',
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      username: '',
      password: '',
      email: '',
      showPassword: false,
      alertMessage: '',
      successMessage: '',
      validationErrors: {},
      isLoading: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },
    resetAlertMessage() {
      this.alertMessage = ''
    },
    resetSuccessMessage() {
      this.successMessage = ''
    },
    clearFieldError(field) {
      if (this.validationErrors[field]) {
        this.validationErrors = {
          ...this.validationErrors,
          [field]: ''
        }
      }
    },
    validateForm() {
      const errors = {}
      if (!this.username.trim()) {
        errors.username = 'Username is required'
      } else if (this.username.length < 3) {
        errors.username = 'Username must be at least 3 characters'
      }
      if (!this.password) {
        errors.password = 'Password is required'
      } else if (this.password.length < 6) {
        errors.password = 'Password must be at least 6 characters'
      }
      if (!this.email.trim()) {
        errors.email = 'E-mail is required'
      } else if (!this.isValidEmail(this.email)) {
        errors.email = 'Please enter a valid e-mail address'
      }
      this.validationErrors = errors
      return Object.keys(errors).length === 0
    },
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    },
    async createAccount() {
      this.alertMessage = ''
      this.successMessage = ''
      if (!this.validateForm()) {
        return
      }
      this.isLoading = true
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            email: this.email
          })
        })
        if (!response.ok) {
          const errorData = await response.json()
          console.log('Backend error response:', errorData)
          console.log('Status code:', response.status)

          if (errorData.errorCode === 'USERNAME_UNAVAILABLE') {
            this.validationErrors = {
              username: 'This username is already taken'
            }
          } else {
            this.alertMessage = errorData.message || 'Account creation failed. Please try again.'
          }
          return
        }
        this.successMessage = 'Account created successfully! You can now log in.'
        this.username = ''
        this.password = ''
        this.email = ''
        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (error) {
        console.error('Error creating account:', error)
        this.alertMessage = 'Network error. Please check your connection and try again.'
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
