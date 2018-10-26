<template>
      <div>
            <Button type="primary" @click="time">Open notice</Button>
      </div>
</template>

<script>
const prefixCls = 'ivue-notice';
const title = 'title';
const desc = 'desc';

export default {
      data () {
            return {

            }
      },
       methods: {
            time () {
                this.$IVueNotice.open({
                    title: 'Notification title',
                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                    duration: 0
                });
                 this.$IVueNotice.success({
                    title: 'Notification title',
                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                    duration: 0,
                    render: h => {
                        return h('span', [
                            'This is created by ',
                            h('a', 'render'),
                            ' function'
                        ])
                    }
                });
                this.$IVueNotice.success({
                    title: 'Notification title',
                    desc: 'This notification does not automatically close, and you need to click the close button to close.',
                    duration: 0
                });
            }
        }
}
</script>

<style>
</style>
