<template>
      <div>
            <p>基础</p>
            <IvueBreadcrumbs justifyEnd>
                  <IvueBreadcrumbsItem>
                         <IvueIcon>home</IvueIcon>
                        Home
                  </IvueBreadcrumbsItem>
                   <IvueBreadcrumbsItem >
                        home
                  </IvueBreadcrumbsItem>
            </IvueBreadcrumbs>

            <p>disabled</p>
            <IvueBreadcrumbs>
                  <IvueBreadcrumbsItem :disabled="true">
                         <IvueIcon>home</IvueIcon>
                        Home
                  </IvueBreadcrumbsItem>
                   <IvueBreadcrumbsItem >
                        home
                  </IvueBreadcrumbsItem>
            </IvueBreadcrumbs>

            <p>href</p>
            <IvueBreadcrumbs>
                  <IvueBreadcrumbsItem :href="'www.baidu.com'">
                         <IvueIcon>home</IvueIcon>
                        Home
                  </IvueBreadcrumbsItem>
                   <IvueBreadcrumbsItem >
                        home
                  </IvueBreadcrumbsItem>
            </IvueBreadcrumbs>

            <p>自定义分隔符 no slot</p>
            <IvueBreadcrumbs divider="-">
                  <IvueBreadcrumbsItem>
                         <IvueIcon>home</IvueIcon>
                       Home
                  </IvueBreadcrumbsItem>
                   <IvueBreadcrumbsItem >
                        <IvueIcon>home</IvueIcon>
                  </IvueBreadcrumbsItem>
            </IvueBreadcrumbs>
            
            
            <p>自定义分隔符 slot</p>
             <IvueBreadcrumbs>
                   <IvueIcon slot="divider">forward</IvueIcon>
                  <IvueBreadcrumbsItem  to="/">
                         <IvueIcon>home</IvueIcon>
                        Home
                  </IvueBreadcrumbsItem>
                   <IvueBreadcrumbsItem  to="/">
                        <IvueIcon>home</IvueIcon>
                        Home
                  </IvueBreadcrumbsItem>
            </IvueBreadcrumbs>
      </div>
</template>

<script>
export default {

}
</script>

