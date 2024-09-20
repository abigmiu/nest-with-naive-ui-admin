<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';
import { useSlots } from 'vue';

interface IProps {
    auth: string | string[];
}

const props = defineProps<IProps>();
const slots = useSlots();
const userStore = useUserStore();

function render() {
    const hasPermission = userStore.hasPermissions(props.auth);
    if (hasPermission) {
        return slots.default?.();
    }
    return null;
}

</script>