<template>
  <button class="btn btn-custom mb-3" @click="navigateToAddItem">
    Add New Item +
  </button>
  <div>
    <div></div>
    <div class="items-table-wrapper">
      <table class="items-table" v-if="items.length >0">
        <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Date</th>
          <th scope="col"></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in items" :key="item.itemId">
          <td>
            <a href="#" @click="navigateToItemView(item.itemId)">{{ item.itemName }}</a>
          </td>
          <td>{{ formatDate(item.itemDate) }}</td>
          <td>
            <font-awesome-icon @click="navigateToEditItem(item.itemId)" class="table-icon me-3" icon="pen-to-square"/>
            <font-awesome-icon @click="navigateToDeleteItemModal(item.itemId)" class="table-icon me-3" icon="trash"/>
            <font-awesome-icon @click="navigateToQrCodeModal(item.itemId)" class="table-icon" icon="qrcode"/>
          </td>
        </tr>
        </tbody>
      </table>
      <div v-else>
        You have no items yet :)
      </div>
    </div>
    <QrCodeModal
        :qr-code-modal-is-open="qrCodeModalIsOpen"
        :qr-code="qrCode"
        @event-close-modal="closeQrCodeModal"
    />
  </div>
</template>

<script>
import SessionStorageService from "@/services/SessionStorageService";
import ItemsService from "@/services/ItemService";
import NavigationService from "@/services/NavigationService";
import QrCodeService from "@/services/QrCodeService";
import QrCodeModal from "@/modal/QrCodeModal.vue";

export default {
  name: "ItemsView",
  components: {QrCodeModal},
  data() {
    return {
      items: [
        {
          itemId: 0,
          itemName: '',
          itemDate: ''
        }
      ],
      isLoggedIn: false,
      qrCodeModalIsOpen: false,
      qrCode: '',
    }
  },
  methods: {
    navigateToAddItem() {
      NavigationService.navigateToAddItem()
    },
    navigateToItemView(itemId) {
      NavigationService.navigateToItemView(itemId)
    },
    navigateToEditItem(itemId) {
      NavigationService.navigateToEditItem(itemId)
    },
    navigateToDeleteItemModal(itemId) {
      NavigationService.navigateToDeleteItemModal(itemId)
    },
    navigateToQrCodeModal(itemId) {
      this.openQrCodeForItem(itemId);
    },
    openQrCodeForItem(itemId) {
      QrCodeService.sendGetQrCodeRequest(itemId)
          .then(response => {
            this.qrCode = response.data;
            this.qrCodeModalIsOpen = true;
          })
          .catch(err => {
            console.error("Failed to load QR code:", err);
            // you can show an error message here if you want
          });
    },
    closeQrCodeModal() {
      this.qrCodeModalIsOpen = false;
      this.qrCode = '';
    },
    loadItems() {
      const userId = sessionStorage.getItem('userId');
      ItemsService.sendGetItemsRequest(userId)
          .then(response => {
            this.items = response.data
          });
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('et-EE');
    }
  },
  beforeMount() {
    this.isLoggedIn = SessionStorageService.isLoggedIn()
  },
  mounted() {
    this.loadItems();
  }
};
</script>