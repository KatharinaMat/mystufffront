<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
  </div>
  <div class="container text-center">
    <div class="row">
      <div>
      <nav class="d-flex justify-content-center gap-6">
        <router-link to="/login">Login</router-link> |
        <router-link to="/new-account">Create account</router-link>
      </nav>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>
