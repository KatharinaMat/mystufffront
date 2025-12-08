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