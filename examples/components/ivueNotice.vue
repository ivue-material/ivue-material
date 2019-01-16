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
            this.$IvueNotice.config({
                top: 100,
                duration: 3
            });
            this.$IvueNotice.open({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0,
                onClose: function() {
                    console.log('??')
                }
            });
            this.$IvueNotice.open({
                title: 'name : one',
                duration: 0,
                name: 'one'
            });
            this.$IvueNotice.success({
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
            this.$IvueNotice.success({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IvueNotice.success({
                title: 'Notification title',
                duration: 0
            });
            this.$IvueNotice.info({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IvueNotice.info({
                title: 'Notification title',
                duration: 0
            });
            this.$IvueNotice.warning({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IvueNotice.warning({
                title: 'Notification title',
                duration: 0
            });
            this.$IvueNotice.error({
                title: 'Notification title',
                desc: 'This notification does not automatically close, and you need to click the close button to close.',
                duration: 0
            });
            this.$IvueNotice.error({
                title: 'Notification title',
                duration: 0
            });

        },
        close(){
             this.$IvueNotice.close('one');
        },
        destroy(){
             this.$IvueNotice.destroy();
        }
    }
}
</script>
