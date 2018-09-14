<template>
      <div>
            <IVueList>
                  <IVueListItem>Plain Text</IVueListItem>
                  <IVueListItem :disabled="true">button</IVueListItem>
                  <IVueListItem @click="">button</IVueListItem>
                  <IVueListItem href="'www.baidu.com'">link</IVueListItem>
                  <IVueListItem to="/icon">routerLink</IVueListItem>
            </IVueList>

            <p>expand</p>
             <IVueList :ivueExpandSingle="expandSingle">
                  <IVueListItem ivue-expand :ivue-expanded.sync="expandNews">
                       <span class="ivue-list-item-text">News</span>

                       <IVueList slot="ivue-expand">
                              <IVueListItem class="ivue-inset">World</IVueListItem>
                              <IVueListItem class="ivue-inset">World</IVueListItem>
                        </IVueList>
                  </IVueListItem>
            </IVueList>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  expandNews: false,
                  expandSingle: false
            }
      }
}
</script>

<style lass="scss" >

</style>
