<template>
      <IVueSelect :placeholder="placeholder"
                  :value="currentValue"
                  filterable
      >
            <slot name="input">
                  <IVueInput  v-model="currentValue" 
                              slot="input" 
                              :placeholder="placeholder">
                  </IVueInput>
            </slot>
            <slot>
                  <IVueOption v-for="item in filterableData" :value="item" :key="item">{{item}}</IVueOption>
            </slot>
      </IVueSelect>
</template>

<script>
import IVueSelect from '../IVueSelect/IVueSelect';
import IVueOption from '../IVueSelect/IVueOption';
import IVueInput from '../IVueInput/IVueInput';

export default {
      name:'IVueAutoComplete',
      props: {
            /*
            * 绑定的值，可使用 v-model 双向绑定
            * 
            * @type {String,Number}
            */
            value: {
                  type: [String, Number],
                  default: ''
            },
            /*
            * 数据源
            * 
            * @type {Array}
            */
            data: {
                  type: Array,
                  default: () => []
            },
            /*
            * 外部过滤方法
            * 
            * @type{Function, Boolean}
            */
            filterMethod: {
                  type: [Function, Boolean],
                  default: false
            },
            /*
            * 输入提示
            * 
            * @type {String}
            */
            placeholder: {
                  type: String,
                  default: '请输入数据'
            }
      },
      data () {
            return {
                  currentValue: this.value
            }
      },
      computed: {
            // 过滤数据
            filterableData () {
                  // 使用外部传入的过滤方法
                  if (this.filterMethod) {
                        return this.data.filter((item) => this.filterMethod(this.currentValue, item));
                  }
                  else {
                        return this.data;
                  }
            }
      },
      methods: {
            // 外部搜索方法
            externalSearchMethod (query) {
                  this.$emit('on-search', query);
            }
      },
      components: {
            IVueSelect,
            IVueOption,
            IVueInput
      }
}
</script>

<style>
</style>
