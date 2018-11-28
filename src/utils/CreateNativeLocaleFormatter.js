import Pad from './Pad'

export default (locale, options, { start, length } = { start: 0, length: 0 }) => {
      // 适配IOS
      const makeIsoString = (dateString) => {
            const [year, month, date] = dateString.trim().split(' ')[0].split('-');

            return [year, Pad(month || 1), Pad(date || 1)].join('-');
      }
      try {
            // 初始化 根据语言来格式化日期和时间的对象
            const intlFormatter = new Intl.DateTimeFormat(locale || undefined, options);

            return (dateString) => intlFormatter.format(new Date(`${makeIsoString(dateString)}T00:00:00+00:00`))
      }
      catch (e) {
            return (start || length) ? dateString => makeIsoString(dateString).substr(start, length) : null;
      }
}