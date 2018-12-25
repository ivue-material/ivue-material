// 创建数组范围
export function createRange (length) {
      return Array.from({ length }, (v, k) => k);
}