<template>
  <div>
    <HeaderComponent />

    <!-- Simple loading + error handling -->
    <div v-if="loading" class="text-center mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="errorResponse" class="alert alert-danger m-3">
      {{ errorResponse.message || 'An unknown error occurred.' }}
    </div>

    <div v-else>
      <div class="row mb-4">
        <div class="col">
          <h2>Item #{{ item.itemId }}</h2>
        </div>
      </div>
      <div class="row mb-3">

        <div v-if="item.imageData" class="col-md-6">
          <img
              :src="`data:image/jpeg;base64,${item.imageData}`"
              alt="Item image"
              class="img-fluid rounded"
          />
        </div>

        <div :class="item.imageData ? 'col-md-6' : 'col-md-12'">
          <div class="item-table-wrapper">
            <table class="item-table">
              <tbody>
              <tr>
                <th>Item:</th>
                <td>{{ item.itemName }}</td>
              </tr>
              <tr>
                <th>Date:</th>
                <td>{{ formatDate(item.itemDate) }}</td>
              </tr>
              <tr>
                <th>Model:</th>
                <td>{{ item.model }}</td>
              </tr>
              <tr>
                <th>Comment:</th>
                <td>{{ item.comment }}</td>
              </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-3">
            <button @click="goBack" class="btn btn-custom me-3">Back</button>
            <button @click="printItem" class="btn btn-custom me-3">Edit</button> <!--PARANDA peab tegema meetodit mis viib EditView'le*/-->
            <button @click="downloadQR" class="btn btn-custom me-3">Download QR</button>
            <button @click="printItem" class="btn btn-custom">Print</button>
          </div>
        </div>

      </div>

    </div>
  </div>

</template>

<script>
import HeaderComponent from "@/components/Header.vue";
import SelectedItemService from "@/services/SelectedItemService";

export default {
  name: "SelectedItemView",
  components: { HeaderComponent },

  data() {
    return {
      item: null,
      loading: true,
      errorResponse: null
    };
  },

  methods: {
    loadItem() {
      const itemId = this.$route.query.itemId;   // /item?itemId=2
      console.log("itemId from route:", itemId);

      if (!itemId) {
        this.error = "No itemId provided in URL.";
        this.loading = false;
        return;
      }

      SelectedItemService.sendGetItemRequest(itemId)
          .then(response => {
            this.item = response.data;
            this.loading = false;
          })
          .catch(error => {
            this.errorResponse = error.response?.data || { message: 'Failed to load item data.'};
            console.error("Error loading item:", error);
          })
          .finally(() => {
            this.loading = false;
          });
    },

    formatDate(dateString) {
      if (!dateString) return "";
      return new Date(dateString).toLocaleDateString("et-EE");
    },

    goBack() {
      this.$router.back();
    },

    downloadQR() {
      // implement later
    },

    printItem() {
      window.print();
    }
  },

  mounted() {
    this.loadItem();
  }
};
</script>

<style scoped>
.table th {
  width: 30%;
}
</style>