<template>
  <div ref="input" :placeholder="placeholder" class="auto-input" contenteditable @input="changeText">
    {{ modelValue }}
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'AutoInput'
});

const props = withDefaults(defineProps<{
  placeholder: string;
}>(), {
  placeholder: '留下你的精彩评论吧'
})

const modelValue = defineModel({
  type: String
})

const changeText = (e: Event) => {
  const value = (e.target as HTMLInputElement).value;
  modelValue.value = value;
}

</script>

<style scoped lang="less">
.auto-input {
  font-size: 14rem;
  width: 100%;
  max-height: 70rem;
  overflow-y: scroll;
  padding: 0 5rem;
  outline: none;
}

.auto-input::-webkit-scrollbar {
  width: 0 !important;
}

.auto-input:empty::before {
  /*content: "留下你的精彩评论吧";*/
  content: attr(placeholder);
  color: #999999;
}

.auto-input:focus::before {
  content: none;
}
</style>
