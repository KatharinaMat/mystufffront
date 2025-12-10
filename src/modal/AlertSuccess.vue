<template>
  <div v-if="alertMessage" class="alert alert-success alert-dismissible fade show" role="alert">
    {{ alertMessage }}
    <button type="button" class="btn-close" @click="closeAlert"></button>
  </div>
</template>
<script>
export default {
  name: 'AlertSuccess',
  props: {
    alertMessage: String
  },
  methods: {
    closeAlert() {
      this.$emit('alert-box-closed')
    }
  }
}
</script>