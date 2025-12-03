<template>
  <div>
    <HeaderComponent />

    <!-- Simple loading + error handling -->
    <div class="container mt-4">
      <div v-if="loading" class="text-center">
        Loading item...
      </div>

      <div v-else-if="error" class="alert alert-danger">
        {{ error }}
      </div>

      <div v-else>
        <div class="row mb-4">
          <div class="col">
            <h2>Item #{{ item.itemId }}</h2>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-md-6">
            <img
                v-if="item.imageData"
                :src="`data:image/jpeg;base64,${item.imageData}`"
                alt="Item image"
                class="img-fluid rounded"
            />
          </div>

          <div class="col-md-6">
            <table class="table">
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

            <div class="mt-3">
              <button @click="goBack" class="btn btn-secondary me-2">Back</button>
              <button @click="downloadQR" class="btn btn-primary me-2">Download QR</button>
              <button @click="printItem" class="btn btn-info">Print</button>
            </div>
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
      error: ""
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
            console.log("item from backend:", response.data);
            this.item = response.data;
            this.loading = false;
          })
          .catch(err => {
            console.error("Error loading item:", err);
            this.error = "Unable to load item details.";
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
