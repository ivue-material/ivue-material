<template>
  <div>
    <p>基本用法，通过 data 设置自动完成的数据源。</p>
    <IvueAutoComplete
      v-model="value1"
      :data="data1"
      @on-search="handleSearch1"
    ></IvueAutoComplete>
    <p>除了使用 data，还可以直接传入 Option 组件作为 slot 使用，这样可以自定义显示效果。</p>
    <IvueAutoComplete v-model="value2" @on-search="handleSearch2" clearable>
      <IvueOption v-for="item in data2" :value="item" :key="item">
        <span>{{ item }}</span>
      </IvueOption>
    </IvueAutoComplete>
    <p>不区分大小写的 AutoComplete，及过滤的用法。</p>
    <IvueAutoComplete
      :value="value3"
      :data="data3"
      :filterMethod="filterMethod"
      @on-search="search"
    ></IvueAutoComplete>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value1: '',
      data1: [],
      value2: '',
      data2: [],
      value3: '',
      data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
    }
  },
  methods: {
    handleSearch1 (value) {
      this.data1 = !value ? [] : [
        value,
        value + value,
        value + value + value
      ];
    },
    handleSearch2 (value) {
      this.data2 = !value || value.indexOf('@') >= 0 ? [] : [
        value + '@qq.com',
        value + '@sina.com',
        value + '@163.com'
      ];
    },
    filterMethod (value, option) {
      return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
    },
    search (query) {
      console.log(query)
    }
  }
}
</script>

<style>
</style>
