/**
 * https://github.com/freeze-component/vue-popper
 * */
import Vue from 'vue';
const isServer = Vue.prototype.$isServer;
const Popper = isServer ? function () { } : require('popper.js/dist/umd/popper.js');  // eslint-disable-line

/**
 * @param {HTMLElement} [reference=$els.reference] - The reference element used to position the popper.
 * @param {HTMLElement} [popper=$els.popper] - The HTML element used as popper, or a configuration used to generate the popper.
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end), right(-start, -end), bottom(-start, -right), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Boolean} [visible=false] Visibility of the popup element.
 * @param {Boolean} [visible-arrow=false] Visibility of the arrow, no style.
 */
export default {
    props: {
        /**
         * popper的位置
         *
         * @type {String}
         */
        placement: {
            type: String,
            default: 'bottom'
        },
        boundariesPadding: {
            type: Number,
            default: 5
        },
        /**
         * 用于定位popper的引用元素。
         *
         * @type {Object}
         * @default {this.$els.reference}
         */
        reference: Object,
        /**
         * 用作popper的HTML元素，或用于生成popper的配置
         *
         * @type {Object}
         * @default {this.$els.popper}
         */
        popper: Object,
        /**
         * 将被偏移的像素数量(可以是负数)
         *
         * @type {Number}
         */
        offset: {
            default: 0
        },
        /**
         * 可见性
         *
         * @type {Boolean}
         */
        value: {
            type: Boolean,
            default: false
        },
        transition: String,
        options: {
            type: Object,
            default () {
                return {
                    modifiers: {
                        computeStyle: {
                            gpuAcceleration: false
                        },
                        preventOverflow: {
                            boundariesElement: 'window'
                        }
                    }
                };
            }
        }
    },

    data () {
        return {
            visible: this.value
        }
    },

    watch: {
        value: {
            // 同步监听
            immediate: true,
            handler (val) {
                this.visible = val;
                this.$emit('input', val);
            }
        },
        visible (val) {
            if (val) {
                this.updatePopper();

                this.$emit('on-popper-show');
            }
            else {
                this.$emit('on-popper-hide');
            }

            this.$emit('input', val);
        }
    },

    methods: {
        createPopper () {
            // 判断是否是服务器端
            if (isServer) {
                return;
            }

            // 是否有位置
            if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(this.placement)) {
                return;
            }
            const options = this.options;
            const popper = this.popper || this.$refs.popper;
            const reference = this.reference || this.$refs.reference;

            // 判断是否有节点
            if (!popper || !reference) {
                return;
            }

            if (this.popperJS && this.popperJS.hasOwnProperty('destroy')) {
                this.popperJS.destroy();
            }

            options.placement = this.placement;

            // 创建偏移量
            if (!options.modifiers.offset) {
                options.modifiers.offset = {};
            }

            options.modifiers.offset.offset = this.offset;

            options.onCreate =()=>{
                this.$nextTick(this.updatePopper);
                this.$emit('created', this);
            };

            console.log(options)

            this.popperJS = new Popper(reference, popper, options);
        },
        // 更新节点
        updatePopper () {
            // 判断是否是服务器端
            if (isServer) {
                return;
            }

            if (this.popperJS) {
                this.popperJS.update();
            } else {
                this.createPopper();
            }
        },

        doDestroy () {
            // 判断是否是服务器端
            if (isServer) {
                return;
            }

            if (this.visible) {
                return;
            }

            this.popperJS.destroy();
            this.popperJS = null;
        },
    },

    updated () {
        this.$nextTick(() => this.updatePopper());
    },

    beforeDestroy () {
        // 判断是否是服务器端
        if (isServer) {
            return;
        }

        if (this.popperJS) {
            this.popperJS.destroy();
        }
    }
};
