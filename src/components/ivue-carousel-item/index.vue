<template>
    <div :class="prefixCls" :style="styles" ref="carousel-item">
        <slot></slot>
    </div>
</template>

<script lang='ts'>
import {
    defineComponent,
    reactive,
    computed,
    watch,
    nextTick,
    onMounted,
    onBeforeUnmount,
    inject,
    getCurrentInstance
} from 'vue';

const prefixCls = 'ivue-carousel-item';

export default defineComponent({
    name: prefixCls,
    componentName: 'ivue-carousel-item',
    setup() {
        const childData = inject('childData');

        // 支持访问内部组件实例
        const vm: any = getCurrentInstance();

        // data
        const data = reactive({
            /**
             * 宽度
             *
             * @type {Number}
             */
            width: 0,
            /**
             * 高度
             *
             * @type {String | Number}
             */
            height: 'auto',
            /**
             * 偏移
             *
             * @type {Number}
             */
            left: 0,
        });

        const styles = computed(() => {
            return {
                width: `${data.width}px`,
                height: `${data.height}px`,
                left: `${data.left}px`
            }
        });

        onMounted(() => {
            // 改变轮播图位置
            vm.parent.ctx.slotChange(vm);
        });

        onBeforeUnmount(() => {
            // 改变轮播图位置
            vm.parent.ctx.slotChange(vm);
        });

        // 监听宽度
        watch(childData, (value: any) => {
            data.width = value.width;
            data.height = value.height;

            if (value && vm.parent.ctx.loop) {
                nextTick(() => {
                    // 初始化复制内容节点 用于 loop 效果
                    vm.parent.ctx.initCopyTrackDom();
                })
            }
        });

        return {
            prefixCls,
            styles
        }
    },
})
</script>
