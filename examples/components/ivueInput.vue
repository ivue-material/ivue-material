<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p>基本用法，可以使用 v-model 实现数据的双向绑定。可以直接设置 style 来改变输入框的宽度，默认 100%。</p>
            <IvueInput v-model="baseInput" placeholder="someing messasge" @on-enter="enter"></IvueInput>
            <p>{{baseInput}}</p>
            <p>开启属性 clearable 可显示清空按钮。</p>
            <IvueInput v-model="clearableInput" placeholder="someing messasge" clearable></IvueInput>
            <p>{{clearableInput}}</p>
            <p>输入框图标 属性方式</p>
            <IvueInput  placeholder="someing messasge" prefix="face"  ></IvueInput>
            <IvueInput  placeholder="someing messasge"  suffix="visibility"></IvueInput>
            <p>输入框图标 slot方式</p>
            <IvueInput  placeholder="someing messasge"  clearable number>
                        <IvueIcon slot="prefix">face</IvueIcon>
            </IvueInput>
            <IvueInput  placeholder="someing messasge"   @handleSuffix="clickVisiblity">
                        <IvueIcon slot="suffix">visibility</IvueIcon>
            </IvueInput>
            <p>input disabled</p>
            <IvueInput  placeholder="someing messasge"  disabled>
            </IvueInput>
            <p>textarea</p>
            <IvueInput  placeholder="someing messasge"  type="textarea" :autosize="{minRows: 2,maxRows: 5}">
            </IvueInput>
            <p>textarea disabled</p>
            <IvueInput  placeholder="someing messasge"  type="textarea" disabled>
            </IvueInput>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  baseInput: '',
                  clearableInput: ''
            }
      },
      methods:{
            enter (event) {
                  console.log(event)
            },
            clickVisiblity(){
                  console.log('?111?')
            }
      }
}
</script>

<style>
</style>
