<template>
      <div>
            <p>普通</p>
            <IVueSelect  clearable>
                  <IVueOption v-for="(item,index) in cityList1" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 单选</p>
            <IVueSelect :value="model1" clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index" disabled>
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>是否将label和value一起返回 - 单选</p>
            <IVueSelect  labelAndValue clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>开启过滤筛选 - 单选</p>
            <IVueSelect  filterable :value="model1">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>

            <p>多选</p>
            <IVueSelect multiple clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 多选</p>
            <IVueSelect multiple :value="['Sydney']" clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>是否将label和value一起返回 - 多选</p>
            <IVueSelect  labelAndValue  multiple clearable @on-change="_input">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>开启过滤筛选 - 多选</p>
            <IVueSelect multiple filterable :value="model1">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
        
      </div>
</template>

<script>
export default {
      data () {
            return {
                  cityList1: [
                        {
                              value: 'New York',
                              label: 'New York'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        },
                        {
                              value: 'Ottawa',
                              label: 'Ottawa'
                        },
                        {
                              value: 'Paris',
                              label: 'Paris'
                        },
                        {
                              value: 'Canberra',
                              label: 'Canberra'
                        }
                  ],
                  cityList2: [
                        {
                              value: 'New York',
                              label: 'New York'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        },
                        {
                              value: 'Ottawa',
                              label: 'Ottawa'
                        },
                        {
                              value: 'Paris',
                              label: 'Paris'
                        },
                        {
                              value: 'Canberra',
                              label: 'Canberra'
                        }
                  ],
                  model1: 'Canberra'
            }
      },
      methods: {
            _input (data) {
                  console.log(data)
            }
      }
}
</script>

<style>
</style>
