<script lang='ts'>
import {
    defineComponent,
    h,
    PropType
} from 'vue';

import createListComponent from './createListComponent';
import { oneOf } from '../../utils/assist';

type Type = 'text' | 'button' | 'a';

const prefixCls = 'ivue-list-item';

export default defineComponent({
    name: prefixCls,
    props: {
        /**
         * 类型
         *
         * @type {String}
         */
        type: {
            type: String as PropType<Type>,
            validator(value: string) {
                return oneOf(value, ['text', 'button', 'a']);
            },
            default: 'text'
        },
        /**
         * 启用扩展面板
         *
         * @type {Boolean}
         */
        ivueExpand: {
            type: Boolean,
            default: false
        }
    },
    setup(props: any, { slots, attrs, emit }) {
        const data = {
            ...attrs,
            ...props
        }

        // 获取列表组件
        let listComponent = createListComponent(data);

        return () => h('li', {
            class: prefixCls
        }, [
            h(listComponent, {
                ...props,
                ...attrs,
                class: 'ivue-list-item-container ivue-button-clean'
            }, {
                default: slots.default,
                ivueExpand: slots.ivueExpand
            })
        ]);
    },
})
</script>
