<template>
  <Modal :modal-is-open="qrCodeModalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
  >
    <template #body>
      <div ref="qrContainer" style="padding: 20px; display: flex; justify-content: center;">
        <QrcodeSvg :value="qrCode" :size="300" :level="level"/>
      </div>
    </template>
    <template #buttons>
      <button @click="printQrImage" type="button" class="btn btn-custom">Print</button>
      <button @click="downloadQrImage" type="button" class="btn btn-custom">Download</button>
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
      default: 250
    },
    level: {
      type: String,
      default: "H"
    },


  },
  methods: {
    printQrImage() {
      const svg = this.$refs.qrContainer.querySelector('svg');
      const win = window.open('', '_blank');
      win.document.write(`
        <html>
          <body style="text-align:center;padding:50px;">
            <h2>QR Code</h2>
            ${svg.outerHTML}
            <script>window.print();</scr` + `ipt>
          </body>
        </html>
      `);
      win.document.close();
    },
    downloadQrImage() {
      const svg = this.$refs.qrContainer.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      link.click();

      URL.revokeObjectURL(url);

    }
  }
}

</script>