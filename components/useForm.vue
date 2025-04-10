<template>
    <form @submit.prevent="handleSubmitForm">
        <div v-for="(field, index) in fields" :key="index" class="mb-3">
            <label :for="field.name">{{ field.label }}</label>

            <input v-if="field.type === 'text' || field.type === 'number'" :type="field.type" class="form-control"
                :id="field.name" v-model="form[field.name]" :placeholder="field.placeholder" />

            <!-- Add more field types here like select, textarea... -->
        </div>

        <div class="mb-3">
            <button type="submit" class="btn btn-primary">
                {{ isEdit ? 'Cập nhật' : 'Tạo mới' }}
            </button>
        </div>
    </form>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps({
    fields: Array,         // Mảng cấu hình field
    modelValue: Object,    // Giá trị ban đầu nếu có
    isEdit: Boolean
});
const emit = defineEmits(['submit']);

const form = reactive({});

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            for (const key in val) {
                form[key] = val[key];
            }
        }
    },
    { immediate: true }
);

// Khởi tạo field rỗng nếu không có modelValue
props.fields?.forEach(field => {
    if (!(field.name in form)) {
        form[field.name] = field.default ?? '';
    }
});

const handleSubmitForm = () => {
    emit('submit', { ...form });
};
</script>
