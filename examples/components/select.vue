<template>
    <div>
        <p>普通</p>
        <!-- <ivue-select v-model="model1">
            <ivue-option
                v-for="item in cityList"
                :value="item.value"
                :label="item.label"
                :key="item.value"
            >
            </ivue-option>
        </ivue-select> -->

        <ivue-select v-model="model1" clearable>
            <ivue-option-group label="Hot Cities">
                <ivue-option
                    v-for="item in cityList1"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</ivue-option
                >
            </ivue-option-group>
            <ivue-option-group label="Other Cities">
                <ivue-option
                    v-for="item in cityList2"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</ivue-option
                >
            </ivue-option-group>
        </ivue-select>
        {{ model1 }}

        <!-- <ivue-select v-model="model1" filterable prefix="home"> -->
        <!-- <ivue-option v-for="(item,index) in cityList1" :value="item.value" :label="item.label" :key="index">
                  </ivue-option> -->
        <!-- </ivue-select> -->
        <!-- <p>选中选项v-model中的内容 - 单选</p>
            <IvueSelect :value="model1" clearable>
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>是否将label和value一起返回 - 单选</p>
            <IvueSelect  labelAndValue clearable>
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>开启过滤筛选 - 单选</p>
            <IvueSelect  filterable :value="model1">
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>

            <p>多选</p>
            <IvueSelect multiple clearable :value="['Sydney']">
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>选中选项v-model中的内容 - 多选</p>
            <IvueSelect multiple :value="['Sydney']">
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>是否将label和value一起返回 - 多选</p>
            <IvueSelect  labelAndValue  multiple @on-change="_input">
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>开启过滤筛选 - 多选</p>
            <IvueSelect multiple filterable :value="['Sydney']">
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>选择组件禁用</p>
            <IvueSelect disabled>
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>选择菜单选项禁用</p>
            <IvueSelect >
                  <IvueOption v-for="(item,index) in cityList2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                        <span>{{ item.label }}</span>
                  </IvueOption>
            </IvueSelect>
            <p>菜单选项 group - 单选</p>
            <IvueSelect filterable>
                  <IvueOptionGroup  :label="'one'" >
                        <IvueOption v-for="(item,index) in grop1" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IvueOption>
                  </IvueOptionGroup>
                  <IvueOptionGroup  :label="'two'" >
                        <IvueOption v-for="(item,index) in grop2" :value="item.value" :label="item.label" :key="index" :disabled="index === 2">
                              <span>{{ item.label }}</span>
                        </IvueOption>
                  </IvueOptionGroup>
            </IvueSelect>
             <p>菜单选项 group - 多选</p>
            <IvueSelect  multiple filterable>
                  <IvueOptionGroup  :label="'one'" >
                        <IvueOption v-for="(item) in grop1" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IvueOption>
                  </IvueOptionGroup>
                  <IvueOptionGroup  :label="'two'" >
                        <IvueOption v-for="(item) in grop2" :value="item.value" :label="item.label" :key="item.value">
                              <span>{{ item.label }}</span>
                        </IvueOption>
                  </IvueOptionGroup>
            </IvueSelect> -->
    </div>
</template>

<script>
export default {
    data () {
        return {
            cityList: [
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
                    value: 'Sydney',
                    label: 'Sydney'
                }
            ],
            cityList2: [
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
            model1: ''
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
