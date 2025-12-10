<template>
  <nav class="home-links">
    <h3>
      <router-link to="/login">Login</router-link>
    </h3>
    <h3>
      <router-link to="/new-account">Create account</router-link>
    </h3>
  </nav>
</template>
<script>
export default {
  name: 'LoginCreateAccountMenu'
}
</script>
