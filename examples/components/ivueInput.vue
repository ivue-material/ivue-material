<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p>基本用法，可以使用 v-model 实现数据的双向绑定。可以直接设置 style 来改变输入框的宽度，默认 100%。</p>
            <IVueInput v-model="baseInput" placeholder="someing messasge" @on-enter="enter"></IVueInput>
            <p>{{baseInput}}</p>
            <p>开启属性 clearable 可显示清空按钮。</p>
            <IVueInput v-model="clearableInput" placeholder="someing messasge" clearable></IVueInput>
            <p>{{clearableInput}}</p>
            <p>输入框图标 属性方式</p>
            <IVueInput  placeholder="someing messasge" prefix="face"  clearable></IVueInput>
            <IVueInput  placeholder="someing messasge"  suffix="visibility" clearable></IVueInput>
            <p>输入框图标 slot方式</p>
            <IVueInput  placeholder="someing messasge"  clearable number>
                        <IVueIcon slot="prefix">face</IVueIcon>
            </IVueInput>
            <IVueInput  placeholder="someing messasge"  clearable>
                        <IVueIcon slot="suffix">visibility</IVueIcon>
            </IVueInput>
            <p>input disabled</p>
            <IVueInput  placeholder="someing messasge"  disabled>
            </IVueInput>
            <p>textarea</p>
            <IVueInput  placeholder="someing messasge"  type="textarea" :autosize="{minRows: 2,maxRows: 5}">
            </IVueInput>
            <p>textarea disabled</p>
            <IVueInput  placeholder="someing messasge"  type="textarea" disabled>
            </IVueInput>
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
            }
      }
}
</script>

<style>
</style>
