<template>
      <div>
            <p>普通</p>
            <IVueSelect :value="'Sydney'" clearable>
                  <IVueOption v-for="(item,index) in cityList1" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 单选</p>
            <IVueSelect :value="model1" clearable>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
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
            <IVueSelect multiple clearable :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选中选项v-model中的内容 - 多选</p>
            <IVueSelect multiple :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>是否将label和value一起返回 - 多选</p>
            <IVueSelect  labelAndValue  multiple @on-change="_input">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>开启过滤筛选 - 多选</p>
            <IVueSelect multiple filterable :value="['Sydney']">
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选择组件禁用</p>
            <IVueSelect disabled>
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>选择菜单选项禁用</p>
            <IVueSelect >
                  <IVueOption v-for="(item,index) in cityList2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                        <span>{{ item.label }}</span>
                  </IVueOption>
            </IVueSelect>
            <p>菜单选项 group - 单选</p>
            <IVueSelect filterable>
                  <IVueOptionGroup  :label="'one'" >
                        <IVueOption v-for="(item,index) in grop1" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
                  <IVueOptionGroup  :label="'two'" >
                        <IVueOption v-for="(item,index) in grop2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
            </IVueSelect>
             <p>菜单选项 group - 多选</p>
            <IVueSelect  multiple filterable>
                  <IVueOptionGroup  :label="'one'" >
                        <IVueOption v-for="(item,index) in grop1" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
                  <IVueOptionGroup  :label="'two'" >
                        <IVueOption v-for="(item,index) in grop2" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IVueOption>
                  </IVueOptionGroup>
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
                              label: 'New'
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
                  grop1: [
                        {
                              value: 'New York',
                              label: 'New York'
                        },
                        {
                              value: 'London',
                              label: 'London'
                        },
                        {
                              value: 'Sydney',
                              label: 'Sydney'
                        }
                  ],
                  grop2: [
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
