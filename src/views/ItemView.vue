<template>
  <div>

    <h1 v-if="isAdd">Add new item</h1>
    <h1 v-if="isEdit">Edit item #{{item.itemName}}</h1>

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
          :is-view="isView"
          :item="item"
          :mode="isAdd ? 'add' : 'view'"
          :item-id="itemId"
          :qr-value="item.imageQrLink"
          @event-new-image-selected="item.imageData = $event"
          @event-chosen-image-cleared="item.imageData = ''"
      />

      <div class="mt-3">
        <button v-if="isView || isAdd" @click="goBack" class="btn btn-custom me-3">Back</button>
        <button v-if="isView" @click="enableEdit" class="btn btn-custom me-3">Edit</button>
        <button v-if="isView" @click="goBack" class="btn btn-custom me-3">Delete</button> <!--todo peab tegema meetodit mis avab delete modali*/-->

        <button v-if="isEdit" @click="disableEdit" class="btn btn-custom me-3">Close edit</button>
        <button v-if="isEdit" @click="" class="btn btn-custom me-3">Save</button>

        <button v-if="isAdd" @click="" class="btn btn-custom me-3">Add</button>

      </div>
    </div>

  </div>


</template>

<script>
import ItemService from "@/services/ItemService";
import {useRoute} from "vue-router";
import Details from "@/components/Details.vue";
import NavigationService from "@/services/NavigationService";


export default {
  name: "ItemView",
  components: {Details},

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

      loading: false,
      errorResponse: null
    };
  },

  methods: {


    loadItem() {
      this.startLoadingSpinner()
      ItemService.sendGetItemRequest(this.itemId)
          .then(response => {
            this.item = response.data
            this.loading = false;
            sessionStorage.setItem('item', JSON.stringify(this.item))
          })
          .catch(error => {
            this.errorResponse = error.response?.data || {message: 'Failed to load item data.'};
            console.error("Error loading item:", error);
          })
          .finally(() => {
            this.stopLoadingSpinner()
          });
    },

    startLoadingSpinner() {
      this.loading = true
    },

    stopLoadingSpinner() {
      this.loading = false
    },

    enableEdit() {
      this.isEdit = true
      this.isView = false
    },
    disableEdit() {
      this.isEdit = false
      this.isView = true
      this.item = JSON.parse(sessionStorage.getItem("item"))
    },

    goBack() {
      NavigationService.navigateToItemsView();
    },

  },

  mounted() {
    this.isAdd = isNaN(this.itemId)
    this.isView = !this.isAdd

    if (this.isView) {
      this.loadItem();
    }

  }
};
</script>

