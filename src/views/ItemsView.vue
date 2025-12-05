<template>

  <div>
    <div class="items-table-wrapper">
      <table class="items-table" v-if="items.length >0">
        <thead>
        <tr>
          <th scope="col">Item</th>
          <th scope="col">Date</th>
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
            <font-awesome-icon icon="pen-to-square" /> <!--@click="navigateToEditItem(item.itemId)" class="cursor-pointer me-3" -->
            <font-awesome-icon icon="trash"/> <!--@click="navigateToDeleteItemModal(item.itemId)" class="cursor-pointer me-3" -->
            <font-awesome-icon icon="qrcode"/> <!--@click="navigateToQrCodeModal(item.itemId)" class="cursor-pointer" -->
            <font-awesome-icon icon="arrow-right-from-bracket" />
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
    navigateToQrModal(itemId) {
      NavigationService.navigateToQrCodeModal(itemId)
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