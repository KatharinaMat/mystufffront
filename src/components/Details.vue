<template>
  <div v-if="isView" class="details-header">
  <h1 class="details-title">View item #{{item.itemName}}</h1>
    <div v-if="qrValue" class="details-qr">
    <QrImage :value="qrValue" />
  </div>
  </div>
  <!--Details-->
  <div class="details-layout">
    <div class="item-details-form">
      <!-- Item -->
      <div class="detail-row">
        <span class="detail-label">Item</span>
        <input v-model="item.itemName" type="text" class="form-control detail-input" :readonly="isView"/>
      </div>
      <!-- Date -->
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <input v-model="item.itemDate" type="date" class="form-control detail-input" :readonly="isView"/>
      </div>
      <!-- Model -->
      <div class="detail-row">
        <span class="detail-label">Model</span>
        <input v-model="item.model" type="text" class="form-control detail-input" :readonly="isView"/>
      </div>
      <!-- Comment -->
      <div class="detail-row">
        <span class="detail-label">Comment</span>
        <textarea
            v-model="item.comment" class="form-control detail-input detail-comment" :readonly="isView"
            rows="2"></textarea>
      </div>
    </div>
    <!-- RIGHT: image (and optional input) -->
    <div class="details-image-panel">
      <!-- shows placeholder or real image -->
      <ItemImage :imageData="item.imageData"/>

      <!-- only show input in add/edit modes -->
      <ImageInput
          v-if="!isView"
          @event-new-image-selected="onNewImageSelected"
          @event-chosen-image-cleared="onImageCleared"
      />
    </div>

  </div>
</template>

<script>
import ItemImage from "@/components/ItemImage.vue";
import ImageInput from "@/components/ImageInput.vue";
import QrImage from "@/components/QrImage.vue";
export default {
  name: "Details",
  components: {ImageInput, ItemImage, QrImage},
  props: {
    isView: Boolean,
    // parent gives you an object like { itemName: '', itemDate: '', ... }
    item: {
      type: Object,
      required: true
    },
    // 'view' | 'edit' | 'add'
    mode: {
      type: String,
      default: 'view'
    },
    itemId: {            // ⬅ NEW
      type: Number,
      required: false
    },
    qrValue: {
      type: String,
      default: ''
    }
  },
  methods: {
    onNewImageSelected(base64) {
      this.$emit("event-new-image-selected", base64);
    },
    onImageCleared() {
      this.$emit("event-chosen-image-cleared");
    },

  }
}
</script>
