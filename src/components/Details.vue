<template>
  <div class="item-details-form">
    <!-- Item -->
    <div class="detail-row">
      <span class="detail-label">Item</span>
      <input v-model="item.itemName" type="text" class="form-control detail-input" :readonly="isView"/>
    </div>
    <!-- Date -->
    <div class="detail-row">
      <span class="detail-label">Date</span>
      <input v-model="item.itemDate" type="date" class="form-control detail-input" :readonly="isView"
      />
    </div>
    <!-- Model -->
    <div class="detail-row">
      <span class="detail-label">Model</span>
      <input v-model="item.model" type="text" class="form-control detail-input" :readonly="isView"
      />
    </div>
    <!-- Comment -->
    <div class="detail-row">
      <span class="detail-label">Comment</span>
      <textarea
          v-model="item.comment"
          class="form-control detail-input detail-comment"
          :readonly="isView"
          rows="2"
      ></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "Details",
  props: {
    // parent gives you an object like { itemName: '', itemDate: '', ... }
    item: {
      type: Object,
      required: true
    },
    // 'view' | 'edit' | 'add'
    mode: {
      type: String,
      default: 'view'
    }
  },
  computed: {
    isView() {
      return this.mode === 'view'
    }
  }
}
</script>
