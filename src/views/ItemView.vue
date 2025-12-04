<template>
  <div>
    <h1 v-if="isView">View item</h1>
    <h1 v-if="isAdd">Add new item</h1>
    <h1 v-if="isEdit">Edit item</h1>

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
      <Details
          :item="item"
          :mode="isAdd ? 'add' : 'view'"
      />


        <div :class="item.imageData ? 'col-md-6' : 'col-md-12'">
          <div class="item-table-wrapper">
            <NewComponent :item="item"/>
            <QrcodeSvg :value="item.imageQrLink" size="400" level="H"/>
          </div>

          <div class="mt-3">
            <button @click="goBack" class="btn btn-custom me-3">Back</button>
            <button @click="printItem" class="btn btn-custom me-3">Edit</button><!--todo peab tegema meetodit mis viib EditView'le*/-->
            <button @click="goBack" class="btn btn-custom me-3">Delete</button><!--todo peab tegema meetodit mis avab delete modali*/-->

            <button @click="downloadQR" class="btn btn-custom me-3">Download QR</button>
            <button @click="printItem" class="btn btn-custom">Print</button>
          </div>
        </div>

      </div>

    </div>

</template>

<script>
import ItemService from "@/services/ItemService";
import {QrcodeCanvas, QrcodeSvg} from "qrcode.vue";
import {useRoute} from "vue-router";
import Details from "@/components/Details.vue";


export default {
  name: "ItemView",
  components: {Details, QrcodeCanvas, QrcodeSvg,},

  data() {
    return {
      itemId: Number(useRoute().query.itemId),
      isView: false,
      isAdd: false,
      isEdit: false,
      imageQrPath: '',

      item: {
        itemId: 0,
        itemName: '',
        itemDate: '',
        model: '',
        comment: '',
        imageData: '',
        imageQrLink: ''
      },
      
      loading: true,
      errorResponse: null
    };
  },

  methods: {
    loadItem() {
      const itemId = this.$route.query.itemId;

      if (!itemId) {
        this.error = "No itemId provided in URL.";
        this.loading = false;
        return;
      }

      ItemService.sendGetItemRequest(itemId)
          .then(response => {
            this.item = response.data
            this.loading = false;
          })
          .catch(error => {
            this.errorResponse = error.response?.data || {message: 'Failed to load item data.'};
            console.error("Error loading item:", error);
          })
          .finally(() => {
            this.loading = false;
          });
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
    this.isAdd = isNaN(this.itemId)
    this.isView = !this.isAdd
    this.loadItem();
  }
};
</script>

<style scoped>
.table th {
  width: 30%;
}
</style>