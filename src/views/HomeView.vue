<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
  </div>
  <div class="container text-center">
    <div class="row">
      <div>
      <nav class="auth-links">
        <h3><router-link to="/login">Login</router-link>  </h3>
        <h3><router-link to="/new-account"> Create account</router-link></h3>
      </nav>
        <img src="@/assets/background_picture.webp" alt="background" class="home-image">

      </div>
  </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 60px; /* to push the h1 lower */
  margin-bottom: 40px;
}
  .auth-links {
    display: flex;
    justify-content: center;
    gap: 40px;
  }
.home-image {
  display: block;
  margin: 40px auto 0 auto; /* top margin + centered */
  max-width: 400px;         /* prevents the picture from getting too big */
  height: auto;             /* keeps proportions */
}

</style>

<script>
export default {
  name: 'HomeView'
}
</script>
