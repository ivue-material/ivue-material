import Pad from './pad';

/**
 * @param {String} value YYYY-MM format
 * @param {Number} sign -1 or +1
 */
export default (value, sign) => {
      const [year, month] = String(value).split('-').map(v => 1 * v);

      // 月尾
      if (month + sign === 0) {
            return `${year - 1}-12`;
      }
      // 下一年
      else if (month + sign === 13) {
            return `${year + 1}-01`;
      }
      // 年份
      else {
            return `${year}-${Pad(month + sign)}`;
      }
}