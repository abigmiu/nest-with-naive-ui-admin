import { ref, type Ref, type UnwrapRef } from "vue";

export function useState<T>(defaultValue: T): [Ref<UnwrapRef<T>, T | UnwrapRef<T>>, (value: T) => void] {
    const state = ref<T>(defaultValue);
    const setState = (value: T) => {
        state.value = value;
    }
    return [state, setState]
}