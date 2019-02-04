<template>
      <div>
            <IvueCollapse v-model="active" accordion>
                  <IvueCollapsePanel name="0">
                        <IvueIcon slot="header-icon">keyboard_arrow_right</IvueIcon>史蒂夫·乔布斯
                        <div slot="content">
                              <IvueCollapse v-model="active1" accordion>
                                    <IvueCollapsePanel name="1">
                                          <IvueIcon slot="header-icon">keyboard_arrow_right</IvueIcon>史蒂夫·乔布斯
                                          <p
                                                slot="content"
                                          >史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                                    </IvueCollapsePanel>
                              </IvueCollapse>
                        </div>
                  </IvueCollapsePanel>
                  <IvueCollapsePanel name="1">
                        <IvueIcon slot="header-icon">keyboard_arrow_right</IvueIcon>史蒂夫·乔布斯
                        <p
                              slot="content"
                        >史蒂夫·乔布斯（Steve Jobs），1955年2月24日生于美国加利福尼亚州旧金山，美国发明家、企业家、美国苹果公司联合创办人。</p>
                  </IvueCollapsePanel>
            </IvueCollapse>
      </div>
</template>

<script>
export default {
      data () {
            return {
                  active: '0',
                  active1: '1'
            }
      }
}
</script>

<style scoped>
</style>