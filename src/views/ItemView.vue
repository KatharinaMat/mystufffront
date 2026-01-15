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
          :qr-code="qrCode"
          @event-item-name-updated="setItemItemName"
          @event-item-date-updated="setItemItemDate"
          @event-item-model-updated="setItemModel"
          @event-item-comment-updated="setItemComment"
          @event-new-image-selected="setItemImageData"
          @event-item-updated="processUpdateItem"
          @event-chosen-image-cleared="handleDeleteImage"
      />
      <DeleteItemModal
          :delete-item-modal-is-open="deleteItemModalIsOpen"
          @event-close-modal="closeDeleteItemModal"
          @event-confirm-delete="deleteItem"
      />

      <div class="mt-3">
        <button v-if="isView || isAdd" @click="goBack" class="btn btn-custom me-3">Back</button>
        <button v-if="isView" @click="enableEdit" class="btn btn-custom me-3">Edit</button>
        <button v-if="isView" @click="displayDeleteItemModal" class="btn btn-custom me-3">Delete</button>
        <button v-if="isEdit" @click="disableEdit" class="btn btn-custom me-3">Close edit</button>
        <button v-if="isEdit" @click="processUpdateItem" type="submit" class="btn btn-custom me-3">Save</button>
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
import QrCodeService from "@/services/QrCodeService";
import DeleteItemModal from "@/modal/DeleteItemModal.vue";

export default {
  name: "ItemView",
  components: {ItemDetails, DeleteItemModal},

  data() {
    return {
      itemId: Number(useRoute().query.itemId),
      userId: SessionStorageService.getUserId(),
      originalItem: null,
      errorMessage: '',
      successMessage: '',

      resetImageInput: false,
      isView: false,
      isAdd: false,
      isEdit: false,
      qrCode: '',
      deleteItemModalIsOpen: false,

      item: {
        itemName: '',
        itemDate: '',
        model: '',
        comment: '',
        imageData: '',
        imageId: null,
        qrToken: ''
      },

      loading: false,
      errorResponse: null
    };
  },

  methods: {
    // --------- LOAD / INIT ---------
    loadItem() {
      this.errorResponse = null
      this.errorMessage = ''
      this.startLoadingSpinner()

      ItemService.sendGetItemRequest(this.itemId)
          .then(response => {
            console.log("✅ /item response.data:", response.data)
            this.item = response.data
            this.originalItem = JSON.parse(JSON.stringify(this.item))
            const itemForStorage = {
              ...this.item,
              imageData: ''
            }
            sessionStorage.setItem('item', JSON.stringify(itemForStorage))
            this.getQrCode()
          })
          .catch(error => {
            console.error("❌ Axios catch error:", error)
            this.errorResponse =
                error?.response?.data || { message: 'Failed to load item data.' }
          })
          .finally(() => {
            this.stopLoadingSpinner()
          })
    },

    getQrCode() {
      QrCodeService.sendGetQrCodeRequest(this.itemId)
          .then(response => {
            this.qrCode = response.data
          })
          .catch(() => {
            this.qrCode = ''
            if (!this.errorMessage) this.errorMessage = 'QR code could not be generated for this item.'
          })
    },


    // --------- ADD ITEM ---------
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

    executeAddItem() {
      ItemService.sendPostItemRequest(this.userId, this.item)
          .then(() => this.handleAddItemResponse())
          .catch(error => {
            if (this.itemNameAlreadyExists(error)) {
              this.errorMessage = 'Item with this name already exists'
              return
            }

            const status = error?.response?.status
            const msg = error?.response?.data?.message

            if (status === 400) {
              this.errorMessage = msg || 'Please check your input'
              return
            }

            this.errorMessage = 'Could not add item. Please try again.'
          })
    },


    handleAddItemResponse() {
      this.successMessage = 'New item "' + this.item.itemName + '" has been added!'
      setTimeout(this.resetMessages, 4000)
      this.resetAllFields()
    },

    itemNameAlreadyExists(error) {
      const data = error?.response?.data
      return error?.response?.status === 403 && data?.errorCode === 333
    },

    // --------- UPDATE ITEM ---------
    processUpdateItem() {
      this.resetMessages()
      this.handleInputErrorMessages()
      if (this.requiredFieldsHaveCorrectInput()) {
        this.executeUpdateItem();
      }
    },

    executeUpdateItem() {
      ItemService.sendPutItemRequest(this.itemId, this.item)
          .then(() => this.handleUpdateItemResponse())
          .catch(error => {
            if (this.itemNameAlreadyExists(error)) {
              this.errorMessage = 'Item with this name already exists'
              return
            }

            const status = error?.response?.status
            const msg = error?.response?.data?.message

            if (status === 400) {
              this.errorMessage = msg || 'Please check your input'
              return
            }

            this.errorMessage = 'Could not update item. Please try again.'
          })
    },

    handleUpdateItemResponse() {
      sessionStorage.setItem('successMessage', 'Item "' + this.item.itemName + '" updated succesfully')
      this.originalItem = JSON.parse(JSON.stringify(this.item))
      NavigationService.navigateToItemsView()
    },

    // --------- DELETE ITEM ---------
    displayDeleteItemModal() {
      this.deleteItemModalIsOpen = true;
    },

    closeDeleteItemModal() {
      this.deleteItemModalIsOpen = false;
    },

    deleteItem() {
      ItemService.sendDeleteItem(this.itemId)
          .then(() => NavigationService.navigateToItemsView())
          .catch(() => {
            this.deleteItemModalIsOpen = false
            this.errorMessage = 'Could not delete item. Please try again.'
          })
    },

    // --------- IMAGE HANDLING ---------
    setItemImageData(imageData) {
      this.item.imageData = imageData
      this.item.imageId = null
    },

    handleDeleteImage() {
      if (!this.item.imageId) {
        this.handleDeleteTempImage();
      } else {
        this.handleDeleteStoredImage();
      }
    },

    handleDeleteTempImage() {
      this.item.imageData = '';
      this.resetImageInput = true;
      alert("Image deleted");
    },

    handleDeleteStoredImage() {
      ItemService.sendDeleteItemImageRequest(this.itemId, this.item.imageId)
          .then(() => {
            this.item.imageData = ''
            this.item.imageId = null
            const itemForStorage = { ...this.item, imageData: '' }
            sessionStorage.setItem('item', JSON.stringify(itemForStorage))
            alert("Image deleted")
          })
          .catch(() => {
            this.errorMessage = 'Could not delete image. Please try again.'
          })
    },

    // --------- FIELD SETTERS ---------
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

    // --------- UTILS / VIEW STATE ---------
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
      if (this.originalItem) {
        this.item = JSON.parse(JSON.stringify(this.originalItem))
      }
    },

    goBack() {
      NavigationService.navigateToItemsView();
    },
  },

  mounted() {
    this.isAdd = isNaN(this.itemId)
    this.isView = !this.isAdd
    if (this.isAdd) {
      return;
    }
    this.loadItem();
    const mode = SessionStorageService.getItemMode();
    SessionStorageService.clearItemMode();
    if (mode === 'edit') {
      this.enableEdit();
    } else if (mode === 'delete') {
      this.displayDeleteItemModal();
    }
  }
}

</script>