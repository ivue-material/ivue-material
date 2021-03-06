<template>
    <ul class="ivue-list">
        <slot></slot>
    </ul>
</template>

<script lang='ts'>
import {
    defineComponent,
    reactive,
    provide
} from 'vue';

export default defineComponent({
    name: "ivue-list",
    props: {
        /**
         * 用于扩展列表项，将在展开另一个列表项时折叠,一次最多可扩展一个列表项
         *
         * @type {Boolean}
         */
        ivueExpandSingle: {
            type: Boolean,
            default: false
        }
    },
    // 组合式 API
    setup(props) {

        // methods
        // 扩展 tab
        const expandATab = (expandedListItem) => {
            if (props.ivueExpandSingle && expandedListItem) {
                // 其他可扩展列表项
                const otherExpandableListItem: any = data.IvueList.expandable.filter((target) => target.uid !== expandedListItem.uid);

                otherExpandableListItem.forEach((expandableListItem) => {
                    expandableListItem.close()
                });
            }
        }

        // 插入扩展
        const pushExpandable = (expandableListItem) => {
            let expandableListItems = data.IvueList.expandable;

            // 寻找是否已经有了选项
            const findItem = expandableListItems.find((target) => {
                return target.uid === expandableListItem.uid
            });

            if (!findItem) {
                data.IvueList.expandable = expandableListItems.concat([expandableListItem]);
            }
        }

        // 删除扩展
        const removeExpandable = (expandableListItem) => {
            let expandableListItems = data.IvueList.expandable;

            // 寻找是否已经有了选项
            const findItem = expandableListItems.find((target) => {
                return target.uid === expandableListItem.uid
            });

            if (findItem) {
                data.IvueList.expandable = expandableListItems.filter((target) => target.uid !== expandableListItem.uid);

            }
        }

        // data
        const data: any = reactive<{
            IvueList: object
        }>({
            IvueList: {
                /**
                 * 扩展列表
                 *
                 * @type {Array}
                 */
                expandable: [],
                /**
                 * 扩展 tab
                 */
                expandATab: expandATab,
                /**
                 * 插入扩展
                 */
                pushExpandable: pushExpandable,
                /**
                 * 删除扩展
                 */
                removeExpandable: removeExpandable
            }
        });

        // provide
        provide('IvueList', data.IvueList);

        return {
            // data
            data,
            // methods
            expandATab,
            pushExpandable,
            removeExpandable
        }
    },
})
</script>
