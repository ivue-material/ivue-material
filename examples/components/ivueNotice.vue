<template>
      <div>
            <IVueNotice :prefixCls="'ivue-notice'"
                        :content="content"
                        type="notice"
            ></IVueNotice>
      </div>
</template>

<script>
const prefixCls = 'ivue-notice';
const title = 'title';
const desc = 'desc';

export default {
      data () {
            return {
                  content: `
            <div class="${prefixCls}-custom-content ${prefixCls}-have-desc ">
                <div class="${prefixCls}-title">${title}</div>
                <div class="${prefixCls}-desc">${desc}</div>
            </div>
        `
            }
      }
}
</script>

<style>
</style>
