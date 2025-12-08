<template>
  <div class="form-floating mb-3">
    <input @value="password" :type="showPassword ? 'text' : 'password'"
           class="form-control"
           :class="{ 'is-invalid': passwordError }"
           placeholder="Password"
           @input="$emit('event-password-updated', $event.target.value)"
    >
    <label>Password</label>
    <font-awesome-icon
        :icon="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"
        class="password-toggle-icon"
        @click="togglePassword"
    />

    <div class="invalid-feedback">
      {{ passwordError }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'PasswordInput',
  props: {
    password: String,
    passwordError: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showPassword: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
    },

  }
}
</script>