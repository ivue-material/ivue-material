<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p> 图标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x, 3x, 4x and 5x。默认情况下，IVueIcon 将假定你使用的是 <a target="_black" href="https://material.io/tools/icons/?icon=mood_bad&style=baseline">material icon</a></p>

            <div>
                  <IVueIcon>menu</IVueIcon>
                  <IVueIcon>add</IVueIcon>
                  <IVueIcon>thumb_up</IVueIcon>
                  <IVueIcon>verified_user</IVueIcon>
                  <IVueIcon>home</IVueIcon>
            </div>

             <div>
                  <IVueIcon>menu</IVueIcon>
                  <IVueIcon class="ivue-size-2x">add</IVueIcon>
                  <IVueIcon class="ivue-size-3x">thumb_up</IVueIcon>
                  <IVueIcon class="ivue-size-4x">verified_user</IVueIcon>
                  <IVueIcon class="ivue-size-5x">home</IVueIcon>
            </div>
      </div>
</template>

<script>
export default {

}
</script>

<style>
</style>
