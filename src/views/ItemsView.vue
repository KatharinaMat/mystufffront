
<template>
  <div>
    <HeaderComponent />
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
          <router-link   :to="{ name: 'SelectedItemView', query: { itemId: item.itemId } }"
                         class="item-link">
            {{ item.itemName }}
          </router-link>
        </td>
        <td>{{ formatDate(item.itemDate) }}</td>

        <td v-if="isLoggedIn">
          <!--<font-awesome-icon @click="navigateToEditItem(item.itemId)" class="cursor-pointer me-3" icon="fa-solid fa-pen-to-square" />
          <font-awesome-icon @click="displayDeleteItemModal(item.itemId)" class="cursor-pointer" icon="fa-solid fa-trash"/> -->
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
import HeaderComponent from "@/components/Header.vue";
import SessionStorageService from "@/services/SessionStorageService";
import ItemsService from "@/services/ItemsService";

export default {
  name: "ItemsView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      /*deleteLocationModalIsOpen: false,-->*/
      items: [],
         }
  },
  methods: {
    /*navigateToEditItem(itemId) {
      NavigationService.navigateToEditItem(itemId)
    },*/

    loadItems() {
      const userId = sessionStorage.getItem('userId');
      ItemsService.sendGetItemsListRequest(userId)
          .then(response => {this.items = response.data});
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('et-EE');
    }
  },
  beforeMount() {
    this.isLoggedIn = SessionStorageService.isLoggedIn()
    this.isLoggedIn = SessionStorageService.isLoggedIn()
  },
  mounted() {
    this.loadItems();
  }

};
</script>