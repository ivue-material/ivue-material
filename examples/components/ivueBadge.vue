<template>
      <div>
            <IVueBadge :count="3">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

            <IVueBadge  dot>
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>

             <IVueBadge  text="123">
                    <a href="#" class="demo-badge"></a>
            </IVueBadge>
      </div>
</template>

<script>
      export default {
            
      }
</script>

<style scoped>
 .demo-badge{
        width: 42px;
        height: 42px;
        background: #eee;
        border-radius: 6px;
        display: inline-block;
    }
</style>