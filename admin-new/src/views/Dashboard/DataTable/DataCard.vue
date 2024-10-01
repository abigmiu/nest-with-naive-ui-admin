<template>
    <div>
        <NIcon size="24" class="cursor-pointer" :class="{ refresh: loading }">
            <Refresh></Refresh>
        </NIcon>
    </div>
    <NGrid x-gap="12" :cols="4">
        <NGi>
            <NCard>
                <div class="flex justify-center">
                    
                </div>
                <div class="title">今日订单总数</div>
                <div class="content">0</div>
            </NCard>
        </NGi>
        <NGi>
            <NCard>
                <div class="title">待处理订单数</div>
                <div class="content">0</div>
            </NCard>
        </NGi>
        <NGi>
            <NCard>
                <div class="title">今日销售总额</div>
                <div class="content">0</div>
            </NCard>
        </NGi>
        <NGi>
            <NCard>
                <div class="title">昨日销售总额</div>
                <div class="content">0</div>
            </NCard>
        </NGi>
        
    </NGrid>
</template>
<script setup lang="ts">
import { NGi, NGrid, NCard, NIcon } from 'naive-ui';
import { Refresh } from '@vicons/ionicons5';
import { ref } from 'vue';

const loading = ref(true);
</script>

<style lang="scss"  scoped>
.title {
    color: #909399;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 1px;
}

.content {
    color: #606266;
    font-size: 28px;
}

.refresh {
    animation: refresh 2s infinite linear;
}

@keyframes refresh {
    from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
} 
</style>