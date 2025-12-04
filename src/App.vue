<template>


  <font-awesome-icon v-if="true"
      @click=""
      class="logout-icon cursor-pointer"
      icon="fa-solid fa-arrow-right-from-bracket"
  />

  <router-view />
</template>

<style>
html, body {
  margin: 0;
  height: 100%;
  background-color: #050811;   /* dark background for whole page */
}
@import url('https://fonts.googleapis.com/css2?family=Comic+Relief&display=swap');

#app {
  min-height: 100vh;
  font-family: "Comic Relief", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fc9d0d;
}

/* Optional: update nav colors too */
nav a {
  font-weight: bold;
  color: #fc9d0d;
}

nav a.router-link-exact-active {
  color: #869770;              /* or change this if you like */
}
</style>
<script >
</script>