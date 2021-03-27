<template>
    <div
        :class="classes"
        v-touch="{
            left: (e) => e.offsetX < -15 && arrowEvent(1),
            right: (e) => e.offsetX > 15 && arrowEvent(-1),
        }"
    >
        <!-- 左按钮 -->
        <ivue-button
            :class="arrowClasses"
            class="left ivue-icon-button"
            @click="arrowEvent(-1)"
            flat
            icon
        >
            <ivue-icon>{{ leftArrow }}</ivue-icon>
        </ivue-button>
        <!-- 内容 -->
        <div :class="[`${prefixCls}-list`]">
            <div
                :class="[
                    `${prefixCls}-track`,
                    data.showCopyTrack ? '' : 'higher',
                ]"
                :style="trackStyles"
                ref="originTrack"
                @click="handleClick('currentIndex')"
            >
                <slot></slot>
            </div>
            <!-- loop开启时使用 -->
            <div
                :class="[
                    `${prefixCls}-track`,
                    data.showCopyTrack ? 'higher' : '',
                ]"
                :style="copyTrackStyles"
                ref="copyTrack"
                v-if="loop"
                @click="handleClick('currentIndex')"
            ></div>
        </div>
        <!-- 右按钮 -->
        <ivue-button
            :class="arrowClasses"
            class="right ivue-icon-button"
            @click="arrowEvent(1)"
            flat
            icon
        >
            <ivue-icon>{{ rightArrow }}</ivue-icon>
        </ivue-button>
        <!-- 导航器 -->
        <ul :class="dotsClasses">
            <li
                v-for="index in data.slides.length"
                :key="index"
                :class="[
                    index - 1 === data.currentIndex
                        ? `${prefixCls}-active`
                        : '',
                ]"
                @click="dotsEvent('click', index - 1)"
                @mouseover="dotsEvent('hover', index - 1)"
            >
                <button
                    type="button"
                    :class="[radiusDot ? 'radius' : '']"
                ></button>
            </li>
        </ul>
    </div>
</template>

<script lang='ts'>
import {
    defineComponent,
    reactive,
    computed,
    nextTick,
    onMounted,
    onBeforeUnmount,
    provide,
    watch,
    ref,
    getCurrentInstance
} from 'vue';

import Touch from '../../utils/directives/touch';
import { getStyle, oneOf } from '../../utils/assist';
import { on, off } from '../../utils/dom';

import { IvueButton } from '../ivue-button';
import { IvueIcon } from '../ivue-icon';

const prefixCls = 'ivue-carousel';

interface Props {
    arrow: string,
    leftArrow: string,
    rightArrow: string,
    easing: string,
    loop: boolean,
    height: string | number,
    modelValue: number,
    autoplay: boolean,
    autoplaySpeed: number,
    dots: string,
    radiusDot: boolean,
    trigger: string,
}

