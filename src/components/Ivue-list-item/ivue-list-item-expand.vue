<template>
    <div class="ivue-list-item-expand" :class="expandClass">
        <div class="ivue-list-item-content" @click="toggleExpand" v-ripple="true">
            <slot></slot>
            <IvueArrowDownIcon class="ivue-list-expand-icon"></IvueArrowDownIcon>
        </div>
        <div class="ivue-list-expand" ref="listExpand" :style="expandStyles">
            <slot name="ivue-expand"></slot>
        </div>
    </div>
</template>

<script>
// requestAnimationFrame polyfill for node and the browser.
import raf from 'raf';

import ripple from '../../utils/directives/ripple';
import IvueListItemMixin from './ivue-list-item-mixin';
import IvueArrowDownIcon from '../../utils/icons/ivue-arrow-down-icon';

export default {
    name: 'ivue-list-item-expand',
    mixins: [IvueListItemMixin],
    // 一个字符串数组，或 一个对象，对象的 key 是本地的绑定名
    inject: ['IvueList'],
    data () {
        return {
            /*
            * 扩展样式
            *
            * @type {Object}
            */
            expandStyles: {},
            /*
            * 是否显示内容
            *
            * @type {Boolean}
            */
            showContent: false
        }
    },
    props: {
        ivueExpanded: {
            type: Boolean,
            default: false
        }
    },
    created () {
        this.IvueList.pushExpandable(this);
    },
    mounted () {
        if (this.ivueExpanded) {
            this.open();
        }
    },
    computed: {
        expandClass () {
            return {
                'ivue-active': this.showContent
            }
        }
    },
    methods: {
        // 获取子级大小
        getChildrenSize () {
            const expandEl = this.$refs.listExpand;
            let size = 0;

            Array.from(expandEl.children).forEach(child => {
                size += child.offsetHeight;
            })

            return size;
        },
        // 获取样式
        fetchStyle () {
            return new Promise(resolve => {
                raf(() => {
                    let fullHeight = 0;

                    if (!this.showContent) {
                        fullHeight = 'auto';
                    }

                    this.expandStyles = { height: fullHeight };

                    resolve();
                })
            })
        },
        toggleExpand () {
            this.fetchStyle().then(() => {
                this.showContent = !this.showContent;
            })
        },
        // 展开
        open () {
            if (this.showContent) {
                return false;
            }

            this.fetchStyle().then(() => {
                this.showContent = true;
            });
        },
        // 收齐
        close () {
            if (!this.showContent) {
                return false
            }

            this.fetchStyle().then(() => {
                this.showContent = false
            })
        }
    },
    beforeDestroy () {
        this.IvueList.removeExpandable(this)
    },
    components: {
        IvueArrowDownIcon
    },
    watch: {
        ivueExpanded () {
            if (this.ivueExpanded) {
                this.open();
            }
            else {
                this.close();
            }
        },
        showContent () {
            let showContent = this.showContent;
            this.$emit('update:ivueExpanded', showContent);
            this.$nextTick(() => this.$emit(showContent ? 'ivue-expanded' : 'ivue-collapsed'));

            if (showContent) {
                this.IvueList.expandATab(this);
            }
        }
    }
}
</script>
