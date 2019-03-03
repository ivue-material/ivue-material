<!-- <template>
    <div :class="classes" @click="handleClick">
        <div :class="cascaderClasses">
            <IvueInput
                :type="selectValue.length > 0 ? 'hidden' : 'text'"
                readonly
                placeholder="请选择"
                :value="selectValue"
                ref="input"
            >
                <template slot="suffix">
                    <IvueIcon>{{arrowDownIcon}}</IvueIcon>
                </template>
            </IvueInput>
            <span :class="`">{{selectValue}}</span>
        </div>
    </div>
</template>
-->
<script>
import IvueCascaderMenu from './ivue-cascader-menu'
import IvueInput from '../ivue-input'
import IvueIcon from '../ivue-icon'

const prefixCls = 'ivue-cascader';

export default {
    name: prefixCls,
    props: {
        /**
        * 下拉图标
        *
        * @type{Boolean}
        */
        arrowDownIcon: {
            type: String,
            default: 'keyboard_arrow_down'
        },
        /**
         * 可选项数据源
         *
         * @type {Array}
         */
        options: {
            type: Array,
            required: true
        },
        /**
         * 配置选项
         *
         * @type {Object}
         */
        props: {
            type: Object,
            default () {
                return {
                    children: 'children',
                    label: 'label',
                    value: 'value',
                    disabled: 'disabled'
                };
            }
        },
    },
    data () {
        return {
            prefixCls: prefixCls,
            /**
             * 输入框数据
             *
             * @type {String}
             */
            selectValue: '',
            /**
            * 是否显示菜单
            *
            * @type {Boolean}
            */
            visibleMenu: false,
        }
    },
    computed: {
        classes () {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-visible`]: this.visibleMenu,
                }
            ]
        },
        cascaderClasses () {
            return [
                `${prefixCls}-selection-default`,
                `${prefixCls}-selection`,
            ]
        },
        // 整理数据
        currentLabels () {

        }
    },
    methods: {
        genInput () {
            return this.$createElement(IvueInput, {
                props: {
                    type: this.selectValue.length > 0 ? 'hidden' : 'text',
                    readonly: 'readonly',
                    placeholder: '请选择',
                    value: this.selectValue
                }
            }, [
                    this.$createElement(IvueIcon, {
                        slot: 'suffix',
                    }, this.arrowDownIcon)
                ]);
        },
        genLabel () {
            return this.$createElement('span', {
                class: `${prefixCls}-label`
            }, [this.selectValue]);
        },
        genCascader () {
            return this.$createElement('div', {
                class: this.cascaderClasses
            }, [this.genInput(), this.genLabel()]);
        },
        // 点击输入框
        handleClick () {
            this.visibleMenu = !this.visibleMenu;
        }
    },
    components: {
        IvueInput,
        IvueIcon,
        IvueCascaderMenu
    },
    render (h) {
        return h('div', {
            class: this.classes,
            on: {
                click: this.handleClick
            },
        }, [this.genCascader(),
        this.$createElement(IvueCascaderMenu, {
            props: {
                options: this.options,
                props: this.props
            }
        })
            ])
    }
}
</script>
