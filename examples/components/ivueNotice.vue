<template>
      <div>
            <Button type="primary" @click="time">Open notice</Button>
            <Button type="primary" @click="close">close</Button>
            <Button type="primary" @click="destroy">destroy</Button>
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
            this.$IVueNotice.config({
                top: 100,
                duration: 3
            });
            this.$IVueNotice.open({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.open({
                title: 'name : one',
                duration: 0,
                name: 'one'
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
            this.$IVueNotice.success({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.info({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.info({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.warning({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.warning({
                title: 'Notification title',
                duration: 0
            });
            this.$IVueNotice.error({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IVueNotice.error({
                title: 'Notification title',
                duration: 0
            });

        },
        close(){
             this.$IVueNotice.close('one');
        },
        destroy(){
             this.$IVueNotice.destroy();
        }
    }
}
</script>

<style>
</style>
