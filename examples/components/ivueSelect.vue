<template>
      <div>
            <IVueSelect>
                  <IVueOption v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</IVueOption>
            </IVueSelect>
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
                  ]
            }
      }
}
</script>

<style>
</style>
