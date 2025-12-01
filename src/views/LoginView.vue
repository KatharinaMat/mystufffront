<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
  </div>
  <div class="container text-center">
    <div class="row">
        <nav class="home-links">
          <h3>
            <router-link to="/login">Login</router-link>
          </h3>
        </nav>
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
export default {
  name: 'HomeView'
}
</script>