export default defineComponent({
    name: prefixCls,
    directives: { Touch },
    // 声明事件
    emits: ['on-change', 'on-click', 'current-index'],
    props: {
        /**
         * 切换箭头显示时机
         *
         * @type {String}
         *
         * hover（悬停），always（一直显示），never（不显示）
         */
        arrow: {
            type: String,
            default: 'hover',
            validator(value: string) {
                return oneOf(value, ['hover', 'always', 'never'])
            }
        },
        /**
         * 左箭头图标
         *
         * @type {String}
         */
        leftArrow: {
            type: String,
            default: 'keyboard_arrow_left'
        },
        /**
         * 右箭头图标
         *
         * @type {String}
         */
        rightArrow: {
            type: String,
            default: 'keyboard_arrow_right'
        },
        /**
         * 动画效果
         *
         * @type {String}
         */
        easing: {
            type: String,
            default: 'ease'
        },
        /**
         * 是否开启循环
         *
         * @type {Boolean}
         */
        loop: {
            type: Boolean,
            default: false
        },
        /**
         * 轮播图高度
         *
         * @type {String | Number}
         *
         * 可填 auto 或具体高度数值，单位 px
         */
        height: {
            type: [String, Number],
            default: 'auto',
            validator(value) {
                return value === 'auto' || Object.prototype.toString.call(value) === '[object Number]';
            }
        },
        /**
         * 幻灯片的索引
         *
         * @type {Number}
         */
        modelValue: {
            type: Number,
            default: 0
        },
        /**
         * 是否自动切换
         *
         * @type {Boolean}
         */
        autoplay: {
            type: Boolean,
            default: false
        },
        /**
         * 自动切换的时间间隔，单位为毫秒
         *
         * @type {Number}
         */
        autoplaySpeed: {
            type: Number,
            default: 2000
        },
        /**
         * 指示器的位置，可选值为 inside （内部），outside（外部），none（不显示）
         *
         * @type {String}
         */
        dots: {
            type: String,
            default: 'inside',
            validator(value: string) {
                return oneOf(value, ['inside', 'outside', 'none'])
            }
        },
        /**
         * 是否显示圆形指示器
         *
         * @type {Boolean}
         */
        radiusDot: {
            type: Boolean,
            default: false
        },
        /**
         * 指示器的触发方式，可选值为 click（点击），hover（悬停）
         *
         * @type {String}
         */
        trigger: {
            type: String,
            default: 'click',
            validator(value: string) {
                return oneOf(value, ['click', 'hover'])
            }
        }
    },
    setup(props: Props, { emit }) {

        // ref
        const copyTrack = ref(null);
        const originTrack = ref(null);

        // 支持访问内部组件实例
        const vm = getCurrentInstance();

        // data
        const data: any = reactive({
            /**
             * 列表内容宽度
             * @type {Number}
             */
            listWidth: 0,
            /**
             * 跟踪宽度
             * @type {Number}
             */
            trackWidth: 0,
            /**
             * 跟踪偏移位置
             * @type {Number}
             */
            trackOffset: 0,
            /**
             * 跟踪索引位置
             * @type {Number}
             */
            trackIndex: props.modelValue,
            /**
             * 跟踪内容偏移位置
             * @type {Number}
             */
            trackCopyOffset: 0,
            /**
             * 跟踪复制索引位置
             * @type {Number}
             */
            trackCopyIndex: props.modelValue,
            /**
             * 显示复制的内容
             * @type {Boolean}
             */
            showCopyTrack: false,
            /**
             * 滑动列表
             * @type {Array}
             */
            slides: [],
            /**
             * 滑动列表实例
             * @type {Array}
             */
            slideInstances: [],
            /**
             * 当前内容索引位置
             * @type {Number}
             */
            currentIndex: props.modelValue,
            /**
             * 跟踪滑动位置
             * @type {Number}
             */
            hideTrackPos: -1,
            /**
             * 子组件数据
             *
             * @type {Object}
             */
            childData: {}
        });

        // computed
        // 外城样式
        const classes = computed(() => {
            return [
                `${prefixCls}`
            ]
        });

        // 箭头样式
        const arrowClasses = computed(() => {
            return [
                `${prefixCls}-arrow`,
                `${prefixCls}-arrow-${props.arrow}`
            ]
        });

        // 内容样式
        const trackStyles = computed(() => {
            return {
                width: `${data.trackWidth}px`,
                transform: `translate3d(${-data.trackOffset}px, 0px, 0px)`,
                transition: `transform 500ms ${props.easing}`
            }
        });

        // 复制的内容的样式
        const copyTrackStyles = computed(() => {
            return {
                width: `${data.trackWidth}px`,
                transform: `translate3d(${-data.trackCopyOffset}px, 0px, 0px)`,
                transition: `transform 500ms ${props.easing}`,
                position: 'absolute',
                top: 0
            }
        });

        // dots 样式
        const dotsClasses = computed(() => {
            return [
                `${prefixCls}-dots`,
                `${prefixCls}-dots-${props.dots}`
            ]
        });

        // mounted
        // 当slot改变时使用
        const slotChange = (child) => {
            nextTick(() => {
                data.slides = [];
                data.slideInstances = [];

                // 更新滑动列表
                updateSlides(true);
                // 更新内容宽度高度
                updatePos();
                // 更新偏移位置
                updateOffset();
            });
        }

        // 更新滑动列表
        const updateSlides = (init) => {
            let slides = [];
            let index = 1;

            findChild((child) => {
                slides.push({
                    $el: child.children.default()[0].el
                });

                child.index = index++;

                if (init) {
                    data.slideInstances.push(child);
                }
            });


            // 获取滑动列表数量
            data.slides = slides;

            // 更新内容宽度高度
            updatePos();
        }

        // 找到子节点
        const findChild = (cb) => {
            const find = (child) => {
                const name = child.type.componentName;

                if (name && child.children.default) {
                    cb(child);
                }
            };

            const children = vm.slots.default();

            if (data.slideInstances.length || !children) {
                data.slideInstances.forEach((child) => {
                    find(child);
                });
            } else {
                children.forEach((child) => {
                    find(child);
                });
            }
        }

        // 更新内容宽度高度
        const updatePos = () => {

            findChild(() => {
                // 设置子节点宽度和高度
                data.childData.width = data.listWidth;
                data.childData.height = typeof props.height === 'number' ? `${props.height}px` : props.height;

            });

            // 跟踪宽度
            data.trackWidth = (data.slides.length || 0) * data.listWidth;
        }

        // 更新偏移位置
        const updateOffset = () => {
            nextTick(() => {
                let offset = data.trackCopyIndex > 0 ? -1 : 1;
                // 跟踪偏移位置
                data.trackOffset = data.trackIndex * data.listWidth;
                // 跟踪复制内容的偏移位置
                data.trackCopyOffset = data.trackCopyIndex * data.listWidth + offset;
            });
        }

        // 监听调整大小
        const handleResize = () => {
            // 当前列表宽度
            data.listWidth = parseInt(getStyle(vm.vnode.el, 'width'));

            // 更新内容宽度高度
            updatePos();
            // 更新偏移位置
            updateOffset();
        };

        // 设置自动播放
        const setAutoplay = () => {
            window.clearInterval(data.timer);

            if (props.autoplay) {
                data.timer = window.setInterval(() => {
                    add(1);
                }, props.autoplaySpeed);
            }
        }

        // 切换
        const add = (offset) => {
            // 获取内容数量
            let slidesLen = data.slides.length;

            if (slidesLen === 1) {
                return;
            }

            // 如果是无缝滚动，需要初始化双内容位置
            if (props.loop) {
                if (offset > 0) {
                    // 跟踪滑动位置
                    data.hideTrackPos = -1;
                }
                else {
                    // 跟踪滑动位置
                    data.hideTrackPos = slidesLen;
                }

                // 更新跟踪位置
                updateTrackPos(data.hideTrackPos);
            }

            // 获取当前显示图片的索引 如果显示复制的内容 跟踪复制索引位置 否则 跟踪索引位置
            const oldIndex = data.showCopyTrack ? data.trackCopyIndex : data.trackIndex;

            let index = oldIndex + offset;

            while (index < 0) {
                index += slidesLen;
            }

            // 判断到达边界点
            if (((offset > 0 && index === slidesLen) || (offset < 0 && index === slidesLen - 1)) && props.loop) {
                // 极限值（左滑：当前索引为总图片张数， 右滑：当前索引为总图片张数 - 1）切换内容

                // 显示复制的内容
                data.showCopyTrack = !data.showCopyTrack;
                // 跟踪索引位置
                data.trackIndex += offset;
                //  跟踪复制索引位置
                data.trackCopyIndex += offset;
            }
            else {
                if (!props.loop) {
                    index = index % data.slides.length;
                }

                // 更新跟踪索引
                updateTrackIndex(index);
            }

            // 当前内容索引
            data.currentIndex = index === data.slides.length ? 0 : index;

            // 发送点击事件
            emit('on-change', oldIndex, data.currentIndex);
            emit('current-index', data.currentIndex);
        };

        // 切换内容事件
        const arrowEvent = (offset) => {
            setAutoplay();
            add(offset);
        };

        // 更新跟踪位置
        const updateTrackPos = (index) => {
            // 显示复制的内容
            if (data.showCopyTrack) {
                // 跟踪索引位置
                data.trackIndex = index
            }
            else {
                // 跟踪复制索引位置
                data.trackCopyIndex = index;
            }
        };


        // 更新跟踪索引
        const updateTrackIndex = (index) => {
            // 显示复制的内容
            if (data.showCopyTrack) {
                // 跟踪复制索引位置
                data.trackCopyIndex = index;
            }
            else {
                // 跟踪索引位置
                data.trackIndex = index;
            }

            // 当前索引
            data.currentIndex = index;
        }


        // dots 点击
        const dotsEvent = (event, index) => {
            // 获取当前显示图片的索引 如果显示复制的内容 跟踪复制索引位置 否则 跟踪索引位置
            let currentIndex = data.showCopyTrack ? data.trackCopyIndex : data.trackIndex;

            if (event === props.trigger && currentIndex !== index) {
                // 更新跟踪索引
                updateTrackIndex(index);

                // 发送点击事件
                emit('current-index', index);

                // 激活时重置自动播放计时器
                setAutoplay();
            }
        };

        // 初始化数据
        const _initData = () => {
            data.currentIndex = props.modelValue;
            data.trackIndex = props.modelValue;
        }

        // 初始化复制内容节点 用于 loop 效果
        const initCopyTrackDom = () => {
            nextTick(() => {
                copyTrack.value.innerHTML = originTrack.value.innerHTML;
            });
        };

        // 点击幻灯片时触发，返回索引值
        const handleClick = (type) => {
            emit('on-click', data[type]);
        };

        // provide
        provide('childData', data.childData);

        // watch
        // 是否自动切换
        watch(() => props.autoplay, () => {
            setAutoplay();
        });

        // 是否自动切换速度
        watch(() => props.autoplaySpeed, () => {
            setAutoplay();
        });

        // 跟踪索引位置
        watch(() => data.trackIndex, () => {
            updateOffset();
        });

        // 跟踪复制索引位=置
        watch(() => data.trackCopyIndex, () => {
            updateOffset();
        });

        // 轮播图高度
        watch(() => props.height, () => {
            updatePos();
        });

        // 幻灯片的索引
        watch(() => props.modelValue, (value) => {
            updateTrackIndex(value);
            setAutoplay();
        });

        // 是否开启循环
        watch(() => props.loop, (value) => {
            // 监听调整大小
            handleResize();
            // 设置自动播放
            setAutoplay();
            // 初始化数据
            _initData();
            // 更新偏移位置
            updateOffset();

            if (value) {
                initCopyTrackDom();
            }
            else {
                data.showCopyTrack = false;
            }
        });

        onMounted(() => {
            // 监听调整大小
            handleResize();

            // 设置自动播放
            setAutoplay();

            // 监听缩放事件
            on(window, 'resize', handleResize);
        });

        onBeforeUnmount(() => {
            // 销毁监听缩放事件
            off(window, 'resize', handleResize);
        });

        return {
            prefixCls,
            // ref
            copyTrack,
            originTrack,
            // data
            data,
            // computed
            classes,
            arrowClasses,
            copyTrackStyles,
            trackStyles,
            dotsClasses,
            // methods
            slotChange,
            updateSlides,
            handleResize,
            handleClick,
            arrowEvent,
            dotsEvent,
            initCopyTrackDom
        }
    },
    components: {
        IvueButton,
        IvueIcon
    }
})
</script>
