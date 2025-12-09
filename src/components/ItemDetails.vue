<template>
  <div v-if="isView" class="details-header">
  <h1 class="details-title">View item #{{item.itemName}}</h1>
    <div v-if="imageQrPath" class="details-qr">
    <QrImage :value="imageQrPath" />
  </div>
  </div>
  <!--ItemDetails-->
  <div class="details-layout">
    <div class="item-details-form">
      <!-- Item -->
      <div class="detail-row">
        <span class="detail-label">Item</span>
        <input :value="item.itemName" type="text" class="form-control detail-input" :readonly="isView"
          @input="$emit('event-item-name-updated', $event.target.value)"
        />
      </div>
      <!-- Date -->
      <div class="detail-row">
        <span class="detail-label">Date</span>
        <input :value="item.itemDate" type="date" class="form-control detail-input" :readonly="isView"
               @input="$emit('event-item-date-updated', $event.target.value)"
        />
      </div>
      <!-- Model -->
      <div class="detail-row">
        <span class="detail-label">Model</span>
        <input :value="item.model" type="text" class="form-control detail-input" :readonly="isView"
               @input="$emit('event-item-model-updated', $event.target.value)"
        />
      </div>
      <!-- Comment -->
      <div class="detail-row">
        <span class="detail-label">Comment</span>
        <textarea
            :value="item.comment" class="form-control detail-input detail-comment" :readonly="isView"
            @input="$emit('event-item-comment-updated', $event.target.value)"
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
  name: "ItemDetails",
  components: {ImageInput, ItemImage, QrImage},
  props: {
    isView: Boolean,
    item: Object,
    imageQrPath: String
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
