<template>
    <div class="touch-body">
        <span>touch</span>
        <div class="touch" v-touch="{
            left:(event)=>touch('left',event),
            right:(event)=>touch('right',event),
            up:(event)=>touch('up',event),
            down:(event)=>touch('down',event)
        }">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <h2>{{direction}}</h2>
        </div>
        <span>expose event object:</span>
        <div class="expose-event" v-if="JSON.stringify(event)!=='{}'">
            <div v-for="(key,item) in event" :key="item">
                <p v-if="typeof key !=='function'">
                    <strong>{{item}}</strong>
                    <span>{{key}}</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            direction:'please touch',
            event:{}
        }
    },
    methods:{
        touch(action,event){
            console.log(event)
            this.direction=action
            this.event=event
        }
    }
}
</script>

<style scoped lang="scss">
    .touch{
        position: relative;
        width: 100%;
        height: 200px;
        line-height: 200px;
        text-align:center;
        border: 1px solid #eee;
        box-sizing: border-box;
        h2{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            line-height: 200px;
        }
        div{
            float: left;
            width: 50%;
            height: 50%;
            border:1px solid transparent;
            &:nth-child(1){
                border-right: 1px dotted #ddd;
                border-bottom: 1px dotted #ddd;
            }
            &:nth-child(3){
                border-right: 1px dotted #ddd;
            }
            &:nth-child(4){
                border-top: 1px dotted #ddd;
            }
        }
    }
     .expose-event{
            margin-top: 20px;
            border: 1px solid #ddd;
            padding: 20px;
        }
</style>

