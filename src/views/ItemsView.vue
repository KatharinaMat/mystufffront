<template>

  <div>
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
        <!-- table rows -->
        <tr v-for="item in items" :key="item.itemId">
          <td>
            <a href="#" @click="navigateToItemView(item.itemId)">{{ item.itemName }}</a>
          </td>
          <td>{{ formatDate(item.itemDate) }}</td>

          <td>
            <font-awesome-icon @click="navigateToEditItem(item.itemId)" class="table-icon me-3" icon="pen-to-square" />
            <font-awesome-icon @click="navigateToDeleteItemModal(item.itemId)" class="table-icon me-3" icon="trash"/>
            <font-awesome-icon @click="navigateToQrCodeModal(item.itemId)" class="table-icon" icon="qrcode"/>

          </td>
        </tr>
        </tbody>
      </table>

      <div v-else class="text-muted">
        You have no items yet :)
      </div>
    </div>
  </div>
</template>
<script>
import SessionStorageService from "@/services/SessionStorageService";
import ItemsService from "@/services/ItemService";
import NavigationService from "@/services/NavigationService";

export default {
  name: "ItemsView",
  components: {
  },
  data() {
    return {

      items: [
        {
          itemId: 0,
          itemName: '',
          itemDate: ''
        }
      ],
      isLoggedIn: false
    }
  },
  methods: {
    navigateToItemView(itemId) {
      NavigationService.navigateToItemView(itemId)
    },
    navigateToEditItem(itemId) {
      NavigationService.navigateToEditItem(itemId)
    },
    navigateToDeleteItemModal(itemId) {
      NavigationService.navigateToDeleteItemModal(itemId)
    },
    navigateToQrModal() {
      NavigationService.navigateToQrCodeModal()
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