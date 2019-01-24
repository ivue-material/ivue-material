import SectionMessage from './section-message';

/** Represents a group of logically-related items */
export default class GroupMessage {
      constructor(group, groupIndex, sectionSize, cellSizeAndPositionGetter, unwatch) {
            // 每组块的索引
            this._groupIndex = groupIndex;
            // 拆分部分大小
            this._sectionSize = sectionSize;
            // 用于设置每个单元格的大小和位置的函数
            this._cellSizeAndPositionGetter = cellSizeAndPositionGetter;
            // 总高度
            this.totalHeight = 0;
            // 总宽度
            this.totalWidth = 0;
            // 监听数据变化
            this._unwatch = unwatch;

            // 更新块
            this.updateGroup(group)
      }

      // 更新块
      updateGroup (group) {
            // 每个部分的信息
            const sectionMessage = new SectionMessage(this._sectionSize);

            let totalHeight = 0;
            let totalWidth = 0;
            
            group.forEach((item, index) => {
                  // 为每个单元格设置数据
                  const cellMetadatum = this._cellSizeAndPositionGetter(item, index, this._groupIndex);

                  // 注册块 -> 为每一个块都设置一个对应的信息
                  sectionMessage.registerCell({
                        index,
                        cellMetadatum
                  })

                  //计算总高度和总宽度
                  const { x, y, width, height } = cellMetadatum;

                  const bottom = y + height;
                  const right = x + width;

                  if (bottom > totalHeight) {
                        totalHeight = bottom;
                  }

                  if (right > totalWidth) {
                        totalWidth = right;
                  }
            });

            sectionMessage.freezeCells();

            this.totalHeight = totalHeight;
            this.totalWidth = totalWidth;

            this._sectionMessage = sectionMessage;
            this._group = group;
      }

      // 获取需要渲染的那个单元格的索引
      getCellIndices (region) {
            return this._sectionMessage.getCellIndices(region);
      }

      // 获取一个组的数据
      getItem (index) {
            return this._group[index];
      }

      // 获取当前单元格的数据
      getCellMetadata (index) {
            return this._sectionMessage.getCellMetadata(index);
      }

      // 部署监听
      dispose () {
            this._unwatch()
      }
}