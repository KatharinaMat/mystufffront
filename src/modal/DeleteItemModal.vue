<template>
  <Modal
      :modal-is-open="deleteItemModalIsOpen"
      @event-close-modal="$emit('event-close-modal')"
  >
    <template #body>
      Are you sure you want to delete this item?
    </template>
    <template #buttons>
      <button @click="$emit('event-close-modal')" type="button" class="btn btn-custom">
        No, keep my item
      </button>
      <button @click="confirmDelete" type="button" class="btn btn-custom">
        Yes, delete forever
      </button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/modal/Modal.vue";
export default {
  name: "DeleteItemModal",
  components: {Modal},
  props: {
    deleteItemModalIsOpen: Boolean
  },
  methods: {
    confirmDelete() {
      this.$emit("event-confirm-delete");
    }
  }
};
</script>
