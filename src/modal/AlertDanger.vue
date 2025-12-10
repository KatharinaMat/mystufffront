<template>
  <div v-if="alertMessage !== ''" class="alert alert-danger alert-dismissible fade show" role="alert">
    {{ alertMessage }}
    <button @click="$emit('event-alert-box-closed')" type="button" class="btn-close" data-bs-dismiss="alert"
            aria-label="Close"></button>
  </div>
</template>
<script>
export default {
  name: 'AlertDanger',
  props: {
    alertMessage: String
  }
}
</script>