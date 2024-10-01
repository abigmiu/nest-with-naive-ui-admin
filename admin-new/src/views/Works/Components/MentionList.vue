<template>
    <div class="mention-list">
        <ScrollView :loading="loading" @reach-bottom="fetchList">
            <div v-for="item in list" :key="item" class="list-item">{{ item }}</div>
        </ScrollView>
    </div>
</template>
<script setup lang="ts">
import { useState } from '@/hooks/common';
import { ref } from 'vue';
import ScrollView from '@/components/common/ScrollView.vue';

const [loading, setLoading] = useState(false);
const list = ref<any[]>([]);
const fetchList = () => {
    
};
</script>