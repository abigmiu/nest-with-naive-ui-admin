<template>
    <NModal
        v-model:show="modelVisible"
        preset="card"
        size="huge"
        :bordered="false"
        :on-update:show="onModelVisibleChange"
        style="width: 600px"
        :mask-closable="false"
    >
        <template #header>
            {{ title }}
        </template>
        <slot></slot>
        <template #footer>
            <slot name="footer">
                <div class="flex justify-end">
                    <NButton type="primary" @click="onSubmit" :loading="loading">提交</NButton>
                </div>
            </slot>
        </template>
    </NModal>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { NModal, NButton } from 'naive-ui';

interface IProps {
    title: string;
    loading: boolean
}
const props = defineProps<IProps>();

interface IEmits {
    (e: 'submit'): void
}
const emits = defineEmits<IEmits>();

const modelVisible = ref(false);
const visible = defineModel({ default: false });
watch(visible, (val) => {
    modelVisible.value = val;
}, { immediate: true });
function onModelVisibleChange(val: boolean) {
    if (!val) {
        visible.value = false;
    }
}
function closeModal() {
    visible.value = false;
}


function onSubmit() {
    emits('submit');
}

defineExpose({
    closeModal,
});
</script>