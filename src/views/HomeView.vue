<template>
  <div class="container text-center">
    <div>
      <h1>MyStuffLabelled</h1>
    </div>
    <div class="container text-center">
      <div class="row">
        <div>
          <LoginCreateAccountMenu/>
          <img src="@/assets/background_picture.webp" alt="background" class="home-image">

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  margin-top: 60px; /* to push the h1 lower */
  margin-bottom: 40px; /*to push the next block lower*/
}

</style>

<script>
import LoginCreateAccountMenu from "@/components/LoginCreateAccountMenu.vue";

export default {
  name: 'HomeView',
  components: {LoginCreateAccountMenu}
}
</script>
