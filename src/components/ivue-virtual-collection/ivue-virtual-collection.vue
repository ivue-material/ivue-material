<template>
      <div :class="prefixCls" :style="outerStyle" ref="outer" @scroll.passive="onScroll">
            <div :class="`${prefixCls}--container`" :style="containerStyle">
                  <div
                        class="cell-container"
                        v-for="item in displayItems"
                        :key="item.key"
                        :style="getComputedStyle(item)"
                  >
                        <slot name="cell" :data="item.data"></slot>
                  </div>
            </div>
      </div>
</template>

<script>
import GroupMessage from './group-message';

const prefixCls = 'ivue-virtual-collection';

export default {
      name: prefixCls,
      props: {
            /**
             * 数据收集
             * 
             * @type {Array}
             */
            collection: {
                  type: Array,
                  required: true
            },
            /**
             * 每个单元格的大小位置
             * 
             * @type {Function}
             */
            cellSizeAndPositionGetter: {
                  type: Function,
                  required: true
            },
            /**
             * 外层高度
             * 
             * @type {Number}
             */
            height: {
                  type: Number,
                  required: true,
                  validator (value) {
                        return value >= 0;
                  }
            },
            /**
             * 外层宽度啊
             * 
             * @type {Number}
             */
            width: {
                  type: Number,
                  required: true,
                  validator (value) {
                        return value >= 0;
                  }
            },
            /**
             *（可选）覆盖Collection的单元格被拆分的部分的大小。
             * 这是一个高级选项，只应用于性能调整目的。
             * 
             * @type {Number}
             */
            sectionSize: {
                  type: Number,
                  default: 300
            }
      },
      data () {
            return {
                  prefixCls: prefixCls,
                  // 容器总高度
                  totalHeight: 0,
                  // 容器总宽度
                  totalWidth: 0,
                  // 需要显示的选项
                  displayItems: [],
                  // 数据集合
                  groupMessage: []
            }
      },
      created () {
            this.onCollectionChanged()
      },
      computed: {
            // 外层样式
            outerStyle () {
                  return {
                        width: `${this.width}px`,
                        height: `${this.height}px`
                  };
            },
            // 容器样式
            containerStyle () {
                  return {
                        width: `${this.totalWidth}px`,
                        height: `${this.totalHeight}px`
                  };
            }
      },
      methods: {
            // 监听收集信息的改变
            onCollectionChanged () {
                  let collection = this.collection;

                  // 如果数据没有被处理过就进行处理，将数据包裹在一个数字中，每一组相当于一个块
                  if (collection.length > 0 && collection[0].group === undefined) {
                        collection = [{ group: collection }];
                  }

                  // 为每个数据项创建存储标记
                  collection.forEach((groupContainer, index) => {
                        // 每个数据项的标记
                        const groupIndex = index;

                        // 设置监听组的变化
                        const unwatch = this.$watch(
                              () => groupContainer,
                              () => this.onGroupChanged(groupContainer.group, groupIndex),
                              // 深度监听
                              { deep: true }
                        )

                        // 接收所有块的数据 
                        this.groupMessage.push(new GroupMessage(
                              groupContainer.group,
                              groupIndex,
                              this.sectionSize,
                              this.cellSizeAndPositionGetter,
                              unwatch
                        ));

                  });

                  // 设置总高度，总宽度
                  this.updateGridSize();
                  // 设置当前视图我们中应该显示那些块
                  this.flushDisplayItems();
            },
            // 监听组的变化
            onGroupChanged (group, index) {
                  // 更新块的数据
                  this.groupMessage[index].updateGroup(group);

                  // 设置总高度，总宽度
                  this.updateGridSize();
                  // 设置当前视图我们中应该显示那些块
                  this.flushDisplayItems();
            },
            // 设置当前视图我们中应该显示那些块
            flushDisplayItems () {
                  let scrollTop = 0;
                  let scrollLeft = 0;

                  // 设置可以滚动的高度和宽度
                  if (this.$refs.outer) {
                        scrollTop = this.$refs.outer.scrollTop;
                        scrollLeft = this.$refs.outer.scrollLeft;
                  }

                  const displayItems = [];

                  this.groupMessage.forEach((groupMessage, groupIndex) => {
                        // 获取需要渲染的那个块的索引
                        let indices = groupMessage.getCellIndices({
                              height: this.height,
                              width: this.width,
                              x: scrollLeft,
                              y: scrollTop
                        });


                        indices.forEach(itemIndex => {
                              // 获取到当前视图需要显示的块的数量
                              displayItems.push(Object.freeze({
                                    groupIndex,
                                    itemIndex,
                                    key: displayItems.length,
                                    // 获取一个组的数据
                                    ...groupMessage.getItem(itemIndex)
                              }));
                        });
                  });

                  if (window.requestAnimationFrame) {
                        window.requestAnimationFrame(() => {
                              this.displayItems = displayItems
                              this.$forceUpdate()
                        })
                  } else {
                        this.displayItems = displayItems
                        this.$forceUpdate()
                  }
            },
            // 设置总高度，总宽度
            updateGridSize () {
                  this.totalHeight = Math.max(...this.groupMessage.map(item => item.totalHeight));
                  this.totalWidth = Math.max(...this.groupMessage.map(item => item.totalWidth));
            },
            //  获取到视图应该渲染那些块之外我们还需要设置这些块所应该在的位置
            getComputedStyle (displayItems) {
                  if (!displayItems) {
                        return;
                  }

                  //如果之后修改了集合
                  //当前显示的项目可能不再存在
                  const groupMessage = this.groupMessage[displayItems.groupIndex];
                  if (!groupMessage) {
                        return;
                  }

                  // 当前单元格数据
                  const cellMetadata = groupMessage.getCellMetadata(displayItems.itemIndex);
                  if (!cellMetadata) {
                        return;
                  }

                  const { x, y, width, height } = cellMetadata;

                  return {
                        transform: `translate3d(${x}px,${y}px,0)`,
                        width: `${width}px`,
                        height: `${height}px`
                  }

            },
            // 监听滚动
            onScroll (e) {
                  this.flushDisplayItems();
            }
      },
      watch: {
            // 监听数据改变
            collection () {
                  // 部署监听块的变化
                  this.groupMessage.forEach(manager => manager.dispose());
                  // 初始化数据
                  this.groupMessage = [];
                  this.totalHeight = 0;
                  this.totalWidth = 0;

                  this.onCollectionChanged();
            }
      }
}
</script>
