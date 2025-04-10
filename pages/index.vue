<template>
    <div class="container mt-3">
        <h1>Trang chủ</h1>
        <p>Danh sách sản phẩm</p>
        <nuxt-link to="/products/create" class="btn btn-primary">Tạo sản phẩm</nuxt-link>
        <use-table class="mt-3" :headers="['ID', 'Tên sản phẩm', 'Giá', 'Mô tả']"
            :rows="products.map(product => [product.id, product.name, product.price, product.description])"
            :actions="['Xem', 'Sửa', 'Xóa']" @action="handleAction" />
    </div>
</template>
<script setup>
import { useProducts } from '~/composables/useProducts.js';
import { useRouter } from 'vue-router';

const { products, getProducts, deleteProduct } = useProducts();
const router = useRouter();

onMounted(async () => {
    await getProducts();
});

const handleAction = async ({ action, id }) => {
    if (action === 'Xem') {
        router.push(`/products/${id}`);
    } else if (action === 'Sửa') {
        router.push(`/products/edit/${id}`);
    } else if (action === 'Xóa') {
        if (confirm('Bạn có chắc muốn xoá sản phẩm này?')) {
            await deleteProduct(id);
        }
    }
};
</script>