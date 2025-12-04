<template>
  <div>
    <img v-if="imageData === null || imageData === ''" src="../assets/images/placeholder_receipt.webp" class="img-thumbnail">
    <img v-else :src="imageData" class="img-thumbnail">
  </div>
</template>
<script>
export default {
  name: 'ItemImage',
  props: {
    imageData: String
  }
}
</script>