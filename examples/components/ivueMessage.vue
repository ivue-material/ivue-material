<template>
      <div>
            <Button type="primary" @click="click">Open notice</Button>
            <Button type="primary" @click="destroy">Open notice</Button>
            
      </div>
</template>

<script>
export default {
      methods: {
            click () {
                  this.$IVueMessage.config({
                        top: 50,
                        duration: 0
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                        duration: 0,
                        closable: true
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                  });
                  this.$IVueMessage.loading({
                        content: 'Loading...',
                        duration: 0
                  });
                  this.$IVueMessage.success({
                        content: 'Tips for manual closing',
                        render: h => {
                              return h('span', [
                                    'This is created by ',
                                    h('a', 'render'),
                                    ' function'
                              ])
                        }
                  });
                  this.$IVueMessage.info('This is created by ');
                  this.$IVueMessage.warning('This is created by ');
                  this.$IVueMessage.error('This is created by ');
            },
            destroy () {
                  this.$IVueMessage.destroy();
            }
      }
}
</script>
