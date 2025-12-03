<template>
  <Modal :modal-is-open="logOutModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #body>
      Are you sure you want to log out?
    </template>



    <template #buttons>
      <button  @click="$emit('event-close-modal')" type="submit" class="btn btn-custom">Close</button>
      <button @click="$emit('event-log-out-executed')" type="submit" class="btn btn-custom">Yes</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/modal/Modal.vue";

export default {
  name: 'LogOutModal',
  components: {Modal},
  props: {
    logOutModalIsOpen: Boolean
  }
}
</script>