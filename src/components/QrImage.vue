<template>
  <!-- Render QR only if there is a value -->
  <div v-if="value" class="qr-wrapper" @click="handleClick">
    <QrcodeSvg :value="value" :size="size" :level="level"/>
  </div>
</template>

<script>
import {QrcodeSvg} from "qrcode.vue";

export default {
  name: "QrImage",
  components: {QrcodeSvg},
  props: {
    value: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 100
    },
    level: {
      type: String,
      default: "H"
    },

  }
};
</script>

