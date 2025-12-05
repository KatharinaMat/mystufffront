<template>
  <Modal :modal-is-open="qRCodeModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
 <!--Siis peaks tulema QR koodi image from QrImage.vue-->

    <template>

<!--      <button @click="printQrImage" type="submit" class="btn btn-custom">Print</button>
      <button @click="downloadQrImage" type="submit" class="btn btn-custom">Download</button>-->
    </template>
  </Modal>
</template>
<script>
import Modal from "@/modal/Modal.vue";
import itemService from "@/services/ItemService";

export default {
  name: 'QrCodeModal',
  components: {Modal},
  props: {
    qRCodeModalIsOpen: Boolean,


  },
  methods: {
    printQrImage() {

    },
    downloadQrImage() {

    }
  }
}

</script>