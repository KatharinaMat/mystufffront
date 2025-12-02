<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>

    <!--siia tuleks alert danger-->

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
        <div class="col-10 col-md-6">
          <div class="form-floating mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username">
            <label>Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <label>Password</label>
          </div>
          <div class="form-floating">
            <button type="button" class="btn btn-custom">Go!</button> <!--@click="processLogin()"-->
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


</style>

<script>
export default {
  name: 'HomeView'
}
</script>
