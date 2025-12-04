<template>
  <Modal :modal-is-open="deleteItemModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #body>
      Are you sure you want to delete this item?
    </template>

    <template #buttons>
      <button @click="$emit('event-close-modal')" type="submit" class="btn btn-custom">No, keep my item</button>
      <button @click="deleteItem" type="submit" class="btn btn-custom">Yes, delete forever</button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/modal/Modal.vue";
import itemService from "@/services/ItemService";

export default {
  name: 'DeleteItemModal',
  components: {Modal},
  props: {
    deleteItemModalIsOpen: Boolean,
    itemId: Number,
    redirectAfterDelete: String
  },
  methods: {
    deleteItem() {
      itemService.deleteItem(this.itemId)
      this.$emit('event-item-deleted')
      this.$emit('event-close-modal')

      if (this.redirectAfterDelete) {
        this.$router.push(this.redirectAfterDelete)
      }
    }
  }
}
</script>