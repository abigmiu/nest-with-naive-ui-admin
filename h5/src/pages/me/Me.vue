<template>
  <div class="Me">
    <SlideRowList name="baseSlide" style="width: 100%" v-model:active-index="baseActiveIndex">
      <!-- 左侧 -->
      <SlideItem>
        <div ref="floatRef" class="float" :class="floatFixed ? 'fixed' : ''">
          <div :style="floatFixed ? 'opacity: 0;' : ''" class="left" @click="$nav('/me/edit-userinfo')">
            <Icon icon="ri:edit-fill" />
            <span>编辑资料</span>
          </div>
          <transition name="fade">
            <div class="center" v-if="floatShowName">
              <p class="name f14 mt1r mb1r">{{ userInfo.nickname }}</p>
            </div>
          </transition>
          <div class="right">
            <div class="item" :style="floatFixed ? 'opacity: 0;' : ''" @click="$nav('/me/request-update')">
              <Icon class="finger" icon="fluent-emoji-high-contrast:middle-finger" />
            </div>
            <div class="item" :style="floatFixed ? 'opacity: 0;' : ''" @click="$nav('/message/visitors')">
              <Icon icon="eva:people-outline" />
            </div>
            <div class="item" @click="_no">
              <Icon icon="ic:round-search" />
            </div>
            <div class="item" @click.stop="baseActiveIndex = 1">
              <Icon icon="ic:round-menu" />
            </div>
          </div>
        </div>
        <div class="scroll" ref="scrollRef" @touchstart="touchStart($event)" @touchmove="touchMove($event)"
          @touchend="touchEnd($event)">
          <div ref="descRef" class="desc">
            <header ref="headerRef" :style="{
              backgroundImage: `url(${_checkImgUrl(userinfo.cover_url[0].url_list[0])})`
            }" @click="previewImg = _checkImgUrl(userinfo.cover_url[0].url_list[0])">
              <div class="info">
                <img :src="_checkImgUrl(userinfo.avatar_168x168.url_list[0])" class="avatar"
                  @click.stop="previewImg = _checkImgUrl(userinfo.avatar_300x300.url_list[0])" />
                <div class="right">
                  <p class="name">{{ userInfo.nickname }}</p>
                  <div class="number mb1r">
                    <span class="mr1r" v-if="userinfo.is_private">私密账号</span>
                    <span>抖音号：{{ userInfo.account }}</span>
                    <img src="../../assets/img/icon/me/qrcode-gray.png" alt="" @click.stop="$nav('/me/my-card')" />
                  </div>
                </div>
              </div>
            </header>
            <div class="detail">
              <div class="head">
                <div class="heat">
                  <div class="text" @click="isShowStarCount = true">
                    <span class="num">{{ _formatNumber(stats.likeCount) }}</span>
                    <span>获赞</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 0 })">
                    <span class="num">{{ _formatNumber(stats.friendCount) }}</span>
                    <span>朋友</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 0 })">
                    <span class="num">{{ _formatNumber(stats.followCount) }}</span>
                    <span>关注</span>
                  </div>
                  <div class="text" @click="$nav('/people/follow-and-fans', { type: 1 })">
                    <span class="num">{{ _formatNumber(stats.fansCount) }}</span>
                    <span>粉丝</span>
                  </div>
                </div>
                <div class="button" @click="$nav('/people/find-acquaintance')">添加朋友</div>
              </div>
              <div class="signature" @click="$nav('/me/edit-userinfo-item', { type: 3 })">
                <template v-if="!userinfo.signature">
                  <span>点击添加介绍，让大家认识你...</span>
                  <img src="../../assets/img/icon/me/write-gray.png" alt="" />
                </template>
                <div v-else class="text">{{ userInfo.intro || '暂无个性签名' }}</div>
              </div>
              <div class="more" @click="$nav('/me/edit-userinfo')">
                <div class="age item" v-if="userinfo.user_age !== -1">
                  <img v-if="userinfo.gender == 2" src="../../assets/img/icon/me/woman.png" alt="" />
                  <img v-if="userinfo.gender == 1" src="../../assets/img/icon/me/man.png" alt="" />
                  <span>{{ userinfo.user_age }}岁</span>
                </div>
                <div class="item" v-if="userinfo.province || userinfo.city">
                  {{ userinfo.province }}
                  <template v-if="userinfo.province && userinfo.city"> -</template>
                  {{ userinfo.city }}
                </div>
                <div class="item" v-if="userinfo.school?.name">
                  {{ userinfo.school.name }}
                </div>
              </div>
              <div class="other">
                <div class="item" @click="_no">
                  <Icon icon="iconamoon:shopping-card-light" />
                  <span>抖音商城</span>
                </div>
                <div class="item" @click="$nav('/me/my-music')">
                  <Icon icon="iconamoon:music-2-light" />
                  <span>我的音乐</span>
                </div>
                <div class="item" @click="_no">
                  <Icon icon="streamline:chat-two-bubbles-oval" />
                  <span>我的群聊</span>
                </div>
                <div class="item" @click="_no">
                  <Icon icon="iconamoon:shopping-card-light" />
                  <span>查看更多</span>
                </div>
              </div>
            </div>
          </div>
          <Indicator name="videoList" tabStyleWidth="25%" :tabTexts="['作品', '私密', '喜欢', '收藏']"
            v-model:active-index="contentIndex" ref="indicatorRef">
          </Indicator>
          <SlideRowList ref="videoSlideRowListRef" name="videoList" v-model:active-index="contentIndex">
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <Posters v-if="videos.my.total !== -1" :list="videos.my.list"></Posters>
              <Loading v-if="loadings.loading0" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到设为私密的作品和日常</span>
              </div>
              <Posters v-if="videos.private.total !== -1" mode="date" :list="videos.private.list"></Posters>
              <Loading v-if="loadings.loading1" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到自己的喜欢列表</span>
              </div>
              <Posters v-if="videos.like.total !== -1" :list="videos.like.list"></Posters>
              <Loading v-if="loadings.loading2" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
            <SlideItem class="SlideItem" @scroll="scroll" :style="SlideItemStyle">
              <div class="notice">
                <img src="../../assets/img/icon/me/lock-gray.png" alt="" />
                <span>只有你能看到自己的收藏列表</span>
              </div>
              <div class="collect" ref="collectRef">
                <div class="video" v-if="videos.collect.video.total !== -1">
                  <div class="top" @click="$nav('/me/collect/video-collect')">
                    <div class="left">
                      <img src="../../assets/img/icon/me/video-whitegray.png" alt="" />
                      <span>视频</span>
                    </div>
                    <div class="right">
                      <span>全部</span>
                      <dy-back direction="right"></dy-back>
                    </div>
                  </div>
                  <Posters v-if="videos.collect.video.total !== -1" :list="videos.collect.video.list"></Posters>
                </div>

                <div class="music" v-if="videos.collect.music.total !== -1">
                  <div class="top" @click="$nav('/me/collect/music-collect')">
                    <div class="left">
                      <img src="../../assets/img/icon/me/music-whitegray.png" alt="" />
                      <span>音乐</span>
                    </div>
                    <div class="right">
                      <span>全部</span>
                      <dy-back direction="right"></dy-back>
                    </div>
                  </div>
                  <div class="list">
                    <div class="item" @click.stop="$nav('/home/music', i)" :key="j"
                      v-for="(i, j) in videos.collect.music.list.slice(0, 3)">
                      <img class="poster" :src="_checkImgUrl(i.cover)" alt="" />
                      <div class="title">{{ i.name }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <Loading v-if="loadings.loading3" :is-full-screen="false"></Loading>
              <no-more v-else />
            </SlideItem>
          </SlideRowList>
        </div>
        <BaseFooter v-bind:init-tab="5" ref="footerRef" />
        <transition name="fade">
          <div class="mask" v-if="baseActiveIndex === 1" @click="baseActiveIndex = 0"></div>
        </transition>
      </SlideItem>

      <!-- 右侧 -->
      <SlideItem style="width: 70vw; overflow: auto">
        <transition name="fade1">
          <div class="ul" v-if="!isMoreFunction">
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/shopping.png" alt="" />
              <span>我的订单</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/wallet.png" alt="" />
              <span>钱包</span>
            </div>
            <div class="line"></div>

            <div class="li" @click="$nav('/me/my-card')">
              <img src="../../assets/img/icon/newicon/left_menu/qrcode.png" alt="" />
              <span>我的二维码</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/look-history')">
              <img src="../../assets/img/icon/newicon/left_menu/time.png" alt="" />
              <span>观看历史</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/clock.png" alt="" />
              <span>时间管理</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/workbench.png" alt="" />
              <span>创作者服务中心</span>
            </div>

            <div class="line"></div>

            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/bytedance-mini-app.png" alt="" />
              <span>小程序</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/gongyi.png" alt="" />
              <span>抖音公益</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/minor-protection/index')">
              <img src="../../assets/img/icon/newicon/left_menu/umbrella.png" alt="" />
              <span>未成年保护工具</span>
            </div>
            <div class="li" @click="_no">
              <img src="../../assets/img/icon/newicon/left_menu/headset.png" alt="" />
              <span>我的客服</span>
            </div>
            <div class="li" @click="$nav('/me/right-menu/setting')">
              <img src="../../assets/img/icon/newicon/left_menu/setting-one.png" alt="" />
              <span>设置</span>
            </div>
          </div>
          <div v-else class="more-function">
            <div class="title">生活服务</div>
            <div class="functions">
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/quan.png" alt="" />
                <span>卡券</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/sd-card.png" alt="" />
                <span>免流量</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/alarmmmmmmmmmmmm.png" alt="" />
                <span>视频彩铃</span>
              </div>
            </div>
            <div class="title">拓展功能</div>
            <div class="functions">
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/sun-one.png" alt="" />
                <span>我的动态</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/download.png" alt="" />
                <span>我的缓存</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/hot.png" alt="" />
                <span>上热门</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/shop.png" alt="" />
                <span>小店随心推</span>
              </div>
              <div class="function" @click="_no">
                <img src="../../assets/img/icon/newicon/left_menu/yuandi.png" alt="" />
                <span>投教园地</span>
              </div>
            </div>
          </div>
        </transition>
        <div class="button-ctn">
          <div class="button" v-if="!isMoreFunction" @click="isMoreFunction = true">
            <img src="../../assets/img/icon/newicon/left_menu/more.png" alt="" />
            <span>更多功能</span>
          </div>
          <div class="button" v-if="isMoreFunction" @click="isMoreFunction = false">
            <span>返回</span>
          </div>
        </div>
      </SlideItem>
    </SlideRowList>
    <transition name="fade">
      <div class="preview-img" v-if="previewImg" @click="previewImg = ''">
        <img class="resource" :src="previewImg" alt="" />
        <img class="download" src="@/assets/img/icon/components/video/download.png" alt="" @click.stop="_no" />
      </div>
    </transition>

    <ConfirmDialog v-model:visible="isShowStarCount"
      :subtitle="`&quot;${userinfo.nickname}&quot;共获得${_formatNumber(userinfo.aweme_count)}个赞`" okText="确认"
      cancelText="取消" @ok="isShowStarCount = false" @cancel="isShowStarCount = false">
      <template v-slot:header>
        <img style="width: 100%" src="../../assets/img/icon/star-bg.png" alt="" />
      </template>
    </ConfirmDialog>
  </div>
</template>
<script setup lang="ts">
import Posters from '../../components/Posters'
import Indicator from '../../components/slide/Indicator'
import { computed, nextTick, onActivated, onMounted, reactive, ref, watch } from 'vue'
import { mapState, storeToRefs } from 'pinia'
import { _css } from '@/utils/dom'
import bus from '../../utils/bus'
import ConfirmDialog from '../../components/dialog/ConfirmDialog'
import { _checkImgUrl, _formatNumber, _getUserDouyinId, _no, _stopPropagation } from '@/utils'
import { likeVideo, myVideo, privateVideo } from '@/api/videos'
import { useBaseStore } from '@/store/pinia'
import { userCollect } from '@/api/user'
import SlideRowList from '@/components/slide/SlideRowList.vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/user'
import { useMePageBusinessHook } from './composable/me'
import type BaseFooter from '@/components/BaseFooter.vue'

defineOptions({
  name: 'Me'
})


const contentIndex = ref(0)
let currentSlideItem: {
  el: HTMLDivElement | null
} = {
  el: null
};

const indicatorRef = ref<InstanceType<typeof Indicator> | null>(null);
const footerRef = ref<InstanceType<typeof BaseFooter> | null>(null);
const {
  floatRef,
  scrollRef,
  descRef,
  headerRef,
  videoSlideRowListRef,
  collectRef,
  touchEnd,
  touchMove,
  touchStart,
  floatFixed,
  floatShowName,
  isScroll,
  tempScroll,
  setSlideHeight
} = useMePageBusinessHook({
  currentSlideItem,
  reachBottom: () => loadMoreData()
});

// 设置slide高度
onMounted(async () => {
  await nextTick();
  const height = bodyHeight.value
    - floatRef.value.clientHeight
    - indicatorRef.value.$el.clientHeight
    - footerRef.value.$el.clientHeight
  videoSlideRowListRef.value.$el.style.height = `${height}px`;
  setSlideHeight(height);
})

function setCurrentSlideItem() {
  currentSlideItem.el = videoSlideRowListRef.value.$el.querySelectorAll('.SlideItem')[contentIndex.value]
}

watch(() => contentIndex.value, setCurrentSlideItem);
onMounted(setCurrentSlideItem)

const previewImg = ref('');

const baseActiveIndex = ref(0)
const tabContents = ref([]);
const isShowStarCount = ref(false)

const isMoreFunction = ref(false);

const videos = reactive({
  my: { list: [], total: -1, pageNo: 0 },
  private: { list: [], total: -1, pageNo: 0 },
  like: { list: [], total: -1, pageNo: 0 },
  collect: {
    video: { list: [], total: -1 },
    music: { list: [], total: -1 }
  }
})
const pageSize = ref(15);
const loadings = reactive({
  loading0: false,
  loading1: false,
  loading2: false,
  loading3: false
})



const SlideItemStyle = computed(() => {
  if (tempScroll.value || isScroll.value) {
    return {
      overflow: 'auto'
    }
  }
  return {
    overflow: 'hidden'
  }
})

const baseStore = useBaseStore();
const userStore = useUserStore();
const { userinfo, bodyHeight, bodyWidth } = storeToRefs(baseStore)
const { userInfo, stats } = storeToRefs(userStore);

onActivated(() => {
  userStore.getUserStats();
})

watch(() => contentIndex.value, async (newVal, oldVal) => {
  changeIndex(newVal, oldVal);

})
onMounted(() => {
  loadMoreData();
})


const router = useRouter();
const $nav = (path) => router.push(path);
const setLoadingFalse = () => {
  loadings.loading0 = false;
  loadings.loading1 = false;
  loadings.loading2 = false;
  loadings.loading3 = false;
}
const click = (e) => {
  if (baseActiveIndex.value === 0) return;

  if (baseActiveIndex.value === 1) {
    baseActiveIndex.value = 0;
    _stopPropagation(e);
  }
}

const changeIndex = async (newVal, oldVal) => {
  if (loadings[`loading${newVal}`]) return;
  let videoOb = videos[Object.keys(videos)[newVal]]
  if (newVal === 3) {
    if (videoOb.video.total === -1) {
      loadings['loading' + newVal] = true
      let res = await userCollect()
      videos.collect = res
    }
  } else {
    if (videoOb.total === -1) {
      loadings['loading' + newVal] = true
      let res
      switch (newVal) {
        case 0:
          res = await myVideo({
            pageNo: videos.my.pageNo,
            pageSize: pageSize
          })
          videos.my = res
          break
        case 1:
          res = await privateVideo({
            pageNo: videos.private.pageNo,
            pageSize: pageSize
          })
          videos.private = res
          break
        case 2:
          res = await likeVideo({
            pageNo: videos.like.pageNo,
            pageSize: pageSize
          })
          videos.like = res
          break
      }
    }
  }
}
const loadMoreData = async () => {
  // if (loadings[`loading${contentIndex.value}`]) {
  //   return;
  // }
  let videoOb = videos[Object.keys(videos)[contentIndex.value]]

  if (contentIndex.value !== 3 && videoOb.total > videoOb.list.length) {
    videoOb.pageNo++
    loadings['loading' + contentIndex.value] = true
    let res
    switch (contentIndex.value) {
      case 0:
        res = await myVideo({
          pageNo: videoOb.pageNo,
          pageSize: pageSize
        })
        break
      case 1:
        res = await privateVideo({
          pageNo: videoOb.pageNo,
          pageSize: pageSize
        })
        break
      case 2:
        res = await likeVideo({
          pageNo: videoOb.pageNo,
          pageSize: pageSize
        })
        break
      case 3:
        res = await userCollect({
          pageNo: videoOb.pageNo,
          pageSize: pageSize
        })
        break
    }
    loadings['loading' + contentIndex.value] = false
    videoOb.list = videoOb.list.concat(res.data.list)
  }
}

async function scroll() {
  if (isScroll.value) {
    let SlideItem = currentSlideItem.el!
    if (SlideItem.scrollHeight - SlideItem.clientHeight < SlideItem.scrollTop + 60) {
      loadMoreData()
    }
  }
}
</script>

<style scoped lang="less">
@import 'Me';
</style>
