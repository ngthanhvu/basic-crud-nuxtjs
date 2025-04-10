<template>
    <div class="container">
        <h1>Chi tiết sản phẩm</h1>
        <div v-if="product">
            <p>ID: {{ product.id }}</p>
            <p>Name: {{ product.name }}</p>
            <p>Price: {{ product.price }}</p>
            <p>Description: {{ product.description }}</p>
            <nuxt-link to="/" class="btn btn-secondary">Quay lại</nuxt-link>
        </div>
        <div v-else>
            <p class="text-danger">Không tìm thấy sản phẩm hoặc có lỗi xảy ra.</p>
        </div>
    </div>
</template>
<script setup>
useHead({
    title: 'Product Details',
    meta: [
        { name: 'description', content: 'View product details' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
});

import { useRoute } from 'vue-router';
import { useProducts } from '~/composables/useProducts.js';

const route = useRoute();
const { getProductById } = useProducts();
const product = ref(null);

onMounted(async () => {
    const id = route.params.id;
    product.value = await getProductById(id);
});
</script>