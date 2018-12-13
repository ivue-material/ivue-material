import IVueMessage from '../../src/components/IVueMessage';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IVueMessage', function () {
      it('should render the register the global IVueMessage component', async () => {
            const wrapper = mount({
                  template: `
                        <Button type="primary" @click="notice">Open notice</Button>
                  `,
                  mounted () {
                        // 注册全局 IVueMessage 组件
                        Vue.prototype.$IVueMessage = IVueMessage;
                  },
                  methods: {
                        notice () {
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
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IVueMessage).to.contain(Object);
      });
});