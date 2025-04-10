<template>
    <div class="container mt-3">
        <h1>Tạo sản phẩm</h1>

        <use-form :fields="[
            { name: 'name', label: 'Tên sản phẩm', type: 'text', placeholder: 'Nhập tên' },
            { name: 'price', label: 'Giá', type: 'number', placeholder: 'Nhập giá' },
            { name: 'description', label: 'Mô tả', type: 'text', placeholder: 'Nhập mô tả' }
        ]" :model-value="product" :is-edit="false" @submit="handleFormSubmit" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useProducts } from '~/composables/useProducts.js';

const { createProduct } = useProducts();
const router = useRouter();

const product = ref({
    name: '',
    price: 0,
    description: ''
});

const handleFormSubmit = async (formData) => {
    await createProduct(formData);
    router.push('/'); // Quay lại trang danh sách
};
</script>
