// 允许选择的日期
export default function isDateAllowed (date, min, max, allowedFn) {

      return (!allowedFn || allowedFn(date)) && (!min || date >= min) && (!max || date <= max);
}