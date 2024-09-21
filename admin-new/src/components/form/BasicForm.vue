<template>
    <NForm
        ref="formRef"
        :rules="formRules"
        label-placement="left"
        :model="formData"
        label-width="100"
    >
        <NGrid :cols="gridColSpanTotal">
            <NFormItemGi
                :span="gridColSpan"
                :path="schema.filed"
                v-for="schema in schemas"
                :key="schema.filed"
                :label="schema.label"
            >
                <template v-if="schema.type === 'input'">
                    <NInput
                        v-model:value="formData[schema.filed]"
                        v-bind="schema.props"
                    ></NInput>
                </template>
                <template v-if="schema.type === 'select'">
                    <NSelect
                        v-model:value="formData[schema.filed]"
                        v-bind="schema.props"
                    ></NSelect>
                </template>
                <template v-if="schema.type === 'slot'">
                    <slot :name="schema.filed"></slot>
                </template>
            </NFormItemGi>
        </NGrid>
    </NForm>
</template>
<script setup lang="ts">
import { NForm, NFormItem, type FormInst, type FormRules, NGrid, NFormItemGi, NInput, NSelect, type FormItemRule, type InputProps, type SelectProps } from 'naive-ui';
import { computed, ref , watch } from 'vue';
import { cloneDeep } from 'es-toolkit';

type ISchemaTypes = 'input' | 'select' | 'slot';
type IBasicFormSchemasBase<T extends ISchemaTypes> = {
    filed: string;
    label: string;
    type: T;
    props?: T extends 'input'
    ? InputProps
    : T extends 'select'
    ? SelectProps
    : never;
}
export type IBasicFormSchemas = {
    [k in ISchemaTypes]: IBasicFormSchemasBase<k>
}[ISchemaTypes]

interface IProps {
    rules?: FormRules,
    col: number;
    schemas: Array<IBasicFormSchemas>,
    data?: Record<string, any>,
}
const props = defineProps<IProps>();

watch(() => props.data, (data) => {
    if (data) {
        formData.value = cloneDeep(data);
    }
});

const formRef = ref<null | FormInst>(null);

const gridColSpanTotal = 24;
const gridColSpan = computed(() => gridColSpanTotal / props.col);

const formRules = computed(() => {
    if (!props.rules) {
        return {};
    }
    const rules: FormRules = cloneDeep(props.rules);

    Object.keys(rules)
        .forEach((key) => {
            let filedRules = props.rules![key];
            if (!Array.isArray(filedRules)) {
                filedRules = [filedRules];
            }

            filedRules.forEach((rule) => {
                if (rule.required) {
                    if (!(rule.message || rule.validator || rule.asyncValidator)) {
                        rule.message = '未填写该字段';
                    }
                    if (!rule.trigger) {
                        rule.trigger = 'blur';
                    }
                }
            });
        });

    return rules;
});

const formData = ref<Record<string, any>>({});

async function validateForm() {
    const formEl = formRef.value!;
    await formEl.validate();
    formEl.restoreValidation();
}

function resetForm() {
    Object.keys(formData.value)
        .forEach((key) => {
            formData.value[key] = null;
        });
    formRef.value!.restoreValidation();
}


defineExpose({
    formData,
    validateForm,
    resetForm,
});
</script>