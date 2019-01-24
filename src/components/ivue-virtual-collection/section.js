/**
 * 窗口的显示部分 -> 当前 viewPort 显示的部分。
 * 把cell(块)组合起来显示在当前的窗口。
 * 这使我们能够更快地确定在窗口的给定区域显示哪些单元格。
 * 显示具有固定的大小，并包含0到多个块（由其索引跟踪）。
 */

export default class Section {
      constructor({ x, y, width, height }) {
            this.height = height;
            this.width = width;
            this.x = x;
            this.y = y;

            // 收集当前应该显示那些块
            this._indexMap = {};

            // 收集当前需要显示的单元格的索引
            this._cellIndex = [];
      }


      // 添加单元格的索引
      addCellIndex ({ index }) {
            if (!this._indexMap[index]) {
                  // 收集当前应该显示那些块
                  this._indexMap[index] = true;
                  // 收集当前需要显示块的索引并保存它们
                  this._cellIndex.push(index)
            }
      }

      // 获取所有单元格的索引
      getCellIndices () {
            return this._cellIndex;
      }


      /** 用于测试 */
      toString () {
            return `${this.x},${this.y} ${this.width}x${this.height}`
      }
}