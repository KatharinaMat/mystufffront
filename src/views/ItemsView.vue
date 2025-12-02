<script>
import HeaderComponent from "@/components/Header.vue";

export default {
  name: "ItemsView",
  components: {
    HeaderComponent,
  },
};
</script>

<template>
  <div>
    <HeaderComponent />

    <table class="table table-hover">
      <thead>
      <tr>
        <th scope="col">Item</th>
        <th scope="col">Date</th>
      </tr>
      </thead>
      <tbody>
      <!-- table rows -->
      </tbody>
    </table>
  </div>
</template>
