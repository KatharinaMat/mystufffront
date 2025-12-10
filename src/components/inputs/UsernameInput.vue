<template>
  <div class="form-floating mb-3">
    <input :value="username"
           type="text"
           class="form-control"
           :class="{ 'form-control is-invalid': usernameError }"
           placeholder="Username"
           @input="$emit('event-username-updated', $event.target.value)"
    >
    <label>Username</label>
    <div class="invalid-feedback">
      {{ usernameError }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'UsernameInput',
  props: {
    username: String,
    usernameError: {
      type: String,
      default: ''
    }
  }
}
</script>