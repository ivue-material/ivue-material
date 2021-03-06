
import {
    h,
    ref,
    defineComponent,
    computed,
    reactive,
    withDirectives,
    resolveDirective,
    onMounted,
    watch,
    inject,
    nextTick,
    getCurrentInstance,
    onBeforeUnmount
} from 'vue'

// requestAnimationFrame polyfill for node and the browser.
import raf from 'raf';
import IvueListItemMixin from '../../utils/mixins/ivue-list-item';
import { IvueArrowDownIcon } from '../../utils/icons';
import ripple from '../../utils/directives/ripple';

const prefixCls = 'ivue-list-item-expand';

export default defineComponent({
    name: prefixCls,
    mixins: [IvueListItemMixin],
    directives: {
        ripple
    },
    // 声明事件
    emits: ['ivue-expanded', 'ivue-collapsed', 'update:ivueExpanded'],
    props: {
        // 显示/隐藏扩展面板的道具。应与 v-model 一起使用
        ivueExpanded: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, { slots, emit }) {
        const IvueList = <{
            pushExpandable: any,
            removeExpandable: any,
            expandATab: any
        }>inject('IvueList');

        // 支持访问内部组件实例
        const vm: any = getCurrentInstance();

        // data
        const data = reactive<{
            expandStyles: object,
            showContent: boolean
        }>({
            /**
             * 扩展样式
             *
             * @type {Object}
             */
            expandStyles: {},
            /**
             * 是否显示内容
             *
             * @type {Boolean}
             */
            showContent: false
        });

        // ref = listExpand
        const listExpand = ref(null)

        // computed
        const expandClass = computed(() => {
            return {
                'ivue-active': data.showContent
            }
        })

        // methods

        // 获取样式
        const fetchStyle = () => {
            return new Promise<void>((resolve) => {
                raf(() => {
                    let fullHeight: string | number = 0;

                    if (!data.showContent) {
                        fullHeight = 'auto';
                    }

                    data.expandStyles = { height: fullHeight };
                    resolve();
                })
            })
        }

        // 展开
        const toggleExpand = () => {
            fetchStyle().then(() => {
                data.showContent = !data.showContent;
            })
        }

        // 获取子级大小
        const getChildrenSize = () => {
            const expandEl = listExpand.value;
            let size = 0;

            Array.from(expandEl.children).forEach((child: any) => {
                size += child.offsetHeight;
            })
            return size;
        }

        // 展开
        const open = () => {
            if (data.showContent) {
                return false;
            }

            fetchStyle().then(() => {
                data.showContent = true;
            });
        }

        // 收起
        const close = () => {
            if (!data.showContent) {
                return false
            }

            fetchStyle().then(() => {
                data.showContent = false
            })
        }

        // onMounted
        onMounted(() => {
            IvueList.pushExpandable(vm);

            // 判断是否展开
            if (props.ivueExpanded) {
                open();
            }

            vm.close = close;
        });

        onBeforeUnmount(() => {
            IvueList.removeExpandable(vm);
        });


        // watch

        // 显示/隐藏扩展面板
        watch(() => props.ivueExpanded, (value) => {
            if (value) {
                open();
            }
            else {
                close();
            }
        });

        // 是否显示内容
        watch(() => data.showContent, () => {
            let showContent = data.showContent;

            emit('update:ivueExpanded', showContent)

            nextTick(() => emit(showContent ? 'ivue-expanded' : 'ivue-collapsed'));

            if (showContent) {
                IvueList.expandATab(vm);
            }
        });

        // 解析指令
        const rippleDirective = resolveDirective('ripple');

        return () => h('div', {
            class: [
                prefixCls,
                {
                    ...expandClass.value
                }
            ]
        },
            [withDirectives(h('div', {
                class: 'ivue-list-item-content',
                onClick: toggleExpand
            }, [slots.default(), h(IvueArrowDownIcon, { class: 'ivue-list-expand-icon' }, {})]),
                [[rippleDirective, true]]),
            h('div', {
                class: 'ivue-list-expand',
                ref: 'listExpand',
                style: data.expandStyles,

            }, slots.ivueExpand())]
        )
    },
})
