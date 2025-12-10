<template>
  <div class="form-floating mb-3">
    <input :value="email"
           type="email"
           class="form-control"
           :class="{ 'is-invalid': emailError }"
           placeholder="Email"
           @input="$emit('event-email-updated', $event.target.value)"
    >
    <label>Email</label>
    <div class="invalid-feedback">
      {{ emailError }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'EmailInput',
  props: {
    email: String,
    emailError: {
      type: String,
      default: ''
    }
  }
}
</script>
