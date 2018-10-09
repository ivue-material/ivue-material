<template>
      <div>
            <IVueSelect  :filterable="true">
                  <IVueOption v-for="(item,index) in cityList" :value="item.value" :key="index">
                        <span>{{ item.label }}</span>
                        <span style="float:right;color:#ccc">America</span>
                  </IVueOption>
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
