<template>
    <div>
        <NCard :bordered="false" title="工作台">
            <NGrid cols="2 s:1 m:1 l:2 xl:2 2xl:2" responsive="screen">
                <NGi>
                    <div class="flex items-center">
                        <div>
                            <NAvatar circle :size="64"  />
                        </div>
                        <div>
                            <p class="px-4 text-xl">早安，Ah jung，开始您一天的工作吧！</p>
                            <p class="px-4 text-gray-400">今日阴转大雨，15℃ - 25℃，出门记得带伞哦。</p>
                        </div>
                    </div>
                </NGi>
                <NGi>
                   
                </NGi>
            </NGrid>
        </NCard>
    </div>
</template>

<script setup lang="ts">
import { NCard, NGrid, NGi, NAvatar } from 'naive-ui';
</script>
