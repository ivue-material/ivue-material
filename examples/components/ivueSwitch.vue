<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          
            <p>基础</p>
            <IVueSwitch class="red-accent-4"></IVueSwitch>

            <p>大小</p>
            <IVueSwitch size="large"></IVueSwitch>
            <IVueSwitch></IVueSwitch>
            <IVueSwitch size="small"></IVueSwitch>

            <p>文字图标</p>
            <IVueSwitch>
                  <span slot="open">开</span>
                  <span slot="close">关</span>
            </IVueSwitch>

            <IVueSwitch >
                  <span slot="open"><IVueIcon>check</IVueIcon></span>
                  <span slot="close"><IVueIcon>close</IVueIcon></span>
            </IVueSwitch>

            <p>不可用</p>
            <IVueSwitch :disabled="true" class="red-accent-4"></IVueSwitch>

            <p>loading</p>
            <IVueSwitch loading :value="true" class="red-accent-4"></IVueSwitch>
            <IVueSwitch loading :value="true" size="large" class="red-accent-4"></IVueSwitch>
            <IVueSwitch loading :value="true" size="small" class="red-accent-4"></IVueSwitch>
      </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.ivue-icon {
      font-size: 12px;
      min-width: 12px;
      font-weight: bold;
}
</style>
