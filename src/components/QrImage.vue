<template>
  <div>
    <QrCodeModal :qr-code-modal-is-open="qrCodeModalIsOpen" :qr-code="qrCode"
                 @event-close-modal="qrCodeModalIsOpen = false"/>

    <div v-if="qrCode" class="qr-wrapper" @click="handleClick">
      <QrcodeSvg :value="qrCode" :size="size" :level="level"/>
    </div>
  </div>
</template>

<script>
import {QrcodeSvg} from "qrcode.vue";
import QrCodeModal from "@/modal/QrCodeModal.vue";

export default {
  name: "QrImage",
  components: {QrCodeModal, QrcodeSvg},
  props: {
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
  data() {
    return {
      qrCodeModalIsOpen: false,
    }
  },
  methods: {
    handleClick() {
      this.qrCodeModalIsOpen = true
    },
  }
};
</script>
