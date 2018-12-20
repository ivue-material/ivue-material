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
                  this.$IvueMessage.config({
                        top: 50,
                        duration: 0
                  });
                  this.$IvueMessage.success({
                        content: 'Tips for manual closing',
                        duration: 0,
                        closable: true
                  });
                  this.$IvueMessage.success({
                        content: 'Tips for manual closing',
                  });
                  this.$IvueMessage.loading({
                        content: 'Loading...',
                        duration: 0
                  });
                  this.$IvueMessage.success({
                        content: 'Tips for manual closing',
                        render: h => {
                              return h('span', [
                                    'This is created by ',
                                    h('a', 'render'),
                                    ' function'
                              ])
                        }
                  });
                  this.$IvueMessage.info('This is created by ');
                  this.$IvueMessage.warning('This is created by ');
                  this.$IvueMessage.error('This is created by ');
            },
            destroy () {
                  this.$IvueMessage.destroy();
            }
      }
}
</script>
