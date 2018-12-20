import IvueMessage from '../../src/components/IvueMessage';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('IvueMessage', function () {
      it('should render the register the global IvueMessage component', async () => {
            const wrapper = mount({
                  template: `
                        <Button type="primary" @click="notice">Open notice</Button>
                  `,
                  mounted () {
                        // 注册全局 IvueMessage 组件
                        Vue.prototype.$IvueMessage = IvueMessage;
                  },
                  methods: {
                        notice () {
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
                        }
                  }
            }, {
                         
                  });

            expect(Vue.prototype.$IvueMessage).to.contain(Object);
      });
});