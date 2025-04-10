<template>
    <div class="container mt-3">
        <h1>Cập nhật sản phẩm</h1>

        <use-form :fields="[
            { name: 'name', label: 'Tên sản phẩm', type: 'text', placeholder: 'Nhập tên' },
            { name: 'price', label: 'Giá', type: 'number', placeholder: 'Nhập giá' },
            { name: 'description', label: 'Mô tả', type: 'text', placeholder: 'Nhập mô tả' }
        ]" :model-value="product" :is-edit="true" @submit="handleFormSubmit" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useProducts } from '~/composables/useProducts.js';

const { getProductById, updateProduct } = useProducts();
const route = useRoute();
const router = useRouter();
const product = ref(null);

onMounted(async () => {
    const id = route.params.id;
    product.value = await getProductById(id);
});

const handleFormSubmit = async (formData) => {
    await updateProduct(route.params.id, formData);
    router.push('/');
};
</script>
