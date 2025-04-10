<template>
    <table class="table table-bordered table-hover text-center">
        <thead class="table-dark">
            <tr>
                <th v-for="(header, index) in headers" :key="index">
                    {{ header }}
                </th>
                <th v-if="actions.length">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
                <td v-for="(value, colIndex) in row" :key="colIndex">
                    {{ value }}
                </td>
                <td v-if="actions.length">
                    <button v-for="action in actions" :key="action" class="btn btn-sm me-1" :class="{
                        'btn-outline-info': action === 'Xem',
                        'btn-outline-warning': action === 'Sửa',
                        'btn-outline-danger': action === 'Xóa'
                    }" @click="emitAction(action, row[0])">
                        {{ action }}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup>
const props = defineProps({
    headers: Array,
    rows: Array,
    actions: {
        type: Array,
        default: () => []
    }
});
const emit = defineEmits(['action']);

const emitAction = (action, id) => {
    emit('action', { action, id });
};
</script>