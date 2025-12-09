<template>
  <div>

    <h1 v-if="isAdd">Add new item</h1>
    <h1 v-if="isEdit">Edit item #{{ item.itemName }}</h1>

    <div v-if="errorMessage" class="alert alert-danger m-3">
      {{ errorMessage }}
    </div>
    <div v-if="successMessage" class="alert alert-success m-3">
      {{ successMessage }}
    </div>

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
      <ItemDetails
          :is-view="isView"
          :item="item"
          :image-qr-path="imageQrPath"
          @event-item-name-updated="setItemItemName"
          @event-item-date-updated="setItemItemDate"
          @event-item-model-updated="setItemModel"
          @event-item-comment-updated="setItemComment"
          @event-new-image-selected="setItemImageData"
          @event-chosen-image-cleared="handleDeleteImage"
      />

      <div class="mt-3">
        <button v-if="isView || isAdd" @click="goBack" class="btn btn-custom me-3">Back</button>
        <button v-if="isView" @click="enableEdit" class="btn btn-custom me-3">Edit</button>
        <button v-if="isView" @click="goBack" class="btn btn-custom me-3">Delete</button>
        <!--todo peab tegema meetodit mis avab delete modali*/-->

        <button v-if="isEdit" @click="disableEdit" class="btn btn-custom me-3">Close edit</button>
        <button v-if="isEdit" @click="" class="btn btn-custom me-3">Save</button>

        <button v-if="isAdd" @click="processAddItem" class="btn btn-custom me-3">Add</button>

      </div>
    </div>

  </div>


</template>

<script>
import ItemService from "@/services/ItemService";
import {useRoute} from "vue-router";
import ItemDetails from "@/components/ItemDetails.vue";
import NavigationService from "@/services/NavigationService";
import SessionStorageService from "@/services/SessionStorageService";


export default {
  name: "ItemView",
  components: {ItemDetails},

  data() {
    return {
      itemId: Number(useRoute().query.itemId),
      userId: SessionStorageService.getUserId(),
      errorMessage: '',
      successMessage: '',
      resetImageInput: false,
      isView: false,
      isAdd: false,
      isEdit: false,

      imageQrPath: '',

      item: {
        itemName: '',
        itemDate: '',
        model: '',
        comment: '',
        imageData: ''
      },

      loading: false,
      errorResponse: null
    };
  },

  methods: {
    processAddItem() {
      this.resetMessages()
      this.handleInputErrorMessages();
      if (this.requiredFieldsHaveCorrectInput()) {
        this.executeAddItem();
      }
    },
    handleInputErrorMessages() {
      if (this.item.itemName === '') {
        this.errorMessage = 'Please enter item Name'
      } else if (this.item.itemDate === '') {
        this.errorMessage = 'Please select Date of purchase'
      } else {
        const enteredDate = new Date(this.item.itemDate)
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (enteredDate > today) {
          this.errorMessage = 'Date of purchase cannot be in the future'
        }
      }
    },
    resetMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
    requiredFieldsHaveCorrectInput() {
      return this.errorMessage === '';
    },
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

    executeAddItem() {
      ItemService.sendPostItemRequest(this.userId, this.item)
          .then(() => this.handleAddItemResponse())
          .catch(error => this.itemNameAlreadyExists(error))
    },
    handleAddItemResponse() {
      this.successMessage = 'New item "' + this.item.itemName + '" has been added!'
      setTimeout(this.resetMessages, 4000)
      this.resetAllFields()
    },
    itemNameAlreadyExists(error) {
      return error.response.status === 403 && this.errorResponse.errorCode === 333;
    },

    resetAllFields() {
      this.item.itemName = ''
      this.item.itemDate = ''
      this.item.model = ''
      this.item.comment = ''
      this.item.imageData = ''
      this.resetImageInput = true
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

    setItemItemName(itemName) {
      this.item.itemName = itemName
    },

    setItemItemDate(itemDate) {
      this.item.itemDate = itemDate
    },

    setItemModel(model) {
      this.item.model = model
    },

    setItemComment(comment) {
      this.item.comment = comment
    },

    setItemImageData(imageData) {
      this.item.imageData = imageData
    },

    handleDeleteImage() {
      alert("Pilt kustutatud")
      // todo: delete image (sõnumiga -> this.itemId)
      // todo: reset this.image.imageData
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

