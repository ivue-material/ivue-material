<template>
  <ul class="ivue-list">
    <slot></slot>
  </ul>
</template>

<script>
import IvueRouterLinkProps from '../../utils/mixins/IvueRouterLinkProps';

export default {
  name: "ivue-list",
  mixins: [IvueRouterLinkProps],
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
      IvueList: {
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
  provide () {
    return {
      IvueList: this.IvueList
    }
  },
  methods: {
    // 扩展 tab
    expandATab (expandedListItem) {
      if (this.ivueExpandSingle && expandedListItem) {
        // 其他可扩展列表项
        const otherExpandableListItem = this.IvueList.expandable.filter(target => target !== expandedListItem);
        otherExpandableListItem.forEach(expandableListItem => expandableListItem.close());
      }
    },
    // 插入扩展
    pushExpandable (expandableListItem) {
      let expandableListItems = this.IvueList.expandable;

      if (!expandableListItems.find(target => target === expandableListItem)) {
        this.IvueList.expandable = expandableListItems.concat(expandableListItems);
      }
    },
    // 删除扩展
    removeExpandable (expandableListItem) {
      let expandableListItems = this.IvueList.expandable;

      if (expandableListItems.find(target => target === expandableListItem)) {
        this.IvueList.expandable = expandableListItems.filter(target => target !== expandableListItem);

      }
    }
  }
}
</script>