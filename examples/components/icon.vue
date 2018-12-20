<template>
      <div>
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

            <p> 图标可以使用图标字体或外部SVG。此外，可以接受一些大小尺寸，如 2x, 3x, 4x and 5x。默认情况下，IvueIcon 将假定你使用的是 <a target="_black" href="https://material.io/tools/icons/?icon=mood_bad&style=baseline">material icon</a></p>

            <div>
                  <IvueIcon>menu</IvueIcon>
                  <IvueIcon>add</IvueIcon>
                  <IvueIcon>thumb_up</IvueIcon>
                  <IvueIcon>verified_user</IvueIcon>
                  <IvueIcon>home</IvueIcon>
            </div>

             <div>
                  <IvueIcon>menu</IvueIcon>
                  <IvueIcon class="ivue-size-2x">add</IvueIcon>
                  <IvueIcon class="ivue-size-3x">thumb_up</IvueIcon>
                  <IvueIcon class="ivue-size-4x">verified_user</IvueIcon>
                  <IvueIcon class="ivue-size-5x">home</IvueIcon>
            </div>
      </div>
</template>
