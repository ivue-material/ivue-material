<template>
    <div class="ivue-tooltip-wrapper">
        <h1>普通</h1>
        <IvueTooltip
            color="#303133"
            content="Here is the prompt text"
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>显示箭头</h1>
        <IvueTooltip
            color="#303133"
            content="Here is the prompt text"
            arrow
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>一直显示</h1>
        <IvueTooltip
            color="grey"
            content="Here is the prompt text"
            arrow
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>方向</h1>
        <IvueTooltip
            placement="left"
            color="#303133"
            content="Here is the prompt text"
            arrow
            always
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>开启提示圆角</h1>
        <IvueTooltip
            placement="bottom"
            color="#303133"
            content="Here is the prompt text"
            arrow
            always
            rounded
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>最大宽度</h1>
        <IvueTooltip
            placement="bottom"
            color="#303133"
            max-width="200"
            content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。"
            arrow
            always
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <h1>v-model</h1>
        <IvueTooltip
            placement="bottom"
            color="#303133"
            max-width="200"
            content="史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。"
            arrow
            v-model="show"
        >A balloon appears when the mouse passes over this text</IvueTooltip>
        <button @click="show = !show">toggle</button>
        {{show}}
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: false
        }
    }
}
</script>

<style scoped>
.ivue-tooltip-wrapper {
  margin: 200px;
}
</style>
