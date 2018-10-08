<template>
      <div>
            <IVueSelect v-model="model1" :value="model1">
                  <IVueOption v-for="(item,index) in cityList" :value="item.value" :key="index">{{ item.label }}</IVueOption>
            </IVueSelect>
            <p> {{model1}}</p>
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
      }
}
</script>

<style>
</style>
