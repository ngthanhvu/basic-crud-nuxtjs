export const useProducts = () => {
    const API_URL = 'https://67cf0c97823da0212a81360c.mockapi.io';
    const products = ref([]);
    const loading = ref(false);

    const getProducts = async () => {
        loading.value = true;
        try {
            const response = await fetch(`${API_URL}/products`);
            products.value = await response.json();
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            loading.value = false;
        }
    };

    const createProduct = async (product) => {
        try {
            const response = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const newProduct = await response.json();
            products.value.push(newProduct);
            if (response.ok) {
                console.log('Product created successfully:', newProduct);
                alert('Product created successfully!');
            }
            else {
                console.error('Failed to create product:', newProduct);
            }
        } catch (error) {
            console.error('Error creating product:', error);
        }
    };

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                products.value = products.value.filter(product => product.id !== id);
                console.log('Product deleted successfully');
                alert('Product deleted successfully!');
            }
            else {
                console.error('Failed to delete product');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const getProductById = async (id) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`);
            if (!response.ok) throw new Error('Không tìm thấy sản phẩm');
            return await response.json();
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            return null;
        }
    };


    const updateProduct = async (id, product) => {
        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            if (response.ok) {
                console.log('Product updated successfully');
            }
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };


    return {
        products,
        loading,
        getProducts,
        createProduct,
        deleteProduct,
        getProductById,
        updateProduct,
    };
}