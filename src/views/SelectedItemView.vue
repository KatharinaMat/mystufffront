<template>
  <div>
    <HeaderComponent/>

    <div v-if="loading" class="text-center mt-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Laadimine...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger m-3">
      {{ error }}
    </div>

    <div v-else class="container mt-4">
      <div class="row mb-4">
        <div class="col">
          <h2>Item #{{ item.itemId }}</h2>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <img v-if="item.imageData"
               :src="`data:image/jpeg;base64,${item.imageData}`"
               alt="Item image"
               class="img-fluid rounded" />
        </div>
        <div class="col-md-6">
          <table class="table">
            <tbody>
            <tr>
              <th>Item:</th>
              <td>{{ item.itemName }}</td>
            </tr>
            <tr>
              <th>Date:</th>
              <td>{{ item.itemDate }}</td>
            </tr>
            <tr>
              <th>Model:</th>
              <td>{{ item.model }}</td>
            </tr>
            <tr>
              <th>Comment:</th>
              <td>{{ item.comment }}</td>
            </tr>
            </tbody>
          </table>

          <div class="mt-3">
            <button @click="goBack" class="btn btn-secondary me-2">Back</button>
            <button @click="downloadQR" class="btn btn-primary me-2">Download QR</button>
            <button @click="printItem" class="btn btn-info">Print</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import HeaderComponent from "@/components/Header.vue";

const route = useRoute();
const router = useRouter();

const item = ref({
  itemId: null,
  itemName: '',
  itemDate: '',
  model: '',
  comment: '',
  imageData: '',
  image_QR: null
});

const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  const itemId = route.query.itemId;

  if (!itemId) {
    error.value = 'Item ID puudub';
    loading.value = false;
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/item?itemId=${itemId}`);
    item.value = response.data;
  } catch (err) {
    error.value = 'Viga itemi laadimisel';
    console.error('Error:', err);
  } finally {
    loading.value = false;
  }
});

const goBack = () => {
  router.back();
};

const downloadQR = () => {
  if (item.value.image_QR) {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${item.value.image_QR}`;
    link.download = `qr-code-${item.value.itemId}.png`;
    link.click();
  }
};

const printItem = () => {
  window.print();
};
</script>

<style scoped>
.table th {
  width: 30%;
}
</style>