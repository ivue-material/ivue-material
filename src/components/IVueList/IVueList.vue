<template>
      <ul class="ivue-list">
            <slot></slot>
      </ul>
</template>

<script>
export default {
      name: "IVueList",
      props: {
            /*
            * 用于扩展列表项，将在展开另一个列表项时折叠,一次最多可扩展一个列表项
            */
            ivueExpandSingle: {
                  type: Boolean,
                  default: false
            }
      },
      data () {
            return {
                  IVueList: {
                        /*
                        * 扩展列表
                        * 
                        * @type {Array}
                        */
                        expandable: [],
                        /*
                        * 扩展 tab
                        */
                        expandATab: this.expandATab,
                        /*
                        * 插入扩展
                        */
                        pushExpandable: this.pushExpandable,
                        /*
                        * 删除扩展
                        */
                        removeExpandable: this.removeExpandable
                  }
            }
      },
      provide() {
            return {
                  IVueList: this.IVueList
            }
      },
      methods: {
            // 扩展 tab
            expandATab (expandedListItem) {
                  if (this.ivueExpandSingle && expandedListItem) {
                        // 其他可扩展列表项
                        const otherExpandableListItem = this.IVueList.expandable.filter(target => target !== expandedListItem);
                        otherExpandableListItem.forEach(expandableListItem => expandableListItem.close());
                  }
            },
            // 插入扩展
            pushExpandable (expandableListItem) {
                  let expandableListItems = this.IVueList.expandable;

                  if (!expandableListItems.find(target => target === expandableListItem)) {
                        this.IVueList.expandable = expandableListItems.concat(expandableListItems);
                  }
            },
            // 删除扩展
            removeExpandable (expandableListItem) {
                  let expandableListItems = this.IVueList.expandable;

                  if (expandableListItems.find(target => target === expandableListItem)) {
                        this.IVueList.expandable = expandableListItems.filter(target => target !== expandableListItem);

                  }
            }
      }
}
</script>

<style>
</style>
