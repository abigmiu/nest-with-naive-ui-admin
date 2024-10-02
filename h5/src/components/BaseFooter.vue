<template>
    <div v-if="visible" class="footer" :class="{ isWhite }">
        <div class="l-button" @click="refresh(1)">
            <span v-if="!isRefresh1" :class="{ active: currentTab === 1 }">首页</span>
            <img v-if="isRefresh1" src="../assets/img/icon/refresh1.png" alt="" class="refresh" />
        </div>
        <div class="l-button" @click="refresh(2)">
            <span v-if="!isRefresh2" :class="{ active: currentTab === 2 }">商城</span>
            <img v-if="isRefresh2" src="../assets/img/icon/refresh1.png" alt="" class="refresh" />
        </div>
        <div class="l-button" @click="tab(3)">
            <div class="add-ctn">
                <img src="../assets/img/icon/add-light.png" alt="" class="add" />
            </div>
        </div>
        <div class="l-button" @click="tab(4)">
            <span :class="{ active: currentTab === 4 }">消息</span>
            <div class="badge">2</div>
        </div>
        <div class="l-button" @click="tab(5)">
            <span :class="{ active: currentTab === 5 }">我</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import bus, { EVENT_KEY } from '../utils/bus'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

defineOptions({
    name: 'BaseFooter'
})

const props = defineProps<{
    initTab?: any,
    isWhite?: any
}>()

const userStore = useUserStore();
const userInfo = computed(() => userStore.userInfo);

const isRefresh1 = ref(false);
const isRefresh2 = ref(false);
const currentTab = props.initTab;
const visible = ref(true);

bus.on('setFooterVisible', (e) => (visible.value = e))
bus.on(EVENT_KEY.ENTER_FULLSCREEN, () => (visible.value = false))
bus.on(EVENT_KEY.EXIT_FULLSCREEN, () => (visible.value = true))

onUnmounted(() => {
    bus.off(EVENT_KEY.ENTER_FULLSCREEN)
    bus.off(EVENT_KEY.EXIT_FULLSCREEN)
})

const router = useRouter();
const $nav = (path: string) => router.push(path);

const tab = (index: number) => {
    switch (index) {
        case 1:
            $nav('/');
            break;
        case 2:
            $nav('/shop')
            break
        case 3:
            $nav('/publish')
            break
        case 4:
            $nav('/message')
            break
        case 5:
            onNavToMe();
            break
    }
}

const refresh = (index: number) => {
    if (currentTab === index) {
        const refresh = index === 1 ? isRefresh1 : isRefresh2;
        refresh.value = !refresh.value;
        setTimeout(() => {
            refresh.value = !refresh.value;
        }, 2000)
    } else {
        tab(index);
    }
}


const onNavToMe = () => {
    if (!userInfo.value) {
        $nav('/login/password')
        return;
    } else {
        $nav('/me')
    }
}

</script>

<style scoped lang="less">
@import '../assets/less/index';

.footer {
    font-size: 14rem;
    position: fixed;
    width: 100%;
    height: var(--footer-height);
    //border-top: 1px solid #7b7878;
    z-index: 2;
    //不用bottom：0是因为，在进行页面切换的时候，vue的transition
    // 会使footer的bottom：0失效，不能准确定位
    top: calc(var(--vh, 1vh) * 100 - var(--footer-height));
    //bottom: 0;
    background: var(--footer-color);
    color: white;
    display: flex;
    //justify-content: space-between;

    &.isWhite {
        background: white !important;
        color: #000 !important;
    }

    .l-button {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        font-size: 16rem;

        .refresh {
            width: 25%;
            animation: rotate 0.5s linear infinite;
        }

        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(-360deg);
            }
        }

        .add-ctn {
            cursor: pointer;
            @height: 27rem;
            @width: 36rem;
            height: @height;
            width: @width;
            border-radius: 6rem;
            box-sizing: border-box;
            padding: 0 2rem;
            border: 3rem solid white;
            background: black;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
                width: 20rem;
            }
        }

        span {
            cursor: pointer;

            font-weight: bold;
            opacity: 0.7;

            &.active {
                opacity: 1;
            }
        }

        .badge {
            right: 14rem;
            top: 12rem;
            position: absolute;
        }
    }
}
</style>
