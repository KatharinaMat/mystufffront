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
        <div class="col-10 col-md-6 col-lg-4">
          <div class="form-floating mb-3">
            <input v-model="username" type="text" class="form-control" placeholder="Username">
            <label>Username</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="password" type="password" class="form-control" placeholder="Password">
            <label>Password</label>
          </div>
          <div class="form-floating">
            <button @click="processLogin" type="button" class="btn btn-custom btn-large">Go!</button>
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
import LoginService from "@/services/LoginService";

export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      //alertMessage: '',

      loginResponse: {
        userId: 0,
        roleName: ''
      },

      //errorResponse: {
       // message: '',
       // errorCode: 0
      }
    },
  methods: {



    processLogin() {
      if(this.username !=='' && this.password !=='') {
        LoginService.sendGetLoginRequest(this.username, this.password)
            .then(response => this.handleLoginResponse(response))
            .catch()
      }
    },

    handleLoginResponse(response) {
      this.loginResponse = response.data
      // todo anmden session storagesse
      // todo navigeeri X lehele (kasuta navigation serviceit)

    },




  }

}
</script>
