<template>
  <Modal :modal-is-open="qrCodeModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >


    <template #body>
      <QrcodeSvg :value="qrCode" :size="size" :level="level"/>
    </template>
    <template #buttons>
      <button @click="printQrImage" type="submit" class="btn btn-custom">Print</button>
      <button @click="downloadQrImage" type="submit" class="btn btn-custom">Download</button>
    </template>
  </Modal>
</template>
<script>
import Modal from "@/modal/Modal.vue";
import {QrcodeSvg} from "qrcode.vue";

export default {
  name: 'QrCodeModal',
  components: {QrcodeSvg, Modal},
  props: {
    qrCodeModalIsOpen: Boolean,
    qrCode: String,
    size: {
      type: [Number, String],
      default: 100
    },
    level: {
      type: String,
      default: "H"
    },


  },
  methods: {
    printQrImage() {

    },
    downloadQrImage() {

    }
  }
}

</script>