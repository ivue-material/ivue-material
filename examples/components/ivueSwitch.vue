<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


            <p>基础</p>
            <IvueSwitch class="red-accent-4" @on-change="handleChange"></IvueSwitch>

            <p>大小</p>
            <IvueSwitch size="large"></IvueSwitch>
            <IvueSwitch></IvueSwitch>
            <IvueSwitch size="small"></IvueSwitch>

            <p>文字图标</p>
            <IvueSwitch>
                  <span slot="open">开</span>
                  <span slot="close">关</span>
            </IvueSwitch>

            <IvueSwitch class="red-accent-4">
                  <span slot="open">
                        <IvueIcon>check</IvueIcon>
                  </span>
                  <span slot="close">
                        <IvueIcon>close</IvueIcon>
                  </span>
            </IvueSwitch>

            <p>不可用</p>
            <IvueSwitch :disabled="true" class="red-accent-4"></IvueSwitch>

            <p>loading</p>
            <IvueSwitch loading :value="true" class="red-accent-4"></IvueSwitch>
            <IvueSwitch loading :value="true" size="large" class="red-accent-4"></IvueSwitch>
            <IvueSwitch loading :value="true" size="small" class="red-accent-4"></IvueSwitch>
      </div>
</template>

<script>
export default {
      methods: {
            handleChange () {
                  console.log('>')
            }
      }
}
</script>

<style lang="scss">
.ivue-icon {
      font-size: 12px;
      min-width: 12px;
      font-weight: bold;
}
</style>
