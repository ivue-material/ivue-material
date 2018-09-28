<template>
      <div>
            <p>基础</p>
            <IVueBreadcrumbs justifyEnd>
                  <IVueBreadcrumbsItem>
                         <IVueIcon>home</IVueIcon>
                        Home
                  </IVueBreadcrumbsItem>
                   <IVueBreadcrumbsItem >
                        home
                  </IVueBreadcrumbsItem>
            </IVueBreadcrumbs>

            <p>disabled</p>
            <IVueBreadcrumbs>
                  <IVueBreadcrumbsItem :disabled="true">
                         <IVueIcon>home</IVueIcon>
                        Home
                  </IVueBreadcrumbsItem>
                   <IVueBreadcrumbsItem >
                        home
                  </IVueBreadcrumbsItem>
            </IVueBreadcrumbs>

            <p>href</p>
            <IVueBreadcrumbs>
                  <IVueBreadcrumbsItem :href="'www.baidu.com'">
                         <IVueIcon>home</IVueIcon>
                        Home
                  </IVueBreadcrumbsItem>
                   <IVueBreadcrumbsItem >
                        home
                  </IVueBreadcrumbsItem>
            </IVueBreadcrumbs>

            <p>自定义分隔符 no slot</p>
            <IVueBreadcrumbs divider="-">
                  <IVueBreadcrumbsItem>
                         <IVueIcon>home</IVueIcon>
                       Home
                  </IVueBreadcrumbsItem>
                   <IVueBreadcrumbsItem >
                        <IVueIcon>home</IVueIcon>
                  </IVueBreadcrumbsItem>
            </IVueBreadcrumbs>
            
            
            <p>自定义分隔符 slot</p>
             <IVueBreadcrumbs>
                   <IVueIcon slot="divider">forward</IVueIcon>
                  <IVueBreadcrumbsItem  to="/">
                         <IVueIcon>home</IVueIcon>
                        Home
                  </IVueBreadcrumbsItem>
                   <IVueBreadcrumbsItem  to="/">
                        <IVueIcon>home</IVueIcon>
                        Home
                  </IVueBreadcrumbsItem>
            </IVueBreadcrumbs>
      </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
