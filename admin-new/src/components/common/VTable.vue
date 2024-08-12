<template>
    <div>
        <ColumnSetting />
    </div>
    <div>
        <NDataTable></NDataTable>
    </div>
</template>
<script setup lang="ts">
import { NDataTable } from 'naive-ui';
import ColumnSetting from './components/ColumnSetting.vue';
</script>