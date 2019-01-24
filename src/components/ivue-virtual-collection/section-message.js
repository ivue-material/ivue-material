import Section from "./section"

const SECTION_SIZE = 600

export default class SectionManager {
      constructor(sectionSize = SECTION_SIZE) {
            // 设置默认视图大小
            this._sectionSize = sectionSize;

            // 收集所有单元格的数据
            this._cellMetadata = [];

            // 用于收集一个块所包含的信息
            this._sections = {}
      }

      // 创建单元格数据
      registerCell ({ index, cellMetadatum }) {
            // 冻结数据
            const frozenCellMetadatum = Object.freeze(cellMetadatum);
            // 收集所有单元格的数据 -> 使块的数据不可改变 freeze
            this._cellMetadata[index] = frozenCellMetadatum;


            // 该方法会返回所有的单元格的信息
            this.getSections(frozenCellMetadatum).forEach(section => section.addCellIndex({ index }))
      }

      // 冻结对象使对象不可变
      freezeCells () {
            Object.freeze(this._cellMetadata);
      }

      // 该方法会返回所有的块的信息
      getSections ({ height, width, x, y }) {
            /*
               =>┏━━━━┯━━━━┯━━━━┓ 分割线sectionY
                0┃0 0 ┊1 3 ┊6 6 ┃
                1┃0 0 ┊2 3 ┊6 6 ┃
               =>┠┈┈┈┈┼┈┈┈┈┼┈┈┈┈┨ 分割线 sectionY
                2┃4 4 ┊4 3 ┊7 8 ┃
                3┃4 4 ┊4 5 ┊9 9 ┃
                 ┗━━━━┷━━━━┷━━━━┛
                 ↑    ↑
               sectionX sectionX
               */

            // 设置当前块X轴的分割线
            const sectionXStart = Math.floor(x / this._sectionSize);
            const sectionXStop = Math.floor((x + width - 1) / this._sectionSize);

            // 设置当前块Y轴的分割线
            const sectionYStart = Math.floor(y / this._sectionSize);
            const sectionYStop = Math.floor((y + height - 1) / this._sectionSize);

            // 设置用于保存所有重叠的块
            const sections = [];

            // 创建块的范围
            for (let sectionX = sectionXStart; sectionX <= sectionXStop; sectionX++) {
                  for (let sectionY = sectionYStart; sectionY <= sectionYStop; sectionY++) {
                        // 为每一个单元格都创建一个key用于查找
                        const key = `${sectionX}.${sectionY}`;

                        if (!this._sections[key]) {
                              this._sections[key] = new Section({
                                    height: this._sectionSize,
                                    width: this._sectionSize,
                                    x: sectionX * this._sectionSize,
                                    y: sectionY * this._sectionSize
                              });
                        }

                        // 把单元格个块所包含的信息都保存起来
                        sections.push(this._sections[key]);
                  }
            }

            // 返回所有的块的信息
            return sections;
      }


      /**
       * 获取指定区域中包含的所有单元格的索引
       * 
       * 区域可以包含1个或多个部分。
       */
      getCellIndices ({ height, width, x, y }) {
            const indices = {};

            this.getSections({ height, width, x, y }).forEach(sections =>
                  sections.getCellIndices().forEach(index => {
                        indices[index] = index;
                  })
            );

            // 对象键是字符串; 此函数返回数字
            return Object.keys(indices).map(index => indices[index]);
      }

      // 获取当前单元格的数据
      getCellMetadata (index) {
            return this._cellMetadata[index];
      }
}