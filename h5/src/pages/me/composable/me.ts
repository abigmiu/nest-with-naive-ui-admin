import type SlideRowList from "@/components/slide/SlideRowList.vue";
import { useBaseStoreOutside } from "@/store/pinia";
import { _css } from "@/utils/dom";
import { onMounted, ref } from "vue";

function getTransform(el: HTMLDivElement) {
    const transform = el.style.transform
    if (!transform) return 0
    const transformY = transform.substring(
        transform.indexOf('0px') + 5,
        transform.lastIndexOf('0px') - 4
    )
    return parseInt(transformY)
}

export function useMePageBusinessHook(
    ctx: {
        currentSlideItem: { el: HTMLDivElement },
        reachBottom: Function
    }
) {
    let fixedLocationY = 0;
    let startLocationY = 0;
    let startTime = 0;
    let lastMoveYDistance = 0;
    const canScroll = true;
    const acceleration = 1.2;
    const isScroll = ref(false);
    let initSlideHeight = 0;
    let canTransformY = 0;
    const tempScroll = ref(false)


    const baseStore = useBaseStoreOutside();
    const { bodyHeight } = baseStore;

    const floatFixed = ref(false);
    const floatShowName = ref(false);


    const floatRef = ref<HTMLDivElement | null>(null);
    const scrollRef = ref<HTMLDivElement | null>(null);
    const descRef = ref<HTMLDivElement | null>(null);
    const headerRef = ref<HTMLDivElement | null>(null);
    const videoSlideRowListRef = ref<InstanceType<typeof SlideRowList> | null>(null);
    const collectRef = ref<HTMLDivElement | null>(null);

    const elSizes = {
        headerHeight: 0,
        descHeight: 0,
        maxSlideHeight: 0,
        floatHeight: 0,
        videoSlideHeight: 0
    }

    let moveDistance = 0;
    let pageMoveDistance = 0;

    onMounted(() => {
        elSizes.headerHeight = headerRef.value.offsetHeight;
        elSizes.descHeight = descRef.value.offsetHeight;
        elSizes.floatHeight = floatRef.value.offsetHeight;
        initSlideHeight = bodyHeight - 50 - elSizes.descHeight - 50;
        canTransformY = elSizes.descHeight - elSizes.floatHeight;
    })

    function setSlideHeight(height: number) {
        elSizes.maxSlideHeight = height;
        elSizes.videoSlideHeight = height;
    }

    function touchStart(e: TouchEvent) {
        scrollRef.value.style.transition = 'none';
        fixedLocationY = startLocationY = e.touches[0].pageY;
        startTime = Date.now();
    }

    async function touchMove(e: TouchEvent) {
        onPageScroll();
        if (!canScroll) return;

        if (isScroll.value) {
            const currentSlideItem = ctx.currentSlideItem.el;
            if (currentSlideItem.scrollTop === 0) {
                tempScroll.value = isScroll.value = false;
                startLocationY = e.touches[0].pageY;
                lastMoveYDistance = -canTransformY;
            }
            return;
        }

        moveDistance = e.touches[0].pageY - startLocationY;

        pageMoveDistance = lastMoveYDistance + moveDistance * acceleration;


        // 手指往下划，页面向上动
        if (moveDistance > 0) {
            // 页面已经超过最顶部
            if (pageMoveDistance < 0) {
                onPageToUp();
            } else if (pageMoveDistance < 400) {
                stretchHeader();
            }
        } else {
            //手指往上划，页面向下动

            // 滑动位置没有超过作品
            if (Math.abs(pageMoveDistance) < canTransformY) {
                scrollRef.value.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
            } else {
                onPageDownOverTab();
            }
        }
    }

    function touchEnd(e: TouchEvent) {
        if (!canScroll) return;
        moveDistance = e.changedTouches[0].pageY - startLocationY;
        pageMoveDistance = lastMoveYDistance + moveDistance * acceleration;
        if (isScroll.value) {
            tempScroll.value = false;
            lastMoveYDistance = -canTransformY;
        } else {
            const endTime = Date.now();
            const gapTime = endTime - startTime;

            const endTransformY = Math.abs(canTransformY) - elSizes.maxSlideHeight - elSizes.videoSlideHeight;
            
            // 手指往下滑， 页面向上滚动
            if (moveDistance > 0) {
                if (pageMoveDistance > 0) {
                    headerReset();
                } else {
                    if (Math.abs(moveDistance) > 100 && gapTime > 100 && gapTime < 150) {
                        floatShowName.value = floatFixed.value = isScroll.value = false;
                        scrollRef.value.style.transition = 'none';
                        let transformY = getTransform(scrollRef.value);
                        let timer;
                        cancelAnimationFrame(timer);
                        const fn = () => {
                            
                            if (transformY < 0) {
                                transformY = transformY + 40;
                                scrollRef.value.style.transform = `translate3d(0,${transformY > 0 ? 0 : transformY}px,0)`;
                                timer = requestAnimationFrame(fn)
                            } else {
                                if (transformY !== 0) {
                                    // if (_css(headerRef.value, 'height') < 400) {
                                    //     headerRef.value.style.transition = 'none';
                                    //     headerRef.value.style.height = _css(headerRef.value, 'height') + 10 + 'px'
                                    //     timer = requestAnimationFrame(fn)
                                    // } else {
                                    //     headerRef.value.style.transition = 'all 0.6s';
                                    //     headerRef.value.style.height = elSizes.headerHeight + 'px';
                                    //     lastMoveYDistance = 0;
                                    //     cancelAnimationFrame(timer);
                                    // }
                                } else {
                                    lastMoveYDistance = 0;
                                    cancelAnimationFrame(timer);
                                }
                            }
                        }
                        timer = requestAnimationFrame(fn);
                    } else if (Math.abs(moveDistance) > 100 && gapTime > 150 && gapTime < 300) {
                        scrollRef.value.style.transition = 'all 0.3s';
                        scrollRef.value.style.transform = `translate3d(0,0,0)`;
                        lastMoveYDistance = 0;
                        floatShowName.value = floatFixed.value = isScroll.value = false;
                        tempScroll.value = isScroll.value = false;
                    } else {
                        lastMoveYDistance = pageMoveDistance;
                    }
                }

            } else {
                if (Math.abs(moveDistance) > 100 && gapTime < 250) {
                    //往下划
                    scrollRef.value.style.transition = 'all .3s'

                    scrollRef.value.style.transform = `translate3d(0,${-canTransformY}px,0)`
                    floatShowName.value = floatFixed.value = isScroll.value = true
                    tempScroll.value = false
                    lastMoveYDistance = -canTransformY

                } else {
                    //手指往上划，页面向下动
                    if (Math.abs(pageMoveDistance) < canTransformY) {

                        let endDistance = pageMoveDistance
                        if (Math.abs(moveDistance) > 20) {
                            if (moveDistance > 0) {
                                endDistance += 15
                            } else {
                                endDistance -= 15
                            }
                        }
                        lastMoveYDistance = endDistance
                        scrollRef.value.style.transition = 'all .3s'
                        scrollRef.value.style.transform = `translate3d(0,${endDistance}px,0)`

                    } else {
                        isScroll.value = true
                        tempScroll.value = false
                        lastMoveYDistance = -canTransformY
                    }
                }
            }
        }
    }

    /** 页面滚动超过了tab页 */
    function onPageDownOverTab() {
        // 固定头部的移动位置
        headerRef.value.style.height = elSizes.headerHeight + 'px';
        scrollRef.value.style.transform = `translate3d(0,${-canTransformY}px,0)`;
        if (!isScroll.value) {
            // 滚动视频列
            tempScroll.value = true;
            const scrollTop = Math.abs(pageMoveDistance) - elSizes.descHeight + elSizes.floatHeight
            const el = ctx.currentSlideItem.el;
            el.scrollTop = scrollTop;
            const reachBottomInstance = 60;
            if (el.scrollTop + el.clientHeight + reachBottomInstance < el.scrollHeight) {
                ctx.reachBottom();
            }
        }
    }

    /**
     * slideItem 定位到最顶部
     * @param group 是否几个slideItem 都操作
     */
    function slideItemScrollToTop(group = false) {
        if (!group) {
            ctx.currentSlideItem.el.scrollTop = 0;
        } else {
            const slideItems = ctx.currentSlideItem.el.parentNode.children;
            Array.from(slideItems).forEach((slideItem) => {
                slideItem.scrollTop = 0;
            })
        }

    }

    /** 页面滚动的时候的公共处理 */
    function onPageScroll() {
        if (pageMoveDistance > 0) {
            floatFixed.value = floatShowName.value = false;
        } else {
            floatFixed.value = Math.abs(pageMoveDistance) > 100;
            floatShowName.value = Math.abs(pageMoveDistance) > 150;
        }
    }

    /** 页面往上 */
    function onPageToUp() {
        if (Math.abs(pageMoveDistance) < canTransformY) {
            slideItemScrollToTop();
            tempScroll.value = false;
        }

        scrollRef.value.style.transform = `translate3d(0,${pageMoveDistance}px,0)`
    }

    /** 背景图拉伸 */
    function stretchHeader() {
        scrollRef.value!.style.transform = 'translate3d(0,0,0)';
        headerRef.value.style.transition = 'all 0s';
        headerRef.value.style.height = elSizes.headerHeight + pageMoveDistance / 2 + 'px';
    }

    /** 背景图拉伸恢复 */
    function headerReset() {
        headerRef.value.style.transition = 'all 0.3s';
        headerRef.value.style.height = elSizes.headerHeight + 'px';
        lastMoveYDistance = 0;
    }

    return {
        floatFixed,
        touchStart,
        touchMove,
        touchEnd,
        floatRef,
        scrollRef,
        descRef,
        headerRef,
        videoSlideRowListRef,
        collectRef,
        floatShowName,
        tempScroll,
        isScroll,
        setSlideHeight
    }
}